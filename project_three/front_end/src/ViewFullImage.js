import React from "react";

function ViewFullImage(props) {
  return (
    <div className="gif-focus-display ">
      <div>
        <div className="overlay"></div>
        <img src={props.url} alt="" />
      </div>
      <div>
        <button className="close" onClick={() => props.handleClick("")}>X</button>
      </div>
    </div>
  );
}

export default ViewFullImage;
