import { useState, useEffect } from "react";
import api from "@/shared/api/api";

export type Reservation = {
  id: number;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: string;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
};

export function useAdminData() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      const response = await api.get("/reservations");
      setReservations(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch reservations");
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch contacts");
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchReservations(), fetchContacts()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const updateReservationStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/reservations/${id}`, { status });
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const updateContactStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/contacts/${id}`, { status });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  return {
    reservations,
    contacts,
    loading,
    error,
    updateReservationStatus,
    updateContactStatus,
  };
}
