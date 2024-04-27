import React, { useEffect, useState } from "react";
import "./mainPost.css";
import ContentPost from "../ContentPostContainer/ContentPost";
import Post from "../Post/Post";
import axios from "axios";
import { useSelector } from "react-redux";
import Stories from "../Stories/Stories";
import TopStories from "../Stories/TopStories";
import Button from "@mui/material/Button";
import Modal from "../MaterialUI/Modal";
function MainPost() {
  const userDetails = useSelector((state) => state.user);
  let accessToken = userDetails.user.accessToken;
  let id = userDetails.user.others._id;
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2Y4Y2FkNDUxNTFlODY3NjlhODc5OSIsInVzZXJuYW1lIjoiTWFsaWsgSHV6YWlmYSIsImlhdCI6MTcwODE1ODMwMX0.lfwGIDA5rDPnymWpXsXyL_FPkmhOV6vWeArGnDbtD3s";
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/flw/${id}`,
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
  const renderPost = post.map((item, index) => (
    <div>
      {index == 1 && <Stories />}
      <Post post={item} key={item._id} />
    </div>
  ));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="mainPostContainer">
      <TopStories />
      <ContentPost />
      {renderPost}
    </div>
  );
}

export default MainPost;
