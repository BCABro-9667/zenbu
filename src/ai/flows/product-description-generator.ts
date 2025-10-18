'use server';

/**
 * @fileOverview An AI-powered product description generator.
 *
 * - generateProductDescription - A function that generates product descriptions based on a title and keywords.
 * - ProductDescriptionGeneratorInput - The input type for the generateProductDescription function.
 * - ProductDescriptionGeneratorOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductDescriptionGeneratorInputSchema = z.object({
  title: z.string().describe('The title of the product.'),
  keywords: z.string().describe('Keywords related to the product, separated by commas.'),
});
export type ProductDescriptionGeneratorInput = z.infer<typeof ProductDescriptionGeneratorInputSchema>;

const ProductDescriptionGeneratorOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type ProductDescriptionGeneratorOutput = z.infer<typeof ProductDescriptionGeneratorOutputSchema>;

export async function generateProductDescription(
  input: ProductDescriptionGeneratorInput
): Promise<ProductDescriptionGeneratorOutput> {
  return productDescriptionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productDescriptionGeneratorPrompt',
  input: {schema: ProductDescriptionGeneratorInputSchema},
  output: {schema: ProductDescriptionGeneratorOutputSchema},
  prompt: `You are an expert copywriter specializing in e-commerce product descriptions.\
  Generate a compelling and informative product description based on the following title and keywords.\

  Title: {{{title}}}
  Keywords: {{{keywords}}}
  \n  Description:`,
});

const productDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'productDescriptionGeneratorFlow',
    inputSchema: ProductDescriptionGeneratorInputSchema,
    outputSchema: ProductDescriptionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
