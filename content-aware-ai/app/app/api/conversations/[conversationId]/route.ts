import { conversations } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

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
  const accelerated = searchParams.get('accelerated') === 'true';
  const conversation = conversations[conversationId];

  if (!conversation?.sql) {
    return NextResponse.json([]);
  }

  const sql =
    accelerated && conversation.sql_accelerated
      ? conversation.sql_accelerated
      : conversation.sql;

  try {
    const request = await fetch(`${process.env.SPICE_HTTP_ENDPOINT}/v1/sql`, {
      method: 'POST',
      body: sql,
      cache: 'no-cache',
    });

    const response = await request.json();

    if (Array.isArray(response)) {
      return NextResponse.json(response);
    }
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json([]);
};
