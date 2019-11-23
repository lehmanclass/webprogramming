import React from 'react';

const GifItem = (image) => {
  return (
    <div className="gif-result-display">
        <img src={image.gif.url} />
    </div>
  )
};

export default GifItem;