import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRef } from "@mui/material";
import { login } from "../../Components/ReduxContainer/apiCall";

function Login() {
  const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    // navigate("/");
    // try {
    //   console.log(email);
    //   console.log(password);
    //   const res = await axios.post(`http://localhost:5000/api/user/login`, {
    //     email: email,
    //     password: password,
    //   });
    //   const data = res.data;
    //   console.log(data);
    //   dispatch(actions.loginSuccess(data));
    // } catch (error) {
    //   console.log("Error");
    //   // dispatch(actions.loginFailure(error));
    // }
    // console.log("Hello");
    // dispatch(login());
    // console.log("Hello World!");
  };
  return (
    <div className="loginMainContainer">
      <div className="loginContainer">
        <div className="pic2"></div>
        <img
          src="https://store-images.s-microsoft.com/image/apps.28471.14139628370441750.28b315c6-e587-4ac5-8b42-4388ed4a2f09.d5ba0d3b-63ca-4d9d-ba00-47fcfa6b02e1"
          alt=""
          className="loginImage"
        />
        <h1 className="loginH1">Log in To Continue</h1>
        <div className="inp">
          <input
            type="text"
            id="username"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="Username" className="loginLabel">
            Username
          </label>
        </div>
        <div className="inp">
          <input
            type="password"
            id="password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            onclick="focusinp('pass')"
            for="Password"
            className="loginLabel"
          >
            Password
          </label>
        </div>
        <div>
          <Link to={"/forgot/password"}>
            <a className="logina">Forgot Password? - Support</a>
          </Link>
        </div>
        <button type="submit" className="loginButton" onClick={handleSubmit}>
          Login
        </button>
        <Link to="/signup" className="logina">
          <a className="logina">Dont have a account? Sign up</a>
        </Link>
      </div>
      <div className="pic"></div>
    </div>
  );
}

export default Login;
