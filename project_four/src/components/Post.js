import React from 'react';
import '../css/Post.css';

export default function Post(props) {
  return (
    <div className="Post">
      {props.post}
    </div>
  );
}