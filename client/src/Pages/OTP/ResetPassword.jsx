import React, { useState } from "react";
import "./otp.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const location = useLocation();
  const code = location.search.split("?")[1];
  console.log(code);
  const [password, setPassword] = useState("");
  console.log(password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/api/user/reset/password?${code}`, {
        password: password,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className="forgot-main-div">
      <div className="forgot-div">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter New Password"
            className="forgot-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <i class="zmdi zmdi-account zmdi-hc-lg"></i>
        </div>

        {/* <div className="input-container">
          <input type="password" placeholder="Password" />
          <i class="zmdi zmdi-lock zmdi-hc-lg"></i>
        </div> */}

        <button type="submit" className="otp-button" onClick={handleSubmit}>
          Confirm New Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
