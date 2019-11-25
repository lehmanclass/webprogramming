import React from 'react';

const GifItem = ({gif, onGifSelect}) => {
// console.log(image);
// console.log(image.gif);
// console.log(image.gif.url);
// console.log(image.gif.giphy);
  return (
    <div className="gif-result-display" onClick={() => onGifSelect(gif)}>
      <img src={gif.gifUrl} />
    </div>
  )
};

export default GifItem;