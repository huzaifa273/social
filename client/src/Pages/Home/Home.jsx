import React from "react";
import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import LeftBar from "../../Components/LeftSideContainer/LeftBar";
import MainPost from "../../Components/MainPostContainer/MainPost";
import RightBar from "../../Components/RightSideContainer/RightBar";
import NewLeftBar from "../../Components/LeftSideContainer/NewLeftBar";
import BottomNavbar from "../../Components/BottomNavbar/BottomNavbar";

function Home() {
  return (
    // <div className="home">
    //   <Navbar className="sticky" />
    //   <div className="ComponentsContainer">
    //     <LeftBar className="scrollable" />
    //     <MainPost className="scrollable" />
    //     <RightBar className="scrollable" />
    //   </div>
    // </div>
    <div className="home">
      <Navbar />
      <div className="ComponentsContainer">
        <LeftBar />
        <MainPost />
        <RightBar />
      </div>
      <div className="mobileBottomNavbar">
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Home;
