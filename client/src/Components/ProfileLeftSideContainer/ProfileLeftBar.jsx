import React, { useEffect, useState } from "react";
import "./profileleftbar.css";
import image12 from "../Images/image12.jpg";
import Profile from "../Images/profile.jpg";
import defaultProfile from "../Images/defaultProfile.jpg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loginSuccess } from "../ReduxContainer/userReducer";
import toast, { Toaster } from "react-hot-toast";

function ProfileLeftBar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const [users, setUsers] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let followersCounter = users?.followers?.length;
  let followingCounter = users?.following?.length;
  let accessToken = userDetails.user.accessToken;
  const loginUser = userDetails.user.others._id;
  const dispatch = useDispatch();
  let user = userDetails.user;
  console.log(users?.followers?.includes(String(loginUser)));
  const [follow, setFollow] = useState();
  // const yesIncldues = users?.followers?.includes(loginUser);
  // if (yesIncldues) {
  //   setFollow("Following");
  // } else {
  //   setFollow("Follow");
  // }
  // console.log(String(loginUser));
  // console.log(users?.followers?.includes(String(loginUser)));
  const [allUsers, setAllusers] = useState([]);
  useEffect(() => {
    const getAllUserExceptFollowing = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/all/user", {
          headers: {
            token: accessToken,
          },
        });

        setAllusers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUserExceptFollowing();
  }, [id]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/post/user/details/${id}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log({ "Some Error Occured": error });
      }
    };
    getUser();
    // setFollow(users?.followers?.includes(loginUser) ? "Following" : "Follow");
  }, [id]);
  useEffect(() => {
    if (users) {
      console.log(users.followers);
      setFollow(users?.followers?.includes(loginUser) ? "Following" : "Follow");
    }
  }, [users]);
  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/user/following/${id}`,
        {},
        {
          headers: {
            token: accessToken,
          },
        }
      );
      toast.success(res.data);
      if (follow == "Follow") {
        setFollow("Following");
      } else if (follow == "Following") {
        setFollow("Follow");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
    // try {
    //   if (follow === "Unfollow") {
    //     const res = await axios.put(
    //       `http://localhost:5000/api/user/unfollow/${id}`,
    //       {},
    //       {
    //         headers: {
    //           token: accessToken,
    //         },
    //       }
    //     );
    //     toast.success("Successfully UnFollowed");
    //   } else {
    //     const res = await axios.put(
    //       `http://localhost:5000/api/user/following/${id}`,
    //       {},
    //       {
    //         headers: {
    //           token: accessToken,
    //         },
    //       }
    //     );
    //     toast.success("Successfully Followed");
    //   }
    //   // dispatch the action
    //   // dispatch({ type: "FOLLOW", payload: id });
    //   // loginSuccess(dispatch());"Follow"
    //   );
    //   // console.log(follow);
    // } catch (error) {}
  };

  // useEffect(() => {
  // }, [id, follow]);

  const [followingUsers, setFollowingUsers] = useState([]);
  useEffect(() => {
    const getFollowingUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/following/${id}`
        );
        setFollowingUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowingUsers();
  }, [id]);

  return (
    <div className="leftbar-main">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="profileLeftbar">
        <div className="coverImage">
          <img src={image12} alt="" />
        </div>
        <div className="profileContainer">
          <img
            src={users.profilePicture ? users.profilePicture : Profile}
            alt=""
            className="profileImageLeftBar"
          />
          <div>
            <p>{users.username}</p>
            {/* <p>Software Developer</p> */}
          </div>
        </div>
        <div className="extraInfoDiv">
          <div className="followers">
            <p>Followers</p>
            <p>{followersCounter}</p>
          </div>
          <div className="following">
            <p>Following</p>
            <p>{followingCounter}</p>
          </div>
          {/* <div>
            <p className="bioTitle">Bio</p>
            <p className="bioDiscription">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Aspernatur explicabo, error repudiandae vel, fuga rem delectus
              accusamus inventore, adipisci at soluta?
            </p>
          </div> */}
          <div>
            {user.others._id == id ? (
              <button className="followButton">Edit Info</button>
            ) : (
              <button className="followButton" onClick={handleFollow}>
                {follow}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profileLeftbar">
        <div className="leftbarContainer">
          <div className="yourFriends">
            <h4>Following</h4>
          </div>
          <div className="notificationContainer">
            <p>Friends</p>
            <p>See all</p>
          </div>
          <div className="allFriendsContainer">
            {followingUsers.map((item) => (
              <Link to={`/profile/${item._id}`} key={item._id}>
                <div className="friendsContainer">
                  {item.profilePicture ? (
                    <img
                      src={item.profilePicture}
                      alt=""
                      className="friendsImage"
                    />
                  ) : (
                    <img src={defaultProfile} alt="" className="friendsImage" />
                  )}
                  <p>{item.username.split(" ", 1)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLeftBar;
