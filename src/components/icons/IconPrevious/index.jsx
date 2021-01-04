import React from 'react'

const IconPrevious = ({ onClick, title }) => {
	return (
		<div className='p-2 rounded-circle bg-yellow-color' title={title}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				fill='currentColor'
				className='bi bi-chevron-compact-left'
				viewBox='0 0 16 16'
				onClick={() => onClick()}
				style={{ cursor: 'pointer' }}
			>
				<path
					fillRule='evenodd'
					d='M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z'
				/>
			</svg>
		</div>
	)
}

export default IconPrevious
