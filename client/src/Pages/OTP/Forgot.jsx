import React, { useState } from "react";
import "./otp.css";
import axios from "axios";

function Forgot() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`https://social-gilt.vercel.app/api/user/forget/password`, {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
      });
    console.log(email);
  };
  return (
    <div className="forgot-main-div">
      <div className="forgot-div">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Your Email"
            className="forgot-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <i class="zmdi zmdi-account zmdi-hc-lg"></i>
        </div>

        {/* <div className="input-container">
          <input type="password" placeholder="Password" />
          <i class="zmdi zmdi-lock zmdi-hc-lg"></i>
        </div> */}

        <button type="submit" className="otp-button" onClick={handleSubmit}>
          Send OTP
        </button>
      </div>
    </div>
  );
}

export default Forgot;
