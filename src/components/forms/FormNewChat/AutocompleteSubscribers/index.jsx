import React, { useState } from 'react'
import ErrorPage from '../../../../pages/ErrorPage'
import { searchUsers } from '../../../../services/Api/requests'
import LoaderSpinner from '../../../LoaderSpinner'

const AutocompleteSubscribers = ({
	selectedSubscribers,
	setSelectedSubscribers,
	isAutocompleActive,
	setAutocompleteActive,
}) => {
	const [status, setStatus] = useState(200)
	const [searchValue, setSearchValue] = useState('')
	const [subscribers, setSubscribers] = useState([])
	const handleInput = async (event) => {
		setSearchValue(event.target.value)
		const { data: users, status } = await searchUsers(searchValue)
		if (status === 200) {
			setSubscribers(users.data)
		}
		setStatus(status)
	}

	const handleClick = (event, subscriber) => {
		if (!selectedSubscribers.find((element) => element.id === subscriber.id)) {
			setSelectedSubscribers([...selectedSubscribers, subscriber])
		}
	}

	return status === 200 ? (
		<div>
			<div className='form-group position-relative'>
				<label htmlFor='search_user'>Avec qui souhaitez vous discutez ?</label>
				<input
					type='text'
					name='search_user'
					id='search_user'
					className='form-control autocomplete-active'
					placeholder='Rechercher un utilisateur par email...'
					value={searchValue}
					onInput={handleInput}
					onFocus={() => setAutocompleteActive(true)}
				/>
			</div>
			<div
				className={`absolute-bottom overflow-auto bg-light mb-3 ${
					isAutocompleActive ? 'd-block' : 'd-none'
				}`}
				style={{ maxHeight: '10rem' }}
			>
				<ul className='list-group m-auto'>
					{subscribers.length > 0 ? (
						subscribers.map((subscriber) => (
							<li
								key={`subscriber-${subscriber.id}`}
								className='list-group-item autocomplete-active'
								id={subscriber.id}
								onClick={(event) => handleClick(event, subscriber)}
								style={{ cursor: 'pointer' }}
							>
								{subscriber.email}
							</li>
						))
					) : (
						<li className='list-group-item'>
							Aucun résultat pour votre recherche
						</li>
					)}
				</ul>
			</div>
		</div>
	) : status === 'loading' ? (
		<LoaderSpinner style={{ height: '100%' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100%' }} />
	)
}

export default AutocompleteSubscribers
