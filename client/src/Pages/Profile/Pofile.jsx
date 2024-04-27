import React from "react";
import "./profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import ProfileLeftBar from "../../Components/ProfileLeftSideContainer/ProfileLeftBar";
import ProfileRightBar from "../../Components/ProfileRightSideContainer/ProfileRightBar";
import ProfileMainPost from "../../Components/ProfileMainPostContainer/ProfileMainPost";
import BottomNavbar from "../../Components/BottomNavbar/BottomNavbar";
function Pofile() {
  return (
    <div className="profileContainerDiv">
      <Navbar />
      <div className="subProfileContainer">
        <ProfileLeftBar />
        <ProfileMainPost />
        <ProfileRightBar />
      </div>
      <div className="mobileBottomNavbar">
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Pofile;
