import React, { useEffect, useState } from "react";
import "./profilemainPost.css";
import ContentPost from "../ContentPostContainer/ContentPost";
import Post from "../Post/Post";
import ad1 from "../Images/ad1.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function ProfileMainPost() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  // console.log(id);
  const userDetails = useSelector((state) => state.user);
  let accessToken = userDetails.user.accessToken;
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2Y4Y2FkNDUxNTFlODY3NjlhODc5OSIsInVzZXJuYW1lIjoiTWFsaWsgSHV6YWlmYSIsImlhdCI6MTcwODE1ODMwMX0.lfwGIDA5rDPnymWpXsXyL_FPkmhOV6vWeArGnDbtD3s";
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        // console.log("Get posts");
        const res = await axios.get(
          `http://localhost:5000/api/post/get/post/${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);
  let lastPost = post[post.length - 1]?.image;
  return (
    <div className="profileMainPostContainer">
      {lastPost && (
        <div>
          <img src={lastPost} alt="" className="profileCoverImage" />
          <h2 className="yourProfile">Recent Post</h2>
        </div>
      )}
      <ContentPost />
      {post.map((item) => (
        <Post post={item} key={item._id} />
      ))}

      {/* {post.map()} */}
    </div>
  );
}

export default ProfileMainPost;
