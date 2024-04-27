import React, { useEffect, useRef } from "react";
import "./bottomNavbar.css";
import home from "../Images/home.png";
import profile from "../Images/person-profile.png";
import explore from "../Images/compass.png";
import bell from "../Images/bell2.png";
import search from "../Images/search.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function BottomNavbar() {
  const userDetails = useSelector((state) => state.user);
  const id = userDetails.user.others._id;
  const navItemRef = useRef(null);
  useEffect(() => {
    if (navItemRef.current) {
      navItemRef.current.focus();
    }
  }, []);
  return (
    <div className="bottomNavbarMain">
      <nav className="bottomNav">
        <Link to={"/"}>
          <img src={home} alt="" className="left-bar-icon" />
        </Link>
        <Link to={"/"}>
          <img src={search} alt="" className="left-bar-icon" />
        </Link>
        <Link to={"/explore"}>
          <img src={explore} alt="" className="left-bar-icon" />
        </Link>
        <Link to={`/profile/${id}`}>
          <img src={profile} alt="" className="left-bar-icon" />
        </Link>

        {/* <a className="nav-item" href="#" ref={navItemRef}>
          <img src={search} alt="" className="left-bar-icon" />
          <span>Serach</span>
        </a>

        <a className="nav-item" href="#" ref={navItemRef}>
          <img src={bell} alt="" className="left-bar-icon" />
          <span>Notifications</span>
        </a>

        <a className="nav-item" href="#" ref={navItemRef}>
          <img src={profile} alt="" className="left-bar-icon" />
          <span>Profile</span>
        </a> */}
      </nav>
    </div>
  );
}

export default BottomNavbar;
