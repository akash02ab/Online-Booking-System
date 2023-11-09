import React, { useState, useEffect } from "react";
import Booking from "./pages/Booking";
import BookingForm from "./pages/BookingForm";
import Navbar from "./componetnts/Navbar";
import ThankYou from "./pages/ThankYou";
import { UserProvider } from "./contexts/UserContext";
import { BookingProvider } from "./contexts/BookingDataContext";
// import NoRIdeAvailable from "./pages/NoRIdeAvailable";
import DisableUiButton from "./componetnts/DisableUiButton";
// import ShowUi from "./componetnts/ShowUi";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState(false);
  const getBooleanValue = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getBooleanValue");
      console.log(res.data.booleanValue);
      localStorage.setItem("ShowUi", res.data.booleanValue)
      setValue(res.data.booleanValue);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBooleanValue();
  }, []);
  console.log(value);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <BookingProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Booking showUi={value} />} />
              <Route path="/book-ride" element={<BookingForm />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/du" element={<DisableUiButton />} />
            </Routes>
          </UserProvider>
        </BookingProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
