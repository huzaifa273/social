// import { Login } from "@mui/icons-material";
import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Pofile";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import { useSelector } from "react-redux";
import Forgot from "./Pages/OTP/Forgot";
import VerifyEmail from "./Pages/OTP/verifyEmail";
import ResetPassword from "./Pages/OTP/ResetPassword";
import LeftBarImages from "./Components/LeftSideContainer/LeftBarImages";
import Explore from "./Pages/Explore/Explore";

function App() {
  const userDetails = useSelector((state) => state.user);
  // let user = userDetails.user;
  let user = userDetails?.user;
  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user?.others?.verified === true ? (
                <Home />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )
            }
          ></Route>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route
            path="/login"
            element={
              user?.others?.verified === true ? (
                <Navigate to={"/"} replace={true} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgot/password" element={<Forgot />}></Route>
          <Route
            path="/verify/email"
            element={
              user?.Status === "Pending" ? (
                <VerifyEmail />
              ) : user?.others?.verified === true ? (
                <Navigate to={"/"} replace={true} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="/reset/password" element={<ResetPassword />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
