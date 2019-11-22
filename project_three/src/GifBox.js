import React from "react";

const GifBox = (props)=> {
  return (
    <div className="gif-result-display"  
    
    onClick={() => props.theClick(props.focusUrl)}>

      <img src={props.url} alt="gif" width="150px" height="150px" />
      
    </div>
  );
}

export default GifBox;