import { useState, useEffect } from "react";
import api from "@/_shared/api/api";

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
      // Map _id to id if backend uses _id
      setReservations(
        response.data.map((r: any) => ({ ...r, id: r.id ?? r._id }))
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch reservations");
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data.map((c: any) => ({ ...c, id: c.id ?? c._id })));
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

  const deleteReservation = async (id?: number) => {
    if (!id) return;
    try {
      await api.delete(`/reservations/${id}`);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      console.error("Failed to delete reservation:", err);
    }
  };

  const deleteContact = async (id?: number) => {
    if (!id) return;
    try {
      await api.delete(`/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      console.error("Failed to delete contact:", err);
    }
  };

  return {
    reservations,
    contacts,
    loading,
    error,
    deleteReservation,
    deleteContact,
  };
}
