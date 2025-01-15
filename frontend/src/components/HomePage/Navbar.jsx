import { React, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ClearIcon from "@mui/icons-material/Clear";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, NavLink } from "react-router-dom";
import { Outlet, useLocation } from "react-router";
import logo from "../../assests/skylogo.png";
import Home from "../HomePage/Home";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar_wrapper fixed-top p-0">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <div className="social_icons order-lg-last">
              <ul className="ul_links">
                <li>
                  <a
                    href="https://www.facebook.com/skyvisonitsolutions/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/skyvisionitsolution/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/sky-vision-it-solutions-official/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@amitganuwala"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <YouTubeIcon />
                  </a>
                </li>
              </ul>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={handleToggle}
            >
              <span className="nav_toggle">
                {isOpen ? <ClearIcon /> : <ClearAllIcon />}
              </span>
            </button>
            <div
              className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
              id="navbarNav"
            >

              <ul className="navbar-nav">
  <li className="nav-item">
    <NavLink
      className="nav-link text-white"
      to="/home"
      end // Add this prop
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        color: isActive ? 'black' : 'inherit',
      })}
    >
      Home
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink
      className="nav-link text-white"
      to="/home/Pricing"
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        color: isActive ? 'black' : 'inherit',
      })}
    >
      Upgrade
    </NavLink>
  </li>

  <li className="nav-item">
    <NavLink
      className="nav-link text-white"
      to="/home/Contact"
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        color: isActive ? 'black' : 'inherit',
      })}
    >
     Contact
    </NavLink>
  </li>
</ul>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
      {location.pathname === "/home" && <Home />}
    </>
  );
};
 export default Navbar;