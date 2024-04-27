import React from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Profile from "../Images/profile.jpg";
import Logo from "../Images/logo.png";
import mLogo from "../Images/mlogo.jpg";
import chat from "../Images/chat.png";
import bell from "../Images/bell.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BasicMenu from "./BasicMenu";
function Navbar() {
  console.log(window.innerWidth);
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.others._id;
  let profile = user?.others.profilePicture;
  return (
    <div className="mainNavbar">
      <Link to={"/"}>
        <div className="LogoContainer">
          <img
            src={window.innerWidth <= 320 ? mLogo : Logo}
            alt="logo"
            className="logo"
          />
        </div>
      </Link>
      <div>
        <div className="SearchInputContainer">
          <SearchIcon
            className="searchIcons"
            sx={{ fontSize: 30, color: "black" }}
          />
          <input
            className="searchInput"
            placeholder={
              window.innerWidth <= 320
                ? "Search"
                : "Search your friends, groups, pages, etc."
            }
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="IconsContainer">
        <div className="bellAndMessageIcons">
          <div className="navbar-two-icons">
            <div className="navbar-icon-div">
              <img src={bell} alt="" className="navbar-chat" />
            </div>
            <div className="navbar-icon-div">
              <img src={chat} alt="chat" className="navbar-chat" />
            </div>
          </div>
          <div>
            <BasicMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
