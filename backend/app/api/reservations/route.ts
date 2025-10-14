import { connectDB } from "@/lib/mongodb";
import Reservation from "@/lib/models/Reservations";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  return NextResponse.json(reservations, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, date, time, guests } = data;
    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, date, time, guests" },
        { status: 400 }
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

    return NextResponse.json(reservation, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
