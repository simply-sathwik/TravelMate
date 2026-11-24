import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";
import { Plane } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [location.pathname]);

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <Plane size={25} />
        TravelMate
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/destinations">
          Destinations
        </Link>

        {user ? (
          <>
            <Link to="/bookings">
              My Bookings
            </Link>

            <span className="nav-username">
              Hi, {user.name}
            </span>

            <button
              type="button"
              className="register-btn"
              onClick={handleLogout}
              style={{
                border: "none",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;