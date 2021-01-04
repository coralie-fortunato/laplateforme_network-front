import React, { useState } from 'react'
import { uploadFile, post } from '../../../services/Api/requests'
import DropZone from '../../DropZone/index'
import { useSelector } from 'react-redux'
import './index.scss'
import LoaderSpinner from '../../LoaderSpinner'
import ErrorPage from '../../../pages/ErrorPage'
import IconClose from '../../icons/IconClose/index'

const FormNewPost = ({ setNewPost, setModalDisplayed }) => {
	const [status, setStatus] = useState(200)
	const current_user = useSelector((state) => state.current_user)
	const [droppImageFields, setDroppImageField] = useState([
		{ id: 'dropField-1', droppedImage: null },
	])
	const [content, setContent] = useState(
		"Un tips à partager, besoin d'un peu d'aide, n'hesites pas c'est ici est maintenant !"
	)

	const handleDroppedImage = (droppedImage, fieldId) => {
		const updatedImageField = droppImageFields.find(
			(element) => element.id === fieldId
		)

		const otherFields = droppImageFields.filter(
			(element) => element.id !== fieldId
		)
		setDroppImageField([
			...otherFields,
			{ ...updatedImageField, droppedImage: droppedImage },
		])
	}

	const handleAddField = (event) => {
		event.preventDefault()
		const newDroppImageField = {
			id: `dropField-${droppImageFields.length + 1}`,
			droppedImage: null,
		}
		setDroppImageField([...droppImageFields, newDroppImageField])
	}

	const handleRemoveField = (event) => {
		event.preventDefault()
		setDroppImageField(droppImageFields.slice(0, droppImageFields.length - 1))
	}

	const handleInput = (event) => {
		setContent(event.target.value)
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		setStatus('loading')
		const uploadImages = async () => {
			const validatedDroppImageFields = droppImageFields.filter(
				(imageField) => imageField.droppedImage !== null
			)
			if (validatedDroppImageFields.length > 0) {
				const droppedImagePromises = validatedDroppImageFields.map(
					async (imageField) => {
						if (imageField.droppedImage) {
							const image = new FormData()
							image.append('image_file', imageField.droppedImage.file)
							return await uploadFile(image)
						}
					}
				)
				const uploadResponse = await Promise.all(droppedImagePromises).then(
					(image) => image
				)
				setStatus(200)
				return uploadResponse.map((response) => response.data)
			} else {
				setStatus(500)
			}
		}

		if (current_user && droppImageFields) {
			const imagesUrls = await uploadImages()
			const { data, status } = await post({
				content,
				image_path: JSON.stringify(imagesUrls),
			})

			if (status === 200) {
				setNewPost(data)
			}
			setStatus(status)
		} else {
			setStatus(403)
		}
	}
	return status === 200 ? (
		<form
			action=''
			className='col-12 col-lg-6 bg-white p-4 block overflow-auto'
			id='form-new-post'
		>
			<div className='row d-flex justify-content-end'>
				<IconClose onClick={() => setModalDisplayed(false)} />
			</div>
			<h2>Publier vos pensées ...</h2>
			<hr className='mb-4' />
			<h5>Rediger un nouveau message </h5>
			<div className='form-group'>
				<textarea
					name=''
					id=''
					rows='5'
					className='form-control p-2'
					onInput={handleInput}
					value={content}
				></textarea>
			</div>

			<div className='col-12 d-flex flex-column justify-content-center align-items-center'>
				<h5>Partager une image : </h5>
			</div>

			{droppImageFields.map((dropField) => (
				<div className='row p-0' key={dropField.id}>
					<div className='col-12'>
						<DropZone
							label='Ajouter une photo'
							labelDropZone='Cliquer ici pour ajouter une image'
							style={{ height: '20rem' }}
							droppedImage={dropField.droppedImage}
							setDroppedImage={(value) =>
								handleDroppedImage(value, dropField.id)
							}
						/>
					</div>
				</div>
			))}

			<div
				className='row d-flex justify-content-center align-items-center
      my-4'
			>
				<button
					className='btn btn-md shadow btn-outline-dark ml-2'
					onClick={handleAddField}
				>
					+
				</button>
				<button
					className='btn btn-md shadow btn-outline-dark ml-2'
					onClick={handleRemoveField}
				>
					-
				</button>
			</div>

			<button
				className='btn btn-lg col-12 btn-primary my-2'
				onClick={handleSubmit}
			>
				publier
			</button>
		</form>
	) : status === 'loading' ? (
		<LoaderSpinner style={{ height: '100%' }} />
	) : (
		<ErrorPage status={status} />
	)
}

export default FormNewPost
