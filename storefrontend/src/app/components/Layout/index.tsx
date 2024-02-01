import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const auth = localStorage.getItem("sessionToken");
  if (!auth) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-screen overflow-auto">
      <Navbar />
    {children}
   </div>
  
  );
}
