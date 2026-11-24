import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div>
          <h2>TravelMate</h2>

          <p>
            Discover amazing destinations and make
            unforgettable memories.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <p>
            <Link to="/">Home</Link>
          </p>

          <p>
            <Link to="/destinations">Destinations</Link>
          </p>

          <p>
            <Link to="/bookings">My Bookings</Link>
          </p>
        </div>

        <div>
          <h3>Contact</h3>

          <p>Email: support@travelmate.com</p>

          <p>India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} TravelMate.
        All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;