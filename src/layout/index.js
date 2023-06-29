import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="wrapper">
      <div className="max-w-[1440px] w-full mx-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
