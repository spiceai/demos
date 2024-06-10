import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages, CoreTool } from 'ai';
import { spiceAssist, searchInDecisions, summarizeConversation } from './tools';

// Allow streaming responses up to 300 seconds
export const maxDuration = 300;

export interface SpiceAssistantRsult {
  text: string;
  from: Record<string, Array<{ content: string }>>;
}

export async function POST(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const accelerated = searchParams.get('accelerated') === 'true';
  const openaiConnected = searchParams.get('openaiConnected') === 'true';
  const ftpConnected = searchParams.get('ftpConnected') === 'true';

  const { messages } = await req.json();

  const model = openai('gpt-4o');
  const tools: Record<string, CoreTool<any, any>> = {};

  if (openaiConnected) {
    tools.spiceAssist = spiceAssist;
    tools.summarizeConversation = summarizeConversation(accelerated);
    if (ftpConnected) {
      tools.searchInDecisions = searchInDecisions;
    }
  }

  const result = await streamText({
    model,
    messages: convertToCoreMessages(messages.filter((m: any) => !!m.content)),
    tools: tools,
  });

  return result.toAIStreamResponse();
}
