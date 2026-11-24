
import { Routes, Route } from "react-router-dom";

// CSS
import "./App.css";

// Components
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

// Pages
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/login.jsx";
import Register from "./components/pages/register.jsx";
import Destinations from "./components/pages/destinations.jsx";
import MyBookings from "./components/pages/mybookings.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
