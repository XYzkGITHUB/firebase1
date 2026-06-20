'use server';
/**
 * @fileOverview Provides a Genkit flow for recommending ceramic tiles, laminate, and sanitary ware
 * based on a user's project description and aesthetic preferences.
 *
 * - materialRecommendationAssistant - A function that handles the material recommendation process.
 * - MaterialRecommendationAssistantInput - The input type for the materialRecommendationAssistant function.
 * - MaterialRecommendationAssistantOutput - The return type for the materialRecommendationAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MaterialRecommendationAssistantInputSchema = z.object({
  projectDescription: z
    .string()
    .describe(
      'A detailed description of the project needs, aesthetic preferences, and any specific requirements for materials like keramogranit, laminate, or sanitary ware.'
    ),
});
export type MaterialRecommendationAssistantInput = z.infer<
  typeof MaterialRecommendationAssistantInputSchema
>;

const RecommendedProductSchema = z.object({
  productName: z
    .string()
    .describe('The suggested product name or type (e.g., "Glossy White Keramogranit").'),
  category: z
    .enum(['keramogranit', 'laminate_sps', 'sanitary_ware'])
    .describe('The category of the recommended product.'),
  description: z.string().describe('A brief explanation of why this product is suitable.'),
  suitabilityScore: z
    .number()
    .min(1)
    .max(100)
    .describe('A score from 1 to 100 indicating how well the product fits the project requirements.'),
  reasoning: z.string().describe('Detailed reasoning for the suitability score and recommendation.'),
});

const MaterialRecommendationAssistantOutputSchema = z.object({
  recommendations: z
    .array(RecommendedProductSchema)
    .describe('A list of recommended products based on the project description.'),
  summary: z.string().describe('A general summary of the recommendations.'),
});
export type MaterialRecommendationAssistantOutput = z.infer<
  typeof MaterialRecommendationAssistantOutputSchema
>;

export async function materialRecommendationAssistant(
  input: MaterialRecommendationAssistantInput
): Promise<MaterialRecommendationAssistantOutput> {
  return materialRecommendationAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'materialRecommendationAssistantPrompt',
  input: { schema: MaterialRecommendationAssistantInputSchema },
  output: { schema: MaterialRecommendationAssistantOutputSchema },
  prompt: `You are an expert interior designer and material specialist for IRGG Luxe Surface, a company specializing in high-end ceramic tiles, laminate, and sanitary ware.

Your task is to analyze the provided project description and recommend suitable materials from the following IRGG product categories:
- Керамогранит (keramogranit)
- Ламинат и SPS (laminate_sps)
- Сантехника (sanitary_ware)

Consider the project's aesthetic preferences, functional needs, and any specific requirements mentioned. Provide 3-5 distinct recommendations, ensuring they align with the luxury positioning of IRGG Luxe Surface. For each recommendation, provide a product name, its category, a brief description of its suitability, a numerical suitability score (1-100), and detailed reasoning.

The output MUST be a JSON object conforming strictly to the MaterialRecommendationAssistantOutputSchema. Do not include any additional text or formatting outside of the JSON.

Project Description: {{{projectDescription}}}`,
});

const materialRecommendationAssistantFlow = ai.defineFlow(
  {
    name: 'materialRecommendationAssistantFlow',
    inputSchema: MaterialRecommendationAssistantInputSchema,
    outputSchema: MaterialRecommendationAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
