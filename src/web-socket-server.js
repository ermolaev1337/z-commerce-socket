const {WebSocketServer} = require("ws")

const port = 7777

const startWS = () => {
    return new WebSocketServer({port});
}

module.exports = {
    startWS,
}