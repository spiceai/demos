import { openai } from "@ai-sdk/openai";
import {
  streamText,
  convertToCoreMessages,
  StreamData,
  StreamingTextResponse,
} from "ai";
import { z } from "zod";

// Allow streaming responses up to 300 seconds
export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: convertToCoreMessages(messages.filter((m: any) => !!m.content)),
    tools: {
      spiceAssist: {
        description: "Get information from datasets using query",
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
          console.log("query", query, datasets);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return {
            text: `This is a simulated response from Spice Assistant, using query: "${query}" and datasets: "${datasets.join(", ")}"`,
          };
          // const request = await fetch(
          //   `${process.env.SPICE_HTTP_ENDPOINT}/v1/assist`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       text: query,
          //       from: datasets,
          //       use: "openai",
          //     }),
          //   },
          // );

          // const response = await request.json();
          // console.log(response);
          // return response;
        },
      },

      searchInDecisions: {
        description: "Search for information in decision records channel",
        parameters: z.object({
          question: z.string(),
        }),
        execute: async ({ question }: { question: string }) => {
          const request = await fetch(
            `${process.env.SPICE_HTTP_ENDPOINT}/v1/assist`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: question,
                from: "decisions",
                use: "openai",
              }),
            },
          );

          try {
            const response = await request.json();
            return { text: response };
          } catch (e) {
            return { text: "Something went wrong: " + e };
          }
        },
      },
    },
  });

  return result.toAIStreamResponse();
}
