import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FormikForm from "./components/profile/profile";
import Navbar from "./components/navBar";
import AddBooks from "./components/books/addBooks";

function App() {
  return (
    <>
      <Navbar />
      <AddBooks />
    </>
  );
}

export default App;
