import { useState } from "react";
import api from "@/_shared/api/api";

interface ReservationData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  time: string;
  date: string;
}

export function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const submitReservation = async (reservation: ReservationData) => {
    if (
      !reservation.name ||
      !reservation.phone ||
      !reservation.email ||
      !reservation.date ||
      !reservation.time
    ) {
      setError("Please fill in all required fields before submitting.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/reservations", reservation);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, submitReservation };
}
