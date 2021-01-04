import React from 'react'
import { HashLink } from 'react-router-hash-link'

const AnchorLink = ({ url, text, className }) => {
	return (
		<HashLink smooth to={url} className={className ? className : ''}>
			{text}
		</HashLink>
	)
}

export default AnchorLink
