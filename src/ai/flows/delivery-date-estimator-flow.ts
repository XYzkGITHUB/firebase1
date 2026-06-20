'use server';
/**
 * @fileOverview A Genkit flow for estimating delivery dates for construction materials.
 *
 * - estimateDeliveryDate - A function that estimates the delivery date based on material requirements and delivery method.
 * - DeliveryDateEstimatorInput - The input type for the estimateDeliveryDate function.
 * - DeliveryDateEstimatorOutput - The return type for the estimateDeliveryDate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeliveryDateEstimatorInputSchema = z.object({
  materialRequirements: z
    .string()
    .describe("Detailed description of the project's material requirements (e.g., quantity, type, origin)."),
  deliveryMethod: z
    .enum(['sea', 'air'])
    .describe('The preferred delivery method: "sea" for maritime or "air" for aviation.'),
});
export type DeliveryDateEstimatorInput = z.infer<typeof DeliveryDateEstimatorInputSchema>;

const DeliveryDateEstimatorOutputSchema = z.object({
  estimatedDeliveryDate: z
    .string()
    .describe('The estimated delivery date in YYYY-MM-DD format.'),
  confidenceScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A confidence score (0-100) for the estimated delivery date, where 100 is highly confident.'),
  reasoning: z.string().describe('A brief explanation for the estimated delivery date and confidence score.'),
});
export type DeliveryDateEstimatorOutput = z.infer<typeof DeliveryDateEstimatorOutputSchema>;

export async function estimateDeliveryDate(
  input: DeliveryDateEstimatorInput
): Promise<DeliveryDateEstimatorOutput> {
  return deliveryDateEstimatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'deliveryDateEstimatorPrompt',
  input: {schema: DeliveryDateEstimatorInputSchema},
  output: {schema: DeliveryDateEstimatorOutputSchema},
  prompt: `You are an expert logistics specialist for construction materials. Your task is to estimate a realistic delivery date.

STRICT RULE: The 'reasoning' field in the output MUST BE STRICTLY IN RUSSIAN.

Provide the estimated delivery date in YYYY-MM-DD format. Also, include a confidence score (0-100, where 100 is highly confident) for your estimate and a brief explanation of your reasoning in Russian.

Material Requirements: {{{materialRequirements}}}
Preferred Delivery Method: {{{deliveryMethod}}}`,
});

const deliveryDateEstimatorFlow = ai.defineFlow(
  {
    name: 'deliveryDateEstimatorFlow',
    inputSchema: DeliveryDateEstimatorInputSchema,
    outputSchema: DeliveryDateEstimatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
