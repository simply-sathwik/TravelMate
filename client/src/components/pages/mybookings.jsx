import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true });
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load bookings."
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid booking response.");
        }

        setBookings(data);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message === "Failed to fetch"
              ? "Cannot connect to the server."
              : err.message
          );
        }

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => controller.abort();

  }, [navigate]);

  return (
    <div className="page-container">

      <h1>My Travel Bookings</h1>

      <p style={{
        marginTop: "15px",
        color: "#777"
      }}>
        Manage and view all your travel reservations
        in one place.
      </p>

      {loading ? (

        <p style={{
          marginTop: "30px",
          textAlign: "center"
        }}>
          Loading your bookings...
        </p>

      ) : error ? (

        <div style={{
          marginTop: "30px",
          textAlign: "center"
        }}>
          <p style={{ color: "red" }}>
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              cursor: "pointer"
            }}
          >
            Retry
          </button>
        </div>

      ) : bookings.length === 0 ? (

        <div style={{
          marginTop: "30px",
          padding: "30px",
          background: "#f0f8fa",
          borderRadius: "12px",
          textAlign: "center"
        }}>

          <h2>No Bookings Yet!</h2>

          <p style={{ marginTop: "12px" }}>
            Your upcoming trips will appear here.
          </p>

          <Link
            to="/destinations"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 22px",
              background: "#087f8c",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            Explore Destinations
          </Link>

        </div>

      ) : (

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginTop: "30px"
        }}>

          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                padding: "25px",
                background: "#f0f8fa",
                borderRadius: "12px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)"
              }}
            >

              <h2>
                {booking.details?.title ||
                  booking.destination ||
                  booking.details?.destination ||
                  booking.type ||
                  "Travel Booking"}
              </h2>

              <p style={{ marginTop: "12px" }}>
                <strong>Booking Type:</strong>{" "}
                {booking.type || "Trip"}
              </p>

              {booking.details?.date && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Travel Date:</strong>{" "}
                  {booking.details.date}
                </p>
              )}

              <p style={{ marginTop: "10px" }}>
                <strong>Status:</strong>{" "}
                <span style={{
                  color:
                    booking.status === "Cancelled"
                      ? "red"
                      : "green"
                }}>
                  {booking.status || "Not specified"}
                </span>
              </p>

              {booking.details?.total != null && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Total:</strong> ₹
                  {Number(
                    booking.details.total
                  ).toLocaleString("en-IN")}
                </p>
              )}

              {booking.bookedAt && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Booked On:</strong>{" "}
                  {new Date(
                    booking.bookedAt
                  ).toLocaleDateString("en-IN")}
                </p>
              )}

            </div>
          ))}

        </div>

      )}

    </div>
  );
}

export default MyBookings;