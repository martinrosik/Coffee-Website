import api from "@/_shared/api/api";

export const isAdmin = async (): Promise<boolean> => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    await api.get("/admin");
    return true;
  } catch (err) {
    console.error("Access denied:", err);
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
