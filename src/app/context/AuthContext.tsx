"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface AuthState {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthContextI extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const initState = {
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
};

export const AuthContext = createContext<AuthContextI>(initState);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        return setAuthState({
          data: null,
          error: null,
          loading: false,
        });
      }
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      setAuthState({
        data: response.data.user,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState: setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
