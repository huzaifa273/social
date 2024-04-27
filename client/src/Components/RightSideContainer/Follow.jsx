import React, { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAdded from "@mui/icons-material/HowToReg";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Follow({ item }) {
  const [follow, setFollow] = useState(false);
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2Y4Y2FkNDUxNTFlODY3NjlhODc5OSIsInVzZXJuYW1lIjoiTWFsaWsgSHV6YWlmYSIsImlhdCI6MTcwODE1ODMwMX0.lfwGIDA5rDPnymWpXsXyL_FPkmhOV6vWeArGnDbtD3s";
  // console.log(item);
  const userDetails = useSelector((state) => state.user);
  let accessToken = userDetails.user.accessToken;
  const handleFollow = async (e) => {
    setFollow(true);
    const res = await axios.put(
      `http://localhost:5000/api/user/following/${item._id}`,
      {},
      {
        headers: {
          token: accessToken,
        },
      }
    );
  };
  // const img = item.profilePicture;
  return (
    <div className="addNewFriendDiv">
      <Link to={`/profile/${item._id}`}>
        <div className="addFriendDivLeft">
          <img src={item.profilePicture} alt="" className="profileImage" />
          <div>
            <p>{item.username}</p>
            <p>Suggested for you</p>
          </div>
        </div>
      </Link>
      <div onClick={(e) => handleFollow(item._id)}>
        {follow ? (
          <PersonAdded className="addFriendIcon" />
        ) : (
          <PersonAddAltIcon className="addFriendIcon" />
        )}
      </div>
    </div>
  );
}

export default Follow;
