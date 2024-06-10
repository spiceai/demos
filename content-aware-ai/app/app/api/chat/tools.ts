import { openai } from '@ai-sdk/openai';
import { generateText, tool } from 'ai';
import { z } from 'zod';

export interface SpiceAssistantRsult {
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
    const request = await fetch(
      `${process.env.SPICE_HTTP_ENDPOINT}/v1/assist`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: query,
          from: datasets,
          use: 'openai',
        }),
      },
    );

    try {
      const response = await request.text();
      return { text: response };
    } catch (e) {
      return { text: 'Something went wrong: ' + e };
    }
  },
});

export const searchInDecisions = tool({
  description: 'Search for information in decision records channel',
  parameters: z.object({
    question: z.string(),
  }),
  execute: async ({ question }: { question: string }) => {
    const request = await fetch(
      `${process.env.SPICE_HTTP_ENDPOINT}/v1/assist`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: question,
          from: ['decisions'],
          use: 'openai',
        }),
      },
    );

    try {
      const response = (await request.json()) as SpiceAssistantRsult;
      return response;
    } catch (e) {
      return { text: 'Something went wrong: ' + e };
    }
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
        body: `select text from ${accelerated ? 'general_accelerated' : 'general'}`,
        cache: 'no-cache',
      });

      if (!accelerated) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const response = await request.json();
      const { text } = await generateText({
        model: openai('gpt-4o'),
        prompt: `Summarize following conversation: ${response.map((m: any) => m.text).join(', ')}`,
      });

      return text;
    },
  });
