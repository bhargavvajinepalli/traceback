'use server';

/**
 * @fileOverview Summarizes an item description to ensure clarity and accuracy.
 *
 * - summarizeItemDescription - A function that summarizes the item description.
 * - SummarizeItemDescriptionInput - The input type for the summarizeItemDescription function.
 * - SummarizeItemDescriptionOutput - The return type for the summarizeItemDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeItemDescriptionInputSchema = z.object({
  itemDescription: z
    .string()
    .describe('The description of the item to be summarized.'),
});
export type SummarizeItemDescriptionInput = z.infer<
  typeof SummarizeItemDescriptionInputSchema
>;

const SummarizeItemDescriptionOutputSchema = z.object({
  summary: z.string().describe('The summarized description of the item.'),
});
export type SummarizeItemDescriptionOutput = z.infer<
  typeof SummarizeItemDescriptionOutputSchema
>;

export async function summarizeItemDescription(
  input: SummarizeItemDescriptionInput
): Promise<SummarizeItemDescriptionOutput> {
  return summarizeItemDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeItemDescriptionPrompt',
  input: {schema: SummarizeItemDescriptionInputSchema},
  output: {schema: SummarizeItemDescriptionOutputSchema},
  prompt: `You are an expert at summarizing item descriptions for lost and found items.

  Please provide a concise and clear summary of the following item description:
  \"{{{itemDescription}}}\". The summary should be no more than 50 words.`,
});

const summarizeItemDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeItemDescriptionFlow',
    inputSchema: SummarizeItemDescriptionInputSchema,
    outputSchema: SummarizeItemDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
