import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { spiceAssist, searchInDecisions, summarizeConversation } from './tools';

// Allow streaming responses up to 300 seconds
export const maxDuration = 300;

export interface SpiceAssistantRsult {
  text: string;
  from: Record<string, Array<{ content: string }>>;
}

export async function POST(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const augmented = searchParams.get('augmented') === 'true';
  console.log(augmented);

  const { messages } = await req.json();

  const model = openai('gpt-4-turbo');

  const result = await streamText({
    model,
    messages: convertToCoreMessages(messages.filter((m: any) => !!m.content)),
    tools: augmented
      ? {
          spiceAssist: spiceAssist,
          searchInDecisions: searchInDecisions,
          summarizeConversation: summarizeConversation,
        }
      : {},
  });

  return result.toAIStreamResponse();
}
