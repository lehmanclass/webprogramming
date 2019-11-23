import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
  const gifItems = props.gifs.map((image) => {
    return <GifItem key={image.id} gif={image} />
  });

  return (
    <ul>{gifItems}</ul>
  );
};

export default GifList;

// var ItemNode = this.state.data.map(function(itemData) {
//     return (
//        <ComponentName title={itemData.title} key={itemData.id} number={itemData.id}/>
//      );
//     });