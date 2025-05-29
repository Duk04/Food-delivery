import axios from "axios";

const BASE_URL = "http://localhost:8000/auth";

export const signUp = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${BASE_URL}/sign-up`, data);
  return res.data;
};

export const signIn = async (data: {
  email: string;
  password: string;
  token: string;
}) => {
  const res = await axios.post(`${BASE_URL}/sign-in`, data);

  return res.data;
};

export const verifyUser = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/verify-user?token=${token}`);
  return res.data;
};

export const requestPasswordReset = async (email: string) => {
  const res = await axios.post(`${BASE_URL}/reset-password-request`, { email });
  return res.data;
};

export const verifyResetToken = async (token: string) => {
  const res = await axios.get(
    `${BASE_URL}/verify-reset-password-request?token=${token}`
  );
  return res.data;
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const res = await axios.post(`${BASE_URL}/reset-password`, data);
  return res.data;
};
