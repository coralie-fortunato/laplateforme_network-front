import API_BASE_URL from '../config'

var eventStream = new EventSource(API_BASE_URL + '/stream')

export default eventStream
