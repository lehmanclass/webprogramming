
import React from "react";

const ImageView = (props)=>{
  return (
    <div className="gif-focus-display ">
      <div>
        <div className="overlay"></div>
        <img src={props.url} alt="" />
      </div>
      <div>
        <button className="fermer" onClick={() => props.TheClick("")}> Close </button>
      </div>
    </div>
  );
}

export default ImageView;