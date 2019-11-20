import React from 'react';

function ViewFullImage(props){
    return (
        <div className="gif-focus-display" >
            <img src={props.gifUrl} alt="" />
        </div>
    )
}

export default ViewFullImage;