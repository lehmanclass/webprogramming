import React from "react";

function GifCard(props) {
  return (
    <div className="gif-result-display">
      <a target="_blank" href={props.url}>
            <img src={props.url} alt="gif" width='150px' height="150px" />
      </a>
    </div>
  );
}

export default GifCard;
