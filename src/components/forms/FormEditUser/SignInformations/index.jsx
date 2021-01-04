import React from 'react'

const SignInformations = ({ data: { id, email } }) => {
	return (
		<form action='' className='col-12 flex my-4' id={`form-user-profile-${id}`}>
			<h2>Informations de connexion</h2>
			<div className='form-group'>
				<label htmlFor=''>Email</label>
				<input type='email' className='form-control' value={email} />
			</div>
			<div className='form-group'>
				<label htmlFor=''>Mot de passe :</label>
				<input type='text' className='form-control' />
			</div>
			<div className='form-group'>
				<label htmlFor=''>Confirmer le de passe :</label>
				<input type='text' className='form-control' />
			</div>
			<button className='btn btn-md col-12 col-lg-3 btn-success' type='submit'>
				valider
			</button>
		</form>
	)
}

export default SignInformations
