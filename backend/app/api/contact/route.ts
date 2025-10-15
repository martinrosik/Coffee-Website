import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";

const FRONTEND_URL = "http://localhost:5173";

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", FRONTEND_URL);
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  return withCors(response);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return withCors(
        NextResponse.json(
          { error: "Missing required fields: name, email, subject, message" },
          { status: 400 }
        )
      );
    }

    await connectDB();

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return withCors(
      NextResponse.json({ success: true, contact }, { status: 201 })
    );
  } catch (err: any) {
    console.error(err);
    return withCors(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}
