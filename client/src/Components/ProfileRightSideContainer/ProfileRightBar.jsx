import React, { useEffect, useState } from "react";
import "./profilerightbar.css";
import defaultProfile from "../Images/defaultProfile.jpg";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import axios from "axios";
import Follow from "../RightSideContainer/Follow";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function ProfileRightBar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let accessToken = userDetails.user.accessToken;
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const getFollowersUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/followers/${id}`
        );
        setFollowers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowersUsers();
  }, [id]);
  // console.log(followers);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/all/user", {
          headers: {
            token: accessToken,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [id]);
  return (
    <div className="rightbar">
      <div className="rightContainer">
        <div className="followersText">
          <h3>Followers</h3>
        </div>
        <div className="allFollowers">
          {followers.map((item) => (
            <Link to={`/profile/${item._id}`} key={item._id}>
              <div className="friendsRequest">
                {/* {console.log(item._id)} */}
                <div className="friendsRequestInfo">
                  {item.profilePicture ? (
                    <img
                      src={item.profilePicture}
                      alt=""
                      className="friendsRequestInfoImage"
                    />
                  ) : (
                    <img
                      src={defaultProfile}
                      alt=""
                      className="friendsRequestInfoImage"
                    />
                  )}
                  <p>{item.username}</p>
                </div>
              </div>
            </Link>
          ))}
          {/* Enable these choices if you add a private account functionality */}
          {/* <div className="choiceDiv">
            <button className="choice">Accept</button>
            <button className="choice">Deny</button>
          </div> */}
        </div>
      </div>
      <div className="rightContainer2">
        <p className="friendsYouMightKnow">Friends you might know</p>
        {users.map((item) => (
          <Follow item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default ProfileRightBar;
