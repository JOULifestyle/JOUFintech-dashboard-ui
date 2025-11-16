import { api } from "./client";

export const signIn = async (email: string, password: string) => {
  const res = await api.post("/auth/signin", { email, password });
  return res.data;
};

export const signUp = async (email: string) => {
  const res = await api.post("/auth/signup", { email });
  return res.data;
};