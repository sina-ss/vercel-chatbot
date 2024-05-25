import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { roleInstructionContent } from '@/app/helper/roleInstruction';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
const sessionManager = {};


export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  // Create the roleInstruction object using the imported roleInstructionContent variable
  const roleInstruction = { role: 'system', content: roleInstructionContent };
  const updatedMessages = [roleInstruction, ...messages];

  // Ask OpenAI for a streaming chat completion given the updated messages
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: updatedMessages,
    max_tokens: 1000
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}