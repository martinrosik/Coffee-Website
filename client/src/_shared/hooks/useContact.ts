import { useState } from "react";
import api from "@/_shared/api/api";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const submitContact = async (formData: ContactFormData) => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/contacts", formData);
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

  return { loading, error, data, submitContact };
}
