import React from 'react'
import { useDropzone } from 'react-dropzone'

const DropZone = ({
	id,
	label,
	labelDropZone,
	style,
	droppedImage,
	setDroppedImage,
}) => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (files) => {
			Object.assign(files[0], {
				preview: URL.createObjectURL(files[0]),
			})
			return setDroppedImage({ id, file: files[0] })
		},
	})

	return (
		<div className='w-full h-full px-2 bg-white'>
			<div
				className='p-2 my-4'
				style={{
					borderStyle: 'dotted',
					...style,
				}}
			>
				<div
					className='d-flex justify-content-center align-items-center'
					style={{
						backgroundImage: `url(${
							droppedImage ? droppedImage.file.preview : ''
						})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundSize: 'contain',
						height: '100%',
						width: '100%',
					}}
					{...getRootProps()}
				>
					<input id={id} type='file' {...getInputProps()} />
					{!droppedImage && (
						<p className='text-center my-auto p-2'>{labelDropZone}</p>
					)}
				</div>
			</div>
			<div className='my-4 p-2'>
				{!droppedImage ? (
					<p className='text-center my-auto'>{label}</p>
				) : (
					<p className='text-center my-auto'>
						cliquer dans la zone pour changer la photo
					</p>
				)}
			</div>
		</div>
	)
}

export default DropZone
