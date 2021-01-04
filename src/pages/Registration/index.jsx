import React from 'react'
import laPlateformeLogo from './img/logo_laplateforme.png'
import googleLogo from './icons/google_brand.png'
import './index.scss'

const Registration = () => {
	return (
		<main className='container-fluid p-0 bg-register'>
			<div className='overlay-linear-gradient'>
				<div className='row'>
					<div className='col-12 col-md-9 col-lg-6 d-flex justify-content-center'>
						<div id='card-sign-up'>
							<img
								src={laPlateformeLogo}
								alt='logo LaPlateforme_'
								className='laplateforme-logo'
							/>

							<div className='container-fluid text-center'>
								<h1 className='text-primary'>Bienvenue</h1>

								<button className='btn btn-lg btn-light col-12 col-md-9 relative my-4'>
									<img
										src={googleLogo}
										alt='google authentication'
										className='absolute-left'
									/>
									S&apos;identifier
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Registration
