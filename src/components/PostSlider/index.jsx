import React from 'react'
import API_BASE_URL from '../../services/config/index'
import './index.scss'
import { Carousel } from 'react-responsive-carousel'

const PostSlider = ({ sliderData, classNames }) => {
	return (
		<Carousel>
			{sliderData?.map((image) => (
				<div key={image}>
					<img
						src={API_BASE_URL + '/images/' + image}
						alt='post'
						className='img-fluid'
					/>
				</div>
			))}
		</Carousel>
	)
}

export default PostSlider
