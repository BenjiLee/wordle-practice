import { NextResponse } from "next/server";
import { wordBank } from "../wordBank";

export async function GET(request) {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  const randomWord = wordBank[randomIndex];
  return NextResponse.json({ message: randomWord }, { status: 200 });
}
