import { conversations } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    conversationId: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params: { conversationId } }: Params,
) => {
  const searchParams = new URL(req.url).searchParams;
  const accelerated = searchParams.get("accelerated") === "true";
  const conversation = conversations[conversationId];

  if (!conversation?.sql) {
    return NextResponse.json({ error: "No SQL query found" }, { status: 400 });
  }

  const sql =
    accelerated && conversation.sql_accelerated
      ? conversation.sql_accelerated
      : conversation.sql;

  console.log(sql);

  const request = await fetch("http://localhost:3001/v1/sql", {
    method: "POST",
    body: sql,
    cache: "no-cache",
  });

  const response = await request.json();

  return NextResponse.json(response);
};
