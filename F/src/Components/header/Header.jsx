import React from "react";
import TopBar from "./topBar/TopBar";
import NavBar from "./navBar/NavBar";

export default function Header() {
  return (
    <header className="header">
      <TopBar />
      <NavBar/>
    </header>
  );
}
