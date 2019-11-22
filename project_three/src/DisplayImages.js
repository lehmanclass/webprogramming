import React from 'react'



class DisplayImages extends React.Component {
  
    rende() {
        return(
            <div>
                <label>{this.data.url}</label>
            </div>
        ) 

    }
    
}
export default DisplayImages;