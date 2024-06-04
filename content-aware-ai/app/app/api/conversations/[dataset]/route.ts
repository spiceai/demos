import { conversations } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    dataset: string;
  };
}

export const GET = async (_: NextRequest, { params: { dataset } }: Params) => {
  const ds = conversations[dataset];

  const request = await fetch("http://localhost:3001/v1/sql", {
    method: "POST",
    body: ds.sql ? ds.sql : `SELECT * FROM ${dataset} limit 50`,
  });

  const response = await request.json();

  return NextResponse.json(response);
};
