import React from 'react'
import EmojiPicker from '../../../EmojiPicker/index'

const EmojiPickerWrapper = ({ selectedEmoji }) => {
	return (
		<div
			style={{
				position: 'absolute',
				bottom: '2rem',
				right: '5rem',
			}}
			className='col-6'
		>
			<EmojiPicker selectedEmoji={(emoji) => selectedEmoji(emoji)} />
		</div>
	)
}

export default EmojiPickerWrapper
