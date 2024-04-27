import React, { useEffect, useState } from "react";
import "./leftbar.css";
import c from "../Images/c.jpg";
import ac from "../Images/ac.jpg";
import image0 from "../Images/image0.jpg";
import image1 from "../Images/image1.jpg";
import image2 from "../Images/image2.jpg";
import image3 from "../Images/image3.jpg";
import image4 from "../Images/image4.jpg";
import image5 from "../Images/image5.jpg";
import image6 from "../Images/image6.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from "../MaterialUI/Alert";
import NewLeftBar from "./NewLeftBar";
import LeftBarImages from "./LeftBarImages";
import { Link } from "react-router-dom";

function LeftBar() {
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2Y4Y2FkNDUxNTFlODY3NjlhODc5OSIsInVzZXJuYW1lIjoiTWFsaWsgSHV6YWlmYSIsImlhdCI6MTcwODE1ODMwMX0.lfwGIDA5rDPnymWpXsXyL_FPkmhOV6vWeArGnDbtD3s";

  const userDetails = useSelector((state) => state.user);
  let accessToken = userDetails.user.accessToken;
  // console.log(userDetails.user);
  let id = userDetails.user.others._id;
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `https://social-gilt.vercel.app/api/user/flw/${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setPost(res.data);
      } catch (error) {}
    };
    getPost();
  }, []);
  return (
    <div className="leftbar-main">
      {/* <Alert message={"Okay Bhai"} /> */}

      <div className="Leftbar-top">
        <NewLeftBar />
        {/* <div className="leftbarContainer">
          <div className="notificationContainer">
            <p>Activities</p>
            <p>See all</p>
          </div>
          <div className="notification">
            <div className="notificationImg">
              <img src={image0} alt="" />
            </div>
            <p>Arsalan Liked your post</p>
            <img src={c} alt="" className="notificationPostImg" />
          </div>
          <div className="notification">
            <div className="notificationImg">
              <img src={image1} alt="" />
            </div>
            <p>Jhon Doe Liked your post</p>
            <img src={image2} alt="" className="notificationPostImg" />
          </div>
          <div className="notification">
            <div className="notificationImg">
              <img src={image3} alt="" />
            </div>
            <p>Aleem Liked your post</p>
            <img src={image4} alt="" className="notificationPostImg" />
          </div>
          <div className="notification">
            <div className="notificationImg">
              <img src={image5} alt="" />
            </div>
            <p>Mudasser Liked your post</p>
            <img src={c} alt="" className="notificationPostImg" />
          </div>
          <div className="notification">
            <div className="notificationImg">
              <img src={image6} alt="" />
            </div>
            <p>Jhon Wick has started following you</p>
            <img src={ac} alt="" className="notificationPostImg" />
          </div>
          <div className="notification">
            <div className="notificationImg">
              <img src={c} alt="" />
            </div>
            <p>Jhon Wick has started following you</p>
            <img src={ac} alt="" className="notificationPostImg" />
          </div>
          <div className="notification">
            <div className="notificationImg">
              <img
                src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
            <p>Jhon Doe Liked your post</p>
            <img src={c} alt="" className="notificationPostImg" />
          </div>
        </div> */}
      </div>

      <div className="Leftbar">
        <div className="leftbarContainer">
          <div className="notificationContainer">
            <h3>Explore</h3>
            <Link to={"/explore"}>
              <p>See all</p>
            </Link>
          </div>
          <LeftBarImages />
          {/* <div className="imagesDiv">
            {post.map(
              (item) =>
                item.image && (
                  <img
                    key={item._id}
                    src={item.image}
                    alt=""
                    className="exploreImage"
                  />
                )
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
