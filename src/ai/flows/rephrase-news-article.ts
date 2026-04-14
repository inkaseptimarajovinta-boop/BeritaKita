'use server';
/**
 * @fileOverview A Genkit flow for rephrasing news articles.
 *
 * - rephraseNewsArticle - A function that handles the news article rephrasing process.
 * - RephraseNewsArticleInput - The input type for the rephraseNewsArticle function.
 * - RephraseNewsArticleOutput - The return type for the rephraseNewsArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RephraseNewsArticleInputSchema = z.object({
  originalHeadline: z.string().describe('The original headline of the news article.'),
  originalSummary: z.string().describe('The original summary of the news article.'),
  originalContent: z.string().optional().describe('The optional original full content of the news article.'),
});
export type RephraseNewsArticleInput = z.infer<typeof RephraseNewsArticleInputSchema>;

const RephraseNewsArticleOutputSchema = z.object({
  rephrasedHeadline: z.string().describe('The unique and rephrased headline of the news article.'),
  uniqueSummary: z.string().describe('A unique summary of the news article, preserving original meaning and core facts.'),
  rephrasedContent: z.string().optional().describe('The optionally rephrased full content of the news article, preserving original meaning and core facts.'),
});
export type RephraseNewsArticleOutput = z.infer<typeof RephraseNewsArticleOutputSchema>;

export async function rephraseNewsArticle(input: RephraseNewsArticleInput): Promise<RephraseNewsArticleOutput> {
  return rephraseNewsArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rephraseNewsArticlePrompt',
  input: {schema: RephraseNewsArticleInputSchema},
  output: {schema: RephraseNewsArticleOutputSchema},
  prompt: `You are an AI assistant specialized in rewriting news content to be unique while maintaining the original meaning and core facts.\n\nTask:\n1. Rephrase the provided original headline to make it unique and engaging, but ensure it accurately reflects the article's content.\n2. Generate a unique summary for the article that captures its essence and main points, without directly copying phrases from the original.\n3. If original content is provided, rephrase the full content to make it unique, fluent, and coherent, ensuring all original facts and meaning are preserved. If original content is not provided, omit this part.\n\nOriginal Headline: {{{originalHeadline}}}\n\nOriginal Summary: {{{originalSummary}}}\n\n{{#if originalContent}}\nOriginal Content:\n{{{originalContent}}}\n{{/if}}`,
});

const rephraseNewsArticleFlow = ai.defineFlow(
  {
    name: 'rephraseNewsArticleFlow',
    inputSchema: RephraseNewsArticleInputSchema,
    outputSchema: RephraseNewsArticleOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
