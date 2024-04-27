import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxContainer/userReducer";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Images/profile.jpg";

function BasicMenu() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.others._id;
  let profile = user?.others.profilePicture;
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = () => {
    let path = "/login";
    navigate(path);
    dispatch(logout());
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="navbarProfileButton"
      >
        <img
          src={profile ? profile : Profile}
          alt=""
          className="navbarProfileImage"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={`/profile/${id}`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default BasicMenu;
