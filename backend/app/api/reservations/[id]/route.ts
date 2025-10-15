import { connectDB } from "@/lib/mongodb";
import Reservation from "@/lib/models/Reservations";
import { NextResponse } from "next/server";

const FRONTEND_URL = "http://localhost:5173";

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", FRONTEND_URL);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,OPTIONS"
  );
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

interface Params {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: Params) {
  await connectDB();

  if (!params.id) {
    return withCors(
      NextResponse.json({ error: "Missing reservation ID" }, { status: 400 })
    );
  }

  const deleted = await Reservation.findByIdAndDelete(params.id);

  if (!deleted) {
    return withCors(
      NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    );
  }

  return withCors(NextResponse.json({ success: true }, { status: 200 }));
}
