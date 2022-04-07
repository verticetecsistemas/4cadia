import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Login from "../components/Sections/Login";
import Register from "../components/Sections/Register";
import Footer from "../components/Sections/Footer"
import Extract from "../components/Sections/Extract"
import Balance from "../components/Sections/Balance"



export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Login />
      <Register />
      <Balance />
      <Extract />
      <Footer />

    </>
  );
}


