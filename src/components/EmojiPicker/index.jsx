import React from 'react'
import Emojis from './emoji.json'

const EmojiPicker = ({ selectedEmoji }) => {
	const handleClick = (emoji) => {
		selectedEmoji(emoji)
	}

	return (
		<div className='col-12 bg-white py-3 d-flex justify-content-between align-items-center flex-wrap'>
			{Emojis.map((emoji, index) => {
				return (
					<div key={index} className='mx-2' onClick={() => handleClick(emoji)}>
						{emoji}
					</div>
				)
			})}
		</div>
	)
}

export default EmojiPicker
