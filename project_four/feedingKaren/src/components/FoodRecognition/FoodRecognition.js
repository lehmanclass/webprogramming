import React from 'react';
import './FoodRecognition.css';

const FoodRecognition = ({ imageUrl, foodInfo }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
				<h5> {foodInfo} </h5>
			</div>
		</div>
		);
}

export default FoodRecognition;