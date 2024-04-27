import React, { useEffect, useState } from "react";
import stories from "../Images/stories.jpg";
import "./stories.css";
import Modal from "../MaterialUI/Modal";

function Stories() {
  const [activeOption, setActiveOption] = useState(0);
  const [lastHover, setLastHover] = useState(Date.now());
  const [timerId, setTimerId] = useState(null);

  const handleOptionHover = (index) => {
    setActiveOption(index);
    setLastHover(Date.now());
  };

  //   useEffect(() => {
  //     if (timerId) clearTimeout(timerId);

  //     const id = setInterval(() => {
  //       if (Date.now() - lastHover > 10000) {
  //         setActiveOption((prevActiveOption) => (prevActiveOption + 1) % 5);
  //       }
  //     }, 6000); // Changed to 6 seconds

  //     // setTimerId(id);

  //     return () => {
  //       if (timerId) clearTimeout(timerId);
  //     };
  //   }, [lastHover, timerId]);

  const officeStories = `https://api.unsplash.com/search/photos?page=1&query=office&client_id=M0QpMaZvQfJo21Qu_ObIsEZ7KLTGkpacOPAysQ_6spE`;
  //fetch stories from an unsplash API and display them in the options
  const fetchStories = async () => {
    try {
      const response = await fetch(officeStories).then((res) => res.json());
      console.log("Hello");
      console.log(response.results.map((item) => item));
    } catch (error) {
      console.log(error);
    }
  };
  //   fetchStories();
  const render = (
    <img
      src="https://source.unsplash.com/random/nature"
      alt=""
      className="modal-story"
    />
  );

  return (
    <div className="options">
      {/* <Modal render={render} /> */}
      {/* {render} */}
      <div
        className={`option ${activeOption === 0 ? "active" : ""}`}
        style={{
          "--optionBackground": `url(https://source.unsplash.com/random/nature)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onMouseEnter={() => handleOptionHover(0)}
      >
        <div className="shadow"></div>
        <div className={`${activeOption === 0 ? "label" : "hide"}`}>
          {/* <div className="icon">
            <img
              src="https://random.imagecdn.app/500/150"
              alt=""
              className="story-profile"
            />
          </div> */}
          <div className="info">
            <h3 className="main">Nature </h3>
            <p className="sub">On Unsplash</p>
          </div>
        </div>
      </div>
      {/* Repeat the same structure for other options, updating the index and active class accordingly */}
      <div
        className={`option ${activeOption === 1 ? "active" : ""}`}
        style={{
          "--optionBackground": "url(https://source.unsplash.com/random/city)",
        }}
        onMouseEnter={() => handleOptionHover(1)}
      >
        <div className="shadow"></div>
        <div className={`${activeOption === 1 ? "label" : "hide"}`}>
          <div className="info">
            <h3 className="main">Cities</h3>
            <p className="sub">On Unsplash</p>
          </div>
        </div>
      </div>
      <div
        className={`option ${activeOption === 2 ? "active" : ""}`}
        style={{
          "--optionBackground": "url(https://source.unsplash.com/random/sport)",
        }}
        onMouseEnter={() => handleOptionHover(2)}
      >
        <div className="shadow"></div>
        <div className={`${activeOption === 2 ? "label" : "hide"}`}>
          <div className="info">
            <h3 className="main">Sport</h3>
            <p className="sub">On Unsplash</p>
          </div>
        </div>
      </div>
      <div
        className={`option ${activeOption === 3 ? "active" : ""}`}
        style={{
          "--optionBackground": "url(https://source.unsplash.com/random/movie)",
        }}
        onMouseEnter={() => handleOptionHover(3)}
      >
        <div className="shadow"></div>
        <div className={`${activeOption === 3 ? "label" : "hide"}`}>
          <div className="info">
            <h3 className="main">Movies</h3>
            <p className="sub">On Unsplash</p>
          </div>
        </div>
      </div>
      <div
        className={`option ${activeOption === 4 ? "active" : ""}`}
        style={{
          "--optionBackground":
            "url(https://source.unsplash.com/random/coding)",
        }}
        onMouseEnter={() => handleOptionHover(4)}
      >
        <div className="shadow"></div>
        <div className={`${activeOption === 4 ? "label" : "hide"}`}>
          <div className="info">
            <h3 className="main">Tech</h3>
            <p className="sub">On Unsplash</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;
