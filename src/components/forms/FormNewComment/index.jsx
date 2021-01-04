import React from 'react'

const FormNewComment = ({ baseKey, handleInput, handleSubmit }) => {
	return (
		<form action='' className='p-0' onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor={`${baseKey}-new-comment`}>
					Laisser un commentaire :
				</label>
				<textarea
					name={`${baseKey}-new-comment`}
					className='form-control'
					onInput={handleInput}
				></textarea>
			</div>

			<button className='btn btn-md btn-primary col-3'>valider</button>
		</form>
	)
}

export default FormNewComment
