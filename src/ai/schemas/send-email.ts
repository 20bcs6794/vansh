/**
 * @fileOverview Schemas and types for the send email flow.
 */
import {z} from 'zod';

export const SendEmailInputSchema = z.object({
  email: z.string().email().describe('The email address of the sender.'),
  message: z.string().describe('The message content.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export const SendEmailOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SendEmailOutput = z.infer<typeof SendEmailOutputSchema>;
