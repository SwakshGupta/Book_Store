import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FormikForm from "./components/profile/profile";
import Navbar from "./components/views/navBar";
import AddBooks from "./components/books/addBooks";
import Homepage from "./components/views/home";
import GetAllBooks from "./components/views/books";


function App() {
  return (
    <>
<Router>
  <Navbar/>
  <div>

    <Routes>

      <Route path="/Addbooks" element={<AddBooks/>}/>
      <Route path="/GetBooks" element={<GetAllBooks/>}/>
     
     
      </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
