import mongoose, { Schema, models, model } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Contact || model<IContact>("Contact", ContactSchema);
