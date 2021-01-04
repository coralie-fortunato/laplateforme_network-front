import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getFeedContent, searchPosts } from '../../../services/Api/requests'

const NavSearch = ({ className, setFeedContent, feedContent }) => {
	const current_user = useSelector((state) => state.current_user)
	const [searchValue, setSearchValue] = useState('')
	const handleInput = (event) => {
		const fetchPosts = async (searchValue) => {
			setSearchValue(searchValue)
			if (searchValue.length > 2) {
				const { data, status } = await searchPosts(searchValue)
				status === 200 && setFeedContent({ ...feedContent, feed_content: data })
			} else {
				const { data, status } = await getFeedContent(current_user.id)
				status === 200 && setFeedContent(data)
			}
		}
		fetchPosts(event.target.value)
	}

	return (
		<form className={className} id='nav-search' method='GET' action=''>
			<div className='relative col-12'>
				<input
					className='form-control form-control-lg w-100 rounded-pill'
					type='search'
					placeholder='Rechercher sur LaPlateforme_ Network'
					aria-label='Search'
					onInput={handleInput}
					value={searchValue}
				/>
			</div>
		</form>
	)
}

export default NavSearch
