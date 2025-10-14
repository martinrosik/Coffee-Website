import mongoose, { Schema, models, model } from "mongoose";

export interface IReservation {
  name: string;
  phone?: string;
  date: Date;
  time: string;
  guests: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Reservation ||
  model<IReservation>("Reservation", ReservationSchema);
