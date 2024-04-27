import React, { useState } from "react";
import "./otp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../Components/ReduxContainer/apiCall";

function VerifyEmail() {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const id = user?.user;
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmail(dispatch, { OTP: OTP, user: id });
    navigate("/");
  };
  return (
    <div className="forgot-main-div">
      <div className="forgot-div">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOTP(e.target.value)}
            className="forgot-input"
          />
          <i class="zmdi zmdi-account zmdi-hc-lg"></i>
        </div>
        <button type="submit" className="otp-button" onClick={handleSubmit}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
