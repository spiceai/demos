import { openai } from '@ai-sdk/openai';
import { generateText, tool } from 'ai';
import { z } from 'zod';

const models = ['openai', 'groq', 'groq2'];

export interface SpiceAssistantResult {
  text: string;
  from: Record<string, Array<{ content: string }>>;
}

export const spiceAssist = tool({
  description: 'Get information from datasets using query',
  parameters: z.object({
    query: z.string(),
    datasets: z.array(z.string()),
  }),
  execute: async ({
    query,
    datasets,
  }: {
    query: string;
    datasets: string[];
  }) => {
    const promises = [];
    for (const use of models) {
      promises.push(assist(query, datasets, use));
    }
    return await Promise.any(promises);
  },
});

export const searchInDecisions = (datasets?: string[]) =>
  tool({
    description: 'Search for information in decision records channel',
    parameters: z.object({
      question: z.string(),
    }),
    execute: async ({ question }: { question: string }) => {
      console.log('start of searchInDecisions');
      const promises = [];
      for (const use of models) {
        console.log('searchInDecisions', question, datasets, use);
        promises.push(assist(question, datasets || ['decisions'], use));
      }
      return await Promise.any(promises);
    },
  });

export const summarizeConversation = (accelerated?: boolean) =>
  tool({
    description: 'Summarize recent messages in current conversation',
    parameters: z.object({
      // question: z.string(),
    }),
    execute: async () => {
      const request = await fetch(`${process.env.SPICE_HTTP_ENDPOINT}/v1/sql`, {
        method: 'POST',
        body: `select text from ${
          accelerated ? 'general_accelerated' : 'general'
        }`,
        cache: 'no-cache',
      });

      if (!accelerated) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const response = await request.json();
      const { text } = await generateText({
        model: openai('gpt-4o'),
        prompt: `Summarize following conversation: ${response
          .map((m: any) => m.text)
          .join(', ')}`,
      });

      return text;
    },
  });

const assist = async (prompt: string, datasets: string[], model: string) => {
  console.log('assist', prompt, datasets, model);
  const request = await fetch(`${process.env.SPICE_HTTP_ENDPOINT}/v1/assist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: prompt,
      from: datasets,
      use: model,
    }),
  });

  try {
    const response = (await request.json()) as SpiceAssistantResult;
    return response;
  } catch (e) {
    console.error('[assist]', e);
    return { text: 'Something went wrong: ' + e };
  }
};
