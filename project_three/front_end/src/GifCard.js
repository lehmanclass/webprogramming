import React from "react";

function GifCard(props) {
  return (
    <div
      className="gif-result-display"
      onClick={() => props.handleClick(props.focusUrl)}
    >
      <img src={props.url} alt="gif" width="150px" height="150px" />
    </div>
  );
}

export default GifCard;
