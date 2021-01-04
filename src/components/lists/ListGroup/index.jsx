import React from 'react'
import ListItem from '../ListItem/index'

const ListGroup = ({ itemType, items, isAmmendable }) => {
	return (
		<ul className='col d-flex flex-column align-items-center px-0 py-4 bg-light'>
			{items.map((item) => (
				<ListItem
					key={`${itemType}-${item.id}`}
					itemType={itemType}
					item={item}
					isAmmendable={isAmmendable}
				/>
			))}
		</ul>
	)
}

export default ListGroup
