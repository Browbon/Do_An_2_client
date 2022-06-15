import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthConext";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">PixelBooking.com</span>
        </Link>
        {user ? (
          <div className="userInfo">
            <img src={user.img} alt="userImage" className="userImg" />
            <FontAwesomeIcon
              className="userMenu"
              icon={faBars}
              onClick={handleClick}
            ></FontAwesomeIcon>
            {open && (
              <div className="userLogout">
                <span onClick={handleLogout}>Log out</span>
              </div>
            )}
          </div>
        ) : (
          <div className="navbarItems">
            <Link to="/register">
              <button className="navbarButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navbarButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
