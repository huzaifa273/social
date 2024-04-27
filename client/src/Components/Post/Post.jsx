import React, { useEffect, useState } from "react";
import "./post.css";
import Profile from "../Images/profile.jpg";
// import image6 from "../Images/image6.jpg";
// import image11 from "../Images/image11.jpg";
import EmptyLike from "@mui/icons-material/FavoriteBorder";
import FilledLike from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { Tune } from "@mui/icons-material";

function Post({ post }) {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user.user);
  const userId = userDetails.others._id;
  const username = userDetails.others.username;
  const profile = userDetails.others.profilePicture;
  // console.log(id);
  // console.log(username);
  // console.log(id);
  const [user, setUser] = useState([]);
  // console.log(post.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/post/user/details/${post.user}`
        );
        setUser(res.data);
      } catch (error) {
        console.log({ "Some Error Occured": error });
      }
    };
    getUser();
  }, []);
  // console.log(post);
  const accessToken = userDetails.accessToken;
  const [like, setLike] = useState(post.like.includes(userId) ? true : false);
  const [count, setCount] = useState(post.like.length);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  // console.log(allComments.map((comment) => if(comment.length > 0) {return comment} else {return "No Comments"}));
  const showCommentsHandler = () => {
    setShowComments(!showComments);
  };
  const addComment = async () => {
    const newComment = {
      postId: `${post._id}`,
      username: username,
      comment: `${comment}`,
    };
    // console.log(newComment);

    const res = await axios.put(
      `http://localhost:5000/api/post/comment/post`,
      {
        postId: `${post._id}`,
        username: username,
        comment: `${comment}`,
        profilePicture: profile,
      },
      {
        headers: {
          token: accessToken,
        },
      }
    );
    setAllComments(res.data);
    setComment("");
  };
  // console.log(allComments);
  const handlePostComment = () => {
    addComment();
    // setAllComments([...allComments, allComments]);
    setComment("");
    setShowComments(true);
    // console.log(addComment());
  };

  const handleLike = async () => {
    if (like == false) {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/post/${post._id}/like`,
          {
            user: userId,
          },
          {
            headers: {
              token: accessToken,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      setLike(true);
      setCount(count + 1);
    } else {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/post/${post._id}/like`,
          {
            user: userId,
          },
          {
            headers: {
              token: accessToken,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      setLike(false);
      setCount(count - 1);
      console.log("Dislike");
    }
  };

  return (
    <div className="postDiv">
      <div className="subPostDiv">
        <div className="topDiv">
          <div className="profileDiv">
            {user.profilePicture == "" ? (
              <img src={Profile} alt="" className="profile" />
            ) : (
              <img
                src={user.profilePicture ? user.profilePicture : Profile}
                alt=""
                className="profile"
              />
            )}
            <div className="profileText">
              <p>{user.username}</p>
              <p>Followed by Mudasser</p>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <p className="contentText">{post.title}</p>
        {post.image !== "" ? (
          <img src={post.image} alt="" className="postImage" />
        ) : post.video !== "" ? (
          <video className="postImage" controls>
            {" "}
            <source src={post.video} />{" "}
          </video>
        ) : (
          ""
        )}

        {/* Like and share parts Div */}

        <div className="bottomOfPost">
          <div className="leftBottomOfPost">
            <div className="like">
              <div onClick={handleLike}>
                {like ? (
                  <FilledLike className="like-icon" />
                ) : (
                  <EmptyLike className="like-icon" />
                )}
              </div>
              <p>{count}</p>
            </div>
            <div className="comment" onClick={showCommentsHandler}>
              <ChatBubbleOutlineIcon />
              <p>
                {post.comments.length > 0 ? post.comments.length : ""} Comments
              </p>
            </div>
          </div>
          <div className="rightBottomOfPost">
            <ShareIcon />
            <p>Share</p>
          </div>
        </div>

        {/* Write a comment Div */}
        <div className="commentDiv">
          <div className="commentDivLeft">
            <img
              src={profile ? profile : Profile}
              alt=""
              className="commentProfile"
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Write a comment"
              className="commentInput"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            {comment != "" && (
              <button className="commentButton" onClick={handlePostComment}>
                <SendIcon />
              </button>
            )}
          </div>
        </div>
        {showComments ? (
          <div className="allCommentsDiv">
            <div>
              {allComments.map((comment) => (
                <div className="showAllComments" key={comment._id}>
                  <div>
                    <img
                      src={comment.profilePicture || Profile}
                      alt=""
                      className="commentProfile"
                    />
                  </div>
                  <div className="postedComment">
                    <p>{comment.username}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Post;
