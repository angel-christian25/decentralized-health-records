import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookingPage from "./Pages/BookingPage/BookingPage";
import AppointmentsPage from "./Pages/AppointmentsPage/AppointmentsPage";
import AddDoctorPage from "./Pages/AddDoctor/AddDoctor";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/add-doctor" element={<AddDoctorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
