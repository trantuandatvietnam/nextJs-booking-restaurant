"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import AuthModalInput from "./AuthModalInput";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ signIn = true }: { signIn?: boolean }) {
  const { error, loading, data } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(false);

  const { signin, signup } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [disabled, setDisabled] = React.useState(true);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const renderContent = (signInContent: string, signUpContent: string) => {
    return signIn ? signInContent : signUpContent;
  };

  React.useEffect(() => {
    if (signIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.phone
      ) {
        setDisabled(false);
      }
    }
  }, [inputs]);

  const handleClick = () => {
    if (signIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  return (
    <div>
      <div className="flex">
        <button
          onClick={handleOpen}
          className={`${renderContent(
            "bg-blue-400 text-white",
            ""
          )} border p-1 px-4 rounded mr-3`}
        >
          {renderContent("Sign in", "Sign up")}
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="p-2 h-[600px] flex items-center justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error !== null && (
                <Alert className="mb-3" severity="error">
                  {error}
                </Alert>
              )}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <div className="text-sm">
                  {renderContent("Sign In", "Create Account")}
                </div>
              </div>
              <div className="w-5" />
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    "Log into your account",
                    "Create your open table account"
                  )}
                </h2>
                <AuthModalInput
                  isSignIn={signIn}
                  onChange={handleChangeInput}
                  inputs={inputs}
                />
                <button
                  onClick={handleClick}
                  disabled={disabled}
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                >
                  {renderContent("Sign in", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
