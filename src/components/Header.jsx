// components/Header.jsx
import { Link, NavLink } from "react-router";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          Lightcrypt Dash
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
