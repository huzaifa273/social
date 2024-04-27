import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import LeftBarImages from "../../Components/LeftSideContainer/LeftBarImages";
import "./explore.css";
import LeftBar from "../../Components/LeftSideContainer/LeftBar";
import BottomNavbar from "../../Components/BottomNavbar/BottomNavbar";

function Explore() {
  return (
    <div>
      <Navbar />
      <div className="exploreMain">
        <div className="exploreContent">
          <div className="exploreLeft">
            <LeftBar />
          </div>
          <div className="exploreRight">
            <p className="explore-title">Explore</p>
            <LeftBarImages />
          </div>
        </div>
      </div>
      <div className="mobileBottomNavbar">
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Explore;
