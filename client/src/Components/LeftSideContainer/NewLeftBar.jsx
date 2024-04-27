import React, { useState } from "react";
import "./newLeftBar.css";
import home from "../../Components/Images/home.png";
import compass from "../../Components/Images/compass.png";
import bell2 from "../../Components/Images/bell2.png";
import analytics from "../../Components/Images/analytics.png";
import power from "../../Components/Images/power.png";
import more from "../../Components/Images/more.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../ReduxContainer/userReducer";

function NewLeftBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user.others.profilePicture;
  const id = userDetails.user.others._id;
  // console.log(id);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = () => {
    let path = "/login";
    navigate(path);
    dispatch(logout());
  };
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
        <div classname="menu-bar">
          <div classname="menu">
            <ul classname="menu-links">
              <li classname="nav-link">
                <Link to={"/"}>
                  <img src={home} alt="" className="left-bar-icon" />
                  <span classname="text nav-text">Home</span>
                </Link>
              </li>

              <li classname="nav-link">
                <Link to={"/explore"}>
                  <img src={compass} alt="" className="left-bar-icon" />
                  <span classname="text nav-text">Explore</span>
                </Link>
              </li>

              <li classname="nav-link">
                <a href="#">
                  <img src={bell2} alt="" className="left-bar-icon" />
                  <span classname="text nav-text">Notifications</span>
                </a>
              </li>

              <li classname="nav-link">
                <a href="#">
                  <img src={analytics} alt="" className="left-bar-icon" />
                  <span classname="text nav-text">Analytics</span>
                </a>
              </li>

              <li classname="nav-link">
                <Link to={`/profile/${id}`}>
                  <img
                    src={user}
                    alt=""
                    className="left-bar-icon left-bar-user-profile"
                  />
                  <span classname="text nav-text">Profile</span>
                </Link>
              </li>
            </ul>
          </div>

          <div classname="bottom-content">
            <li classname="">
              <a onClick={handleLogout}>
                <img src={power} alt="" className="left-bar-icon" />
                <span classname="text nav-text">Logout</span>
              </a>
            </li>
            <li classname="nav-link">
              <a href="#">
                <img src={more} alt="" className="left-bar-icon" />
                <span classname="text nav-text">More</span>
              </a>
            </li>
            {/* <li classname="mode">
              <div classname="sun-moon">
                <i classname="bx bx-moon icon moon"></i>
                <i classname="bx bx-sun icon sun"></i>
              </div>
              <span classname="mode-text text">Dark mode</span>

              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span classname="switch"></span>
              </div>
            </li> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NewLeftBar;
