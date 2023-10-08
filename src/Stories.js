import React from "react";
import "./Stories.css";

function Stories({ image, username }) {
  return (
    <div className="stories">
      <div className="stories__contents">
        <img src={image} alt="" />
        <h3>{username}</h3>
      </div>
    </div>
  );
}

export default Stories;
