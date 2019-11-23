import React from 'react';

const GifItem = (image) => {
  return (
    <div className="gif-result-display">
      <li>
        <img src={image.gif.url} />
      </li>
    </div>
  )
};

export default GifItem;