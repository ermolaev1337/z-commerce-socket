# z-commerce socket

A small relay that lets the controller push a verification result to a browser that is
already sitting on the checkout page.

Part of [z-Commerce](https://github.com/ermolaev1337/z-commerce); it is not meant to run
on its own.

## Why it exists

The wallet talks to the controller, not to the browser. When the proof has been verified,
the page has no way of learning about it — it never made the request. This service holds
the websocket connection to the page and exposes a webhook the controller calls, so the
checkout can update itself the moment the proof lands.

| Endpoint | Purpose |
| --- | --- |
| `POST /webhook/checkout-data` | Called by the controller; the payload is forwarded to every open socket |
| `GET /` | Liveness check |

## Two instances

| Instance | HTTP | WebSocket |
| --- | --- | --- |
| `socket-storefront` | 18888 | 17777 |
| `socket-delivery` | 28888 | 27777 |

The shop and the delivery service each get their own relay, matching their own controller
instance.
