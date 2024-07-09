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
import UserBook from "./components/views/userBook";
import UserProfile from "./components/profile/profile";
import SignupForm from "./components/views/auth/signUp";

function App() {
  return (
    <>
      <div className="h-full">
        <Router>
          <Navbar />
          <div className="h-screen  overflow-y-auto">
            <Routes>
              <Route path="/Addbooks" element={<AddBooks />} />
              <Route path="/Profile" element={<UserProfile />} />
              <Route path="/GetBooks" element={<GetAllBooks />} />
              <Route path="/Userbook/:id" element={<UserBook />} />
              <Route path="/SignUp" element={<SignupForm/>}/>
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
