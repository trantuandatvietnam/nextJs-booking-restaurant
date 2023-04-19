"use client";

import Link from "next/link";
import React, { useContext } from "react";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { data, loading } = useContext(AuthContext);
  const { logout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link className="font-bold text-gray-700 text-2xl" href="/">
        OpenTable
      </Link>
      {loading ? null : (
        <div className="flex">
          {data ? (
            <button
              onClick={logout}
              className="border p-1 px-4 rounded mr-3 bg-blue-400 text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <AuthModal signIn />
              <AuthModal signIn={false} />
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
