import React, { useEffect, useState } from "react";
import "./rightbar.css";
import ad1 from "../Images/ad1.jpg";
import ad2 from "../Images/ad2.jpg";
import ad3 from "../Images/ad3.jpg";
import axios from "axios";
import Follow from "./Follow";
import { useSelector } from "react-redux";

function RightBar() {
  const [users, setUsers] = useState([]);
  const userDetails = useSelector((state) => state.user.user);
  // console.log(userDetails);
  const accessToken = userDetails.accessToken;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "https://social-gilt.vercel.app/api/user/all/user",
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="rightbar">
      <div className="rightContainer2">
        <p className="friendsYouMightKnow">Suggested Friends</p>
        {users.map((item) => (
          <Follow item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default RightBar;
