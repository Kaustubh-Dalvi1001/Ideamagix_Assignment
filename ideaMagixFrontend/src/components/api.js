import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const signUp = async (userData) => {
  const response = await api.post("/signup", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};
