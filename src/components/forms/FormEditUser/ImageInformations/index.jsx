import React, { useState } from 'react'
import { uploadFile, userUpdate } from '../../../../services/Api/requests'
import DropZone from '../../../DropZone/index'
import { useSelector } from 'react-redux'
import LoaderSpinnerMini from '../../../LoaderSpinnerMini'
import ErrorPage from '../../../../pages/ErrorPage'

const ImageInformations = ({ setUserData }) => {
	const current_user = useSelector((state) => state.current_user)
	const [status, setStatus] = useState(200)
	const [droppedImageAvatar, setDroppedImageAvatar] = useState(null)
	const [droppedImageCover, setDroppedImageCover] = useState(null)

	const handleUploadAvatar = async () => {
		if (current_user && droppedImageAvatar) {
			setStatus('loading')
			const imageAvatar = new FormData()
			imageAvatar.append('image_file', droppedImageAvatar.file)
			const { data, status } = await uploadFile(imageAvatar)
			if (status === 200) {
				const { data: userData, status: userStatus } = await userUpdate(
					{
						avatar: data.image_url,
					},
					current_user.id
				)
				if (userStatus === 200) {
					setUserData(userData)
				}
				setStatus(userStatus)
			}
			setStatus(status)
		} else {
			setStatus(403)
		}
	}

	const handleUploadCover = async () => {
		if (current_user && droppedImageCover) {
			setStatus('loading')
			const imageCover = new FormData()
			imageCover.append('image_file', droppedImageCover.file)
			const { data, status } = await uploadFile(imageCover)
			if (status === 200) {
				const { data: userData, status: userStatus } = await userUpdate(
					{
						cover: data.image_url,
					},
					current_user.id
				)
				if (userStatus === 200) {
					setUserData(userData)
				}
				setStatus(userStatus)
			}
			setStatus(status)
		} else {
			setStatus(403)
		}
	}
	return status === 200 ? (
		<div className='col-12 flex py-4 my-4' id='ImageInformations'>
			<h5>Ajouter une image de profil et/ou de couverture :</h5>
			<div className='row p-0'>
				<div className='col-12 col-lg-6'>
					<DropZone
						label='Ajouter un avatar'
						labelDropZone='Cliquer ici pour uploader un avatar'
						style={{ height: '30rem' }}
						droppedImage={droppedImageAvatar}
						setDroppedImage={(image) => setDroppedImageAvatar(image)}
					/>
					<button
						className='btn btn-md col-12 btn-primary'
						onClick={handleUploadAvatar}
					>
						mettre en ligne
					</button>
				</div>
				<div className='col-12 col-lg-6'>
					<DropZone
						label='Ajouter une photo de couverture'
						labelDropZone='Cliquer ici pour uploader une photo de couverture'
						style={{ height: '30rem' }}
						droppedImage={droppedImageCover}
						setDroppedImage={(image) => setDroppedImageCover(image)}
					/>
					<button
						className='btn btn-md col-12 btn-primary'
						onClick={handleUploadCover}
					>
						mettre en ligne
					</button>
				</div>
			</div>
		</div>
	) : status === 'loading' ? (
		<LoaderSpinnerMini style={{ height: '100%' }} />
	) : (
		<ErrorPage style={{ height: '100%' }} />
	)
}

export default ImageInformations
