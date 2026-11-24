import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  // Search destinations
  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/destinations?search=${encodeURIComponent(destination.trim())}`
    );
  };

  const popularDestinations = [
    {
      city: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    },
    {
      city: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
    },
    {
      city: "Switzerland",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7"
    }
  ];

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">

          <h1>Explore The World With TravelMate</h1>

          <p>
            Discover beautiful places and plan your next adventure.
          </p>

          <form
            className="search-box"
            onSubmit={handleSearch}
          >
            <MapPin />

            <input
              type="text"
              placeholder="Where do you want to go?"
              aria-label="Search destinations"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <button
              type="submit"
              className="search-btn"
              style={{
                border: "none",
                cursor: "pointer"
              }}
            >
              <Search size={18} /> Search
            </button>

          </form>

        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">

        <h2>Popular Destinations</h2>

        <p>Find your next favourite destination.</p>

        <div className="destination-grid">

          {popularDestinations.map(({ city, country, image }) => (

            <div
              className="destination-card"
              key={city}
            >

              <img
                src={image}
                alt={city}
                loading="lazy"
              />

              <div className="destination-info">

                <h3>{city}</h3>

                <p>{country}</p>

                <Link
                  to={`/destinations?search=${encodeURIComponent(city)}`}
                >
                  Explore Now →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Website Features */}
      <section className="features">

        <h2>Your Journey Starts Here</h2>

        <div className="feature-grid">

          <div>
            <Calendar />
            <h3>Easy Planning</h3>
            <p>Plan your trips easily.</p>
          </div>

          <div>
            <Users />
            <h3>Easy Booking</h3>
            <p>Manage your travel bookings.</p>
          </div>

          <div>
            <MapPin />
            <h3>Explore Places</h3>
            <p>Discover amazing destinations.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;