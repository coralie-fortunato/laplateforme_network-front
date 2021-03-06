const CONNECTION_TYPE = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'

var WEBSOCKET_CLIENT = new WebSocket(`${CONNECTION_TYPE}://localhost:8080`)

export { WEBSOCKET_CLIENT, CONNECTION_TYPE }
