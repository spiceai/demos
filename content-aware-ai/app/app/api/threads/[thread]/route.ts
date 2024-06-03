import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    thread: string;
  };
}

export const GET = async (_: NextRequest, { params: { thread } }: Params) => {
  const request = await fetch("http://localhost:3001/v1/sql", {
    method: "POST",
    body: `SELECT * FROM ${thread} limit 50`,
  });

  const response = await request.json();

  return NextResponse.json({
    response,
  });
};
