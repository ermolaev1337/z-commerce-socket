const express = require("express");
const {startWS} = require("./web-socket-server");

const app = express();
const port = 8888;

let webSocketConnection;

app.use(express.json());

app.listen(port, async () => {
    wss = startWS();
    console.log("WS Server is running on port", port);
    wss.on("connection", function connection(_webSocketConnection) {
        webSocketConnection = _webSocketConnection;
        wss.on("error", console.error);
        wss.on("message", data=> {
            console.debug("on.message data >>", data)
        });
    });
});

app.post("/webhook/checkout-data", async (req, res) => {
    console.debug("/webhook/checkout-data is triggered, req.body >>", req.body)
    if (!webSocketConnection)
        res.status(503).send({error:"Checkout Frontend is not connected to WS"})//TODO store in the DB
    else {
        webSocketConnection.send(JSON.stringify(req.body));
        res.send({message: "OK"})
    }
});

app.get("/", async (req, res) => {
    res.status(200).json({message: "WS Server is running"})
})

