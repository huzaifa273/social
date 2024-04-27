import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../Components/ReduxContainer/apiCall";
import { useDispatch, useSelector } from "react-redux";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  // console.log();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

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
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          signup(dispatch, {
            email,
            password,
            username,
            profilePicture: downloadURL,
          });
        });
      }
    );
  };
  console.log(user?.Status);
  if (user?.Status == "Pending") {
    navigate("/verify/email");
    console.log("User is pending");
  } else {
    console.log("User is not pending");
  }

  return (
    <div className="loginMainContainer">
      <div className="loginContainer">
        <div className="pic2"></div>
        <img
          src="https://store-images.s-microsoft.com/image/apps.28471.14139628370441750.28b315c6-e587-4ac5-8b42-4388ed4a2f09.d5ba0d3b-63ca-4d9d-ba00-47fcfa6b02e1"
          alt=""
          className="loginImage"
        />
        <h1 className="loginH1">Sign Up To Continue</h1>
        <div className="inp">
          <input
            type="text"
            id="username"
            className="loginInput"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label for="Username" className="loginLabel">
            Name
          </label>
        </div>
        <div className="inp">
          <input
            type="email"
            id="email"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="email" className="loginLabel">
            Email
          </label>
        </div>
        <div className="inp">
          <input
            type="password"
            id="password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for="Password" className="loginLabel">
            Password
          </label>
        </div>
        <div>
          <label htmlFor="file" className="profile-upload-icon">
            <img
              src="https://img.icons8.com/ios/452/upload.png"
              alt=""
              className="icon"
            />
            <p>Select a profile picture</p>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={
              (e) => setFile(e.target.files[0])
              // setImagePrev(URL.createObjectURL(e.target.files[0])),
            }
            required
          />
        </div>
        <button type="submit" className="loginButton" onClick={handleSubmit}>
          Sign Up
        </button>
        <Link to="/login" className="logina">
          <a className="logina">Have an account? Sign In</a>
        </Link>
      </div>
      <div className="pic"></div>
    </div>
  );
}

export default Signup;
