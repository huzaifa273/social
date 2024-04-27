import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alert() {
  const notify = () => toast("message sent!");
  notify();
  return (
    <div>
      {/* <button onClick={notify}>{label}</button> */}
      <ToastContainer />
    </div>
  );
}

export default Alert;
