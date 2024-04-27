// import React, { useState } from "react";
import "./contentPost.css";
import Profile from "../Images/profile.jpg";
import image from "../Images/image.png";
import video from "../Images/video.png";
import emoji from "../Images/emoji.png";
import live from "../Images/live.png";
import app from "../../firebase";
// import Alert from "@mui/joy/Alert";
// import { Alert } from '@mui/joy';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../MaterialUI/Alert";
import Navbar from "../Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

function ContentPost() {
  const userDetails = useSelector((state) => state.user.user);

  function changeClass(e) {
    e.target.classList.add("active");
    e.target.innerHTML = "Posted";
  }
  let accessToken = userDetails.accessToken;
  const [title, setTitle] = useState("");
  // for image
  const [file, setFile] = useState(null);
  const [imagePrev, setImagePrev] = useState(null);
  // for video
  const [file2, setFile2] = useState(null);
  const [videoPrev, setVideoPrev] = useState(null);

  const handlePost = (e) => {
    e.preventDefault();
    if (file !== null) {
      toast("Posting...", {
        icon: "♾️",
      });
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          toast.success("Successfully Posted");
        },
        (error) => {
          toast.error("Error Occured!");
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            try {
              const res = axios.post(
                `http://localhost:5000/api/post/user/post`,
                {
                  title: title,
                  image: downloadURL,
                  video: "",
                },
                {
                  headers: {
                    token: accessToken,
                  },
                  // use JSON.stringyfy to convert the object into string
                }
              );

              window.location.reload(true);
            } catch (error) {
              console.log("Error Occured: ", error);
            }
          });
        }
      );
    } else if (file2 !== null) {
      toast("Posting...!", {
        icon: "♾️",
      });
      const fileName = new Date().getTime() + file2.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file2);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          toast.success("Successfully Posted");
        },
        (error) => {
          toast.error("Error Occured!");
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Video File available at", downloadURL);
            try {
              const res = axios.post(
                `http://localhost:5000/api/post/user/post`,
                // use JSON.stringyfy to convert the object into string
                {
                  title: title,
                  image: "",
                  video: downloadURL,
                },
                {
                  headers: {
                    token: accessToken,
                  },
                }
              );
              window.location.reload(true);
            } catch (error) {
              console.log("Error Occured: ", error);
            }
          });
        }
      );
    } else {
      try {
        toast.success("Successfully Posted");
        const res = axios.post(
          `http://localhost:5000/api/post/user/post`,
          // use JSON.stringyfy to convert the object into string
          {
            title: title,
            image: "",
            video: "",
          },
          {
            headers: {
              token: accessToken,
            },
          }
        );
        window.location.reload(true);
      } catch (error) {
        console.log("Error Occured: ", error);
        toast.error("Error Occured!");
      }
    }
  };

  return (
    <div>
      {/* {showAlert && <div></div>} */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="contentUploadContainer">
        <div className="postContainer">
          <img
            src={userDetails.others.profilePicture || Profile}
            alt=""
            className="profile"
          />
          <input
            type="text"
            name=""
            id=""
            className="contentWritePart"
            placeholder="What's on your mind?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <hr className="content-hr" />
        {/* 
        <div>
        <div className="SearchInputContainer">
          <SearchIcon
            className="searchIcons"
            sx={{ fontSize: 30, color: "black" }}
          />
          <input
            className="searchInput"
            placeholder="Search your friends, groups, pages, etc."
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
        */}
        <div>
          {imagePrev !== null ? (
            <img
              src={imagePrev}
              style={{ width: "100%", borderRadius: "10px", marginTop: "10px" }}
            />
          ) : videoPrev !== null ? (
            <video
              src={videoPrev}
              controls
              style={{ width: "100%", borderRadius: "10px", marginTop: "10px" }}
            />
          ) : (
            ""
          )}
        </div>
        <div className="uploadDiv">
          <div className="upload-icons">
            <label htmlFor="file">
              <div className="file-icon-div">
                <img src={image} alt="" className="icon" />
                <p>Photo</p>
              </div>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => [
                  setFile(e.target.files[0]),
                  setImagePrev(URL.createObjectURL(e.target.files[0])),
                ]}
              />
            </label>
            <label htmlFor="file2">
              <div className="file-icon-div">
                <img src={video} alt="" className="icon" />
                <p>Video</p>
              </div>
              <input
                type="file"
                name="file2"
                id="file2"
                style={{ display: "none" }}
                onChange={(e) => [
                  setFile2(e.target.files[0]),
                  setVideoPrev(URL.createObjectURL(e.target.files[0])),
                ]}
              />
            </label>
            <div className="file-icon-div">
              <img src={emoji} alt="" className="icon" />
              <p>Feeling</p>
            </div>
            <div className="file-icon-div">
              <img src={live} alt="" className="icon" />
              <p>Go Live</p>
            </div>
          </div>
          <div>
            {(title !== "" || file !== null || file2 !== null) && (
              <button className="blackButton" onClick={handlePost}>
                Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentPost;
