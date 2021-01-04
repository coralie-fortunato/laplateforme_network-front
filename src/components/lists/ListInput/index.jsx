import React from 'react'
import { findParent, findChildren } from '../../../helpers/DOMtreeWalker'

const ListInput = ({ addListItem, itemType }) => {
	const appendNewItem = (event) => {
		let listItem = findParent(event.target, 'list-item')[0]
		let listInput = findChildren(listItem, 'form-control')[0]
		// request to api

		// response will have new object inside
		let dummyObject = {
			id: Math.floor(Math.random() * 10000),
			name: listInput.value,
		}

		addListItem({ value: dummyObject, itemType: itemType })
	}

	return (
		<li className='list-item row col-12 list-input'>
			<div className='col-10 px-0 d-flex align-items-center'>
				<input
					name='add_item'
					className='form-control form-control-lg rounded-pill'
					type='text'
				/>
			</div>

			<div className='col-2 px-0 d-flex align-items-center justify-content-end'>
				<button
					className='btn btn-lg rounded-circle btn border-dark ml-2'
					onClick={appendNewItem}
				>
					+
				</button>
			</div>
		</li>
	)
}

export default ListInput
