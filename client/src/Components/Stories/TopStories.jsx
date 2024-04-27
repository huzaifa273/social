import React, { useEffect, useState } from "react";
import "./topStories.css";
import { useSelector } from "react-redux";
import Modal from "../MaterialUI/Modal";
import Button from "@mui/material/Button";
import MainPost from "../MainPostContainer/MainPost";

function TopStories() {
  const user = useSelector((state) => state.user);
  const profile = user.user.others.profilePicture;
  const unsplash =
    "https://api.unsplash.com/photos/?client_id=M0QpMaZvQfJo21Qu_ObIsEZ7KLTGkpacOPAysQ_6spE";
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(unsplash);
      const data = await response.json();
      setData(data);
      // const data = await response.json();
      // setData(data);
      // return data;
    };
    fetchdata();
  }, []);

  // const urls = data.map((item) => item.urls.regular);
  // console.log(data);
  // console.log(data[3]?.urls?.regular);
  // console.log(data[3]?.user?.links?.photos);
  const [photoIndex, setPhotoIndex] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (index) => {
    setOpen(true);
    setPhotoIndex(index);
  };
  const handleClose = () => setOpen(false);
  const modalComponents = Array.from({ length: 5 }).map((_, index) => (
    <div className="single-story" key={index}>
      <Modal
        open={open}
        handleClose={handleClose}
        data={
          <img
            className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
            src={data[photoIndex]?.urls?.regular}
            alt="MD. Shibbir Ahmed"
          />
        }
      />
      <div onClick={() => handleOpen(index)}>
        <div className="w-36 h-52 rounded-xl overflow-hidden flex flex-col relative group cursor-pointer">
          <img
            className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
            src={data[index]?.urls?.regular}
            alt="MD. Shibbir Ahmed"
          />

          <div className="w-8 h-8 border-4 box-content border-gray-800 rounded-full overflow-hidden absolute left-2.5 top-3">
            <img
              className="w-full h-full object-cover"
              src={`https://picsum.photos/200/300?random=${index + 5}`}
              alt="MD. Shibbir Ahmed"
            />
          </div>

          <div className="absolute inset-x-3 bottom-1">
            <p className="text-white font-semibold">
              {data[index]?.user?.name}
            </p>
          </div>

          <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="min-h-screen bg-gray-900 m-6 top-stories-div">
      <div className="flex space-x-2 mx-auto max-w-2xl relative">
        <div className="single-story">
          <div className="w-36 h-52 rounded-xl overflow-hidden flex flex-col group cursor-pointer relative">
            <img
              className="w-full h-4/5 object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
              src={profile}
              alt="Malik Huzaifa"
            />
            <div className="bg-gray-800 relative flex-1 flex flex-col">
              <div className="bg-blue-600 p-0.5 rounded-full border-4 border-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="flex-1 pb-1 text-white text-sm font-semibold capitalize flex justify-center items-end">
                <p>Create Story</p>
              </div>
            </div>

            <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
          </div>
        </div>
        {modalComponents}
      </div>
    </div>
  );
}

export default TopStories;
