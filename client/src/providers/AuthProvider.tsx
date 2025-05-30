// providers/AuthProvider.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;

type AuthContextType = {
  signUp: (data: { email: string; password: string }) => Promise<string>;
  signIn: (data: { email: string; password: string }) => Promise<string>;
  verifyUser: (token: string) => Promise<string>;
  requestPasswordReset: (email: string) => Promise<string>;
  verifyResetToken: (token: string) => Promise<string>;
  resetPassword: (data: {
    token: string;
    newPassword: string;
  }) => Promise<string>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const signUp = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${BASE_URL}/sign-up`, data);
    return res.data;
  };

  const signIn = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${BASE_URL}/sign-in`, data);
    return res.data;
  };

  const verifyUser = async (token: string) => {
    const res = await axios.get(`${BASE_URL}/verify-user?token=${token}`);
    return res.data;
  };

  const requestPasswordReset = async (email: string) => {
    const res = await axios.post(`${BASE_URL}/reset-password-request`, {
      email,
    });
    return res.data;
  };

  const verifyResetToken = async (token: string) => {
    const res = await axios.get(
      `${BASE_URL}/verify-reset-password-request?token=${token}`
    );
    return res.data;
  };

  const resetPassword = async (data: {
    token: string;
    newPassword: string;
  }) => {
    const res = await axios.post(`${BASE_URL}/reset-password`, data);
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        verifyUser,
        requestPasswordReset,
        verifyResetToken,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
