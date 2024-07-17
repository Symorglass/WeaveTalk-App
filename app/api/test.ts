import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    // test
    console.log('Entered the serverless function');
    return NextResponse.json(
      { message: "dummy data" },
      { status: 200 }
    );
}