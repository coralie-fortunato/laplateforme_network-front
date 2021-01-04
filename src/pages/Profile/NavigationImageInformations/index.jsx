import React from 'react'
import AnchorLink from '../../../components/AnchorLink/index'

const NavigationImageInformation = ({ current_user, className, style }) => {
	return (
		<div
			className={className ? className : ''}
			style={style ? { ...style } : {}}
		>
			<AnchorLink
				className={'btn btn-lg btn-light col-12 col-lg-4 my-2'}
				url={`/users/${current_user.id}#ImageInformations`}
				text='changer ma photo de couverture'
			/>
			<AnchorLink
				className={'btn btn-lg btn-light col-12 col-lg-4 my-2'}
				url={`/users/${current_user.id}#ImageInformations`}
				text='  changer ma photo de profil'
			/>
		</div>
	)
}

export default NavigationImageInformation
