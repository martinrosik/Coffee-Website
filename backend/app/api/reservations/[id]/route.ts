import { connectDB } from "@/lib/mongodb";
import Reservation from "@/lib/models/Reservations";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: Params) {
  await connectDB();

  if (!params.id) {
    return NextResponse.json(
      { error: "Missing reservation ID" },
      { status: 400 }
    );
  }

  await Reservation.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true }, { status: 200 });
}
