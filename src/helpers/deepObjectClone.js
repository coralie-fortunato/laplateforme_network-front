const deepObjectClone = (object) => {
	let newObject = {}

	for (const key in object) {
		if (typeof object[key] === 'object') {
			newObject[key] = { ...object[key] }
		} else if (Array.isArray(object[key])) {
			newObject[key] = [...object[key]]
		} else {
			newObject[key] = object[key]
		}
	}

	return newObject
}

export default deepObjectClone
