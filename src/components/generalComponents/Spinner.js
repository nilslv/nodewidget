import React from "react";
import "../stylesheets/Spinner.css";

function Spinner() {
  const optional = false;

  if (optional === true) {
    return (
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" strokeWidth="2" />
        </svg>
      </div>
    );
  }
}

export default Spinner;
