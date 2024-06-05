import { conversations } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    conversationId: string;
  };
}

export const GET = async (
  _: NextRequest,
  { params: { conversationId } }: Params,
) => {
  const conversation = conversations[conversationId];

  const request = await fetch("http://localhost:3001/v1/sql", {
    method: "POST",
    body: conversation.sql
      ? conversation.sql
      : `SELECT * FROM ${conversation.dataset} limit 50`,
  });

  const response = await request.json();

  return NextResponse.json(response);
};
