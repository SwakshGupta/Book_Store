import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FormikForm from "./components/profile/profile";
import Navbar from "./components/navBar";

function App() {
  return (
    <>
      <Navbar />
      <FormikForm />
    </>
  );
}

export default App;
