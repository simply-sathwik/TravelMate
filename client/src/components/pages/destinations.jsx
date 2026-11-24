import { useState } from "react";
import {
  useSearchParams,
  useNavigate
} from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

function Destinations() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [bookingPlace, setBookingPlace] = useState(null);
  const [error, setError] = useState("");

  const places = [
    {
      name: "Paris",
      country: "France",
      price: 45000,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    },
    {
      name: "Bali",
      country: "Indonesia",
      price: 35000,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
    },
    {
      name: "Switzerland",
      country: "Switzerland",
      price: 65000,
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7"
    },
    {
      name: "Dubai",
      country: "UAE",
      price: 40000,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
    },
    {
      name: "Maldives",
      country: "Maldives",
      price: 55000,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8"
    },
    {
      name: "London",
      country: "United Kingdom",
      price: 70000,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
    }
  ];

  const filteredPlaces = places.filter((place) =>
    `${place.name} ${place.country}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  // Save destination booking
  const handleBooking = async (place) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in before booking a destination.");
      navigate("/login");
      return;
    }

    if (bookingPlace) {
      return;
    }

    const confirmed = window.confirm(
      `Confirm demo trip booking for ${place.name}?\n` +
      `Estimated budget: ₹${place.price.toLocaleString("en-IN")}`
    );

    if (!confirmed) {
      return;
    }

    setBookingPlace(place.name);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            type: "Trip",
            details: {
              title: place.name,
              destination: place.name,
              country: place.country,
              total: place.price,
              image: place.image
            }
          })
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
          data.message || "Booking failed."
        );
      }

      alert("Demo trip booking saved successfully!");

      navigate("/bookings");

    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server."
          : err.message
      );

    } finally {
      setBookingPlace(null);
    }
  };

  return (
    <div className="destinations-section">

      <h2>Explore Destinations</h2>

      <p>Discover beautiful places around the world.</p>

      {error && (
        <p
          role="alert"
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          {error}
        </p>
      )}

      <div className="destination-grid">

        {filteredPlaces.length > 0 ? (

          filteredPlaces.map((place) => (

            <div
              className="destination-card"
              key={place.name}
            >

              <img
                src={place.image}
                alt={place.name}
                loading="lazy"
              />

              <div className="destination-info">

                <h3>{place.name}</h3>

                <p>{place.country}</p>

                <h4>
                  Estimated trip budget: ₹
                  {place.price.toLocaleString("en-IN")}
                </h4>

                <button
                  type="button"
                  disabled={bookingPlace !== null}
                  onClick={() => handleBooking(place)}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    background: "#087f8c",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: bookingPlace
                      ? "not-allowed"
                      : "pointer",
                    fontWeight: "600"
                  }}
                >
                  {bookingPlace === place.name
                    ? "Booking..."
                    : "Book Trip"}
                </button>

              </div>

            </div>

          ))

        ) : (

          <p>
            No destinations found. Try another search.
          </p>

        )}

      </div>

      <p style={{
        textAlign: "center",
        marginTop: "30px",
        color: "#777",
        fontSize: "14px"
      }}>
        All bookings are for demonstration purposes only.
        No real reservation or payment is processed.
      </p>

    </div>
  );
}

export default Destinations;