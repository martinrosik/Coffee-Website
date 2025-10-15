import { connectDB } from "@/lib/mongodb";
import Reservation from "@/lib/models/Reservations";
import { NextResponse } from "next/server";

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

export async function GET() {
  await connectDB();
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  return withCors(NextResponse.json(reservations, { status: 200 }));
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, date, time, guests } = data;

    if (!name || !phone || !date || !time || !guests) {
      return withCors(
        NextResponse.json(
          { error: "Missing required fields: name, phone, date, time, guests" },
          { status: 400 }
        )
      );
    }

    await connectDB();

    const reservation = await Reservation.create({
      name,
      phone,
      date,
      time,
      guests,
    });

    return withCors(NextResponse.json(reservation, { status: 201 }));
  } catch (err: any) {
    console.error(err);
    return withCors(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}
