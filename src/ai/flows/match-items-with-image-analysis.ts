'use server';
/**
 * @fileOverview Implements image analysis to match lost and found items by visual characteristics.
 *
 * - matchItemsWithImageAnalysis - A function that handles the matching process using image analysis and OCR.
 * - MatchItemsWithImageAnalysisInput - The input type for the matchItemsWithImageAnalysis function.
 * - MatchItemsWithImageAnalysisOutput - The return type for the matchItemsWithImageAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchItemsWithImageAnalysisInputSchema = z.object({
  lostItemImage: z
    .string()
    .describe(
      'A photo of the lost item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  foundItemImage: z
    .string()
    .describe(
      'A photo of the found item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type MatchItemsWithImageAnalysisInput = z.infer<typeof MatchItemsWithImageAnalysisInputSchema>;

const MatchItemsWithImageAnalysisOutputSchema = z.object({
  isMatch: z
    .boolean()
    .describe('Whether the lost and found items are likely a match based on image analysis and OCR.'),
  matchConfidence: z
    .number()
    .describe('A confidence score (0-1) indicating the likelihood of a match based on image analysis and OCR.'),
  extractedTextLostItem: z
    .string()
    .describe('Extracted text from the lost item image using OCR.'),
  extractedTextFoundItem: z
    .string()
    .describe('Extracted text from the found item image using OCR.'),
});
export type MatchItemsWithImageAnalysisOutput = z.infer<typeof MatchItemsWithImageAnalysisOutputSchema>;

export async function matchItemsWithImageAnalysis(
  input: MatchItemsWithImageAnalysisInput
): Promise<MatchItemsWithImageAnalysisOutput> {
  return matchItemsWithImageAnalysisFlow(input);
}

const ocrTool = ai.defineTool(
  {
    name: 'ocrTool',
    description: 'Extracts text from an image using OCR.',
    inputSchema: z.object({
      image: z
        .string()
        .describe(
          'The image to extract text from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
        ),
    }),
    outputSchema: z.string(),
  },
  async input => {
    const {text} = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: `Extract the text from this image: {{media url=image}}`,
    });
    return text!;
  }
);

const prompt = ai.definePrompt({
  name: 'matchItemsWithImageAnalysisPrompt',
  input: {schema: MatchItemsWithImageAnalysisInputSchema},
  output: {schema: MatchItemsWithImageAnalysisOutputSchema},
  tools: [ocrTool],
  prompt: `You are an expert in image analysis and object recognition. You are given two images, one of a lost item and one of a found item.
Your task is to determine if the two items are a potential match based on their visual characteristics and any text present in the images.

First, use the ocrTool to extract any text from both images. Use this text to help determine if the images are of the same item.

Lost Item Image: {{media url=lostItemImage}}
Found Item Image: {{media url=foundItemImage}}

Extracted Text from Lost Item: {{extractedTextLostItem}}
Extracted Text from Found Item: {{extractedTextFoundItem}}

Based on the image analysis and extracted text, determine if the two items are a potential match.
Set the isMatch field to true if they are a potential match, and false if they are not.
Provide a confidence score (0-1) indicating the likelihood of a match. 1 is a perfect match, 0 is not a match.
`,
});

const matchItemsWithImageAnalysisFlow = ai.defineFlow(
  {
    name: 'matchItemsWithImageAnalysisFlow',
    inputSchema: MatchItemsWithImageAnalysisInputSchema,
    outputSchema: MatchItemsWithImageAnalysisOutputSchema,
  },
  async input => {
    const extractedTextLostItem = await ocrTool({
      image: input.lostItemImage,
    });
    const extractedTextFoundItem = await ocrTool({
      image: input.foundItemImage,
    });

    const {output} = await prompt({
      ...input,
      extractedTextLostItem,
      extractedTextFoundItem,
    });
    return output!;
  }
);
