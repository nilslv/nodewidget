import React from "react";
import logo from "../../resources/levity-logo.png";
import { Helper } from "../scripts/paramInit";

function Branding() {
  const helper = new Helper();
  const branding = helper.initializeParam("branding", "true");

  const containerStyle = {
    alignSelf: "flex-end",
    position: "relative",
    display: "flex",
    alignItems: "center",
    top: "10px",
    left: "10px",
    color: "#2b1e6b",
    textDecoration: "none",
  };
  const logoStyle = {
    marginLeft: "10px",
  };

  // conditional rendering depending on branding
  if (branding === "false") {
    return null;
  } else {
    return (
      <>
        {" "}
        <a href="https://levity.ai" style={containerStyle} target="_top">
          <p className="power">powered by</p>
          <img
            id="logo"
            src={logo}
            alt="Levity Logo"
            width="60"
            height="19,2513369"
            style={logoStyle}
          />
        </a>
      </>
    );
  }
}

export default Branding;
