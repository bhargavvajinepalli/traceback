'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { itemCategories } from '@/lib/types';
import { Calendar as CalendarIcon, Upload, Wand2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { summarizeItemDescription } from '@/ai/flows/summarize-item-description';

export default function ReportLostPage() {
    const [date, setDate] = useState<Date | undefined>();
    const [description, setDescription] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const { toast } = useToast();

    const handleSummarize = async () => {
        if (!description) {
            toast({
                title: 'No description provided',
                description: 'Please write a description first.',
                variant: 'destructive',
            });
            return;
        }
        setIsSummarizing(true);
        try {
            const result = await summarizeItemDescription({ itemDescription: description });
            setDescription(result.summary);
            toast({
                title: 'Description Summarized!',
                description: 'The description has been summarized using AI.',
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Summarization Failed',
                description: 'Could not summarize the description at this time.',
                variant: 'destructive',
            });
        } finally {
            setIsSummarizing(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      toast({
        title: "Report Submitted!",
        description: "Your lost item report has been successfully submitted.",
      });
      // Here you would typically handle form submission to your backend
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report a Lost Item</CardTitle>
        <CardDescription>
          Fill out the form below with as much detail as possible. The more information you provide, the better the chances of finding your item.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input id="item-name" placeholder="e.g., iPhone 13 Pro" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <div className="relative">
                <Textarea
                    id="description"
                    placeholder="e.g., Black with a small crack on the top left corner. Has a blue case."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button 
                  type="button" 
                  size="sm" 
                  variant="ghost" 
                  className="absolute bottom-2 right-2" 
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isSummarizing ? 'Summarizing...' : 'Summarize with AI'}
                </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Unique Identifier (IMEI / Serial Number)</Label>
              <Input id="identifier" placeholder="Optional but highly recommended" />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="date-lost">Date Lost</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location Lost</Label>
            <Input id="location" placeholder="e.g., Central Park, near the fountain" />
            {/* A map picker could be integrated here */}
          </div>
          
          <div className="grid gap-2">
            <Label>Image Upload</Label>
            <div className="flex items-center justify-center w-full">
                <Label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" />
                </Label>
            </div> 
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Submit Report</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
