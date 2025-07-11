import React from "react";
import './header.css'
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
