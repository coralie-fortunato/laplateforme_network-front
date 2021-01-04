import React from 'react'

const FormPostCreate = () => {
	return (
		<form action='' method='post' className='col-12'>
			<div className='form-group'>
				<label htmlFor='post_content'>Contenu de votre publication</label>

				<textarea
					name=''
					id=''
					cols='30'
					rows='18'
					className='form-control'
				></textarea>
			</div>

			<div className='input-group mb-3'>
				<div className='custom-file'>
					<input
						type='file'
						className='custom-file-input'
						id='inputGroupFile02'
					/>
					<label
						className='custom-file-label'
						htmlFor='inputGroupFile02'
						aria-describedby='inputGroupFileAddon02'
					>
						Ajouter une image
					</label>
				</div>
			</div>

			<button className='btn btn-lg btn-success col-12'>valider</button>
		</form>
	)
}

export default FormPostCreate
