import { useState, useEffect } from 'react'

const useParseLinks = (content, current_user) => {
	const [links, setLinks] = useState(null)
	const [formattedContent] = useState(
		content.replace(/(https:\/\/[a-z0-9\S]+)/g, "<a href='$1'>lien</a>")
	)

	const parseCommentLinks = (content) => {
		setLinks(content.match(/https:\/\/[a-z0-9\S]+/g))
	}

	useEffect(() => {
		parseCommentLinks(content)
	}, [current_user])

	return [links, formattedContent]
}

export default useParseLinks
