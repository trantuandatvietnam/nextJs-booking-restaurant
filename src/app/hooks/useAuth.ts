import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { removeCookies } from "cookies-next"

export default function useAuth() {
  const { setAuthState } = useContext(AuthContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.errorMessage,
        data: null
      });
    }
  };

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }
      );
      setAuthState((prev) => ({
        ...prev,
        data: response.data,
        loading: false,
      }));
      handleClose();
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.errorMessage,
      }));
    }
  };

  const logout = async () => {
    removeCookies("jwt")
    setAuthState((prev) => ({
      data: null,
      loading: false,
      error: null
    }));
  }

  return {
    signin,
    signup,
    logout
  };
}
