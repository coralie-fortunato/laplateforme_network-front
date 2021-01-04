const parseDate = (timestamp) => {
	let date = new Date(timestamp)

	let month = date.getMonth() + 1

	let day = date.getDate()

	let year = date.getFullYear()

	let hours = date.getHours()

	let seconds = date.getSeconds()

	return `${day}/${month}/${year} à ${hours}:${seconds}`
}

export default parseDate
