const API_KEY = `b0003d91330495a01e5ae69b7c651343003a7c1f2ab5094141919911deb9025a`
const tickersHandlers = new Map()
const AGGREGATE_INDEX = '5'

const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`)

socket.addEventListener('message', a => {
    const { TYPE: type, FROMSYMBOL: currancy, PRICE: newPrice} = JSON.parse(a.data)
    if (type !== AGGREGATE_INDEX || newPrice === undefined) {
        return
    }
    const handlers = tickersHandlers.get(currancy) ?? []
    handlers.forEach(fn => fn(newPrice))
})

function sendToWebScket(message){
    const stringifyMessage = JSON.stringify(message)

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(stringifyMessage)
        return
    }
    socket.addEventListener('open', ()=>{
        socket.send(stringifyMessage)
    }, { once: true })
}
function subscribeToWebSocket(ticker){
    sendToWebScket({
        "action": "SubAdd",
        "subs": [`5~CCCAGG~${ticker}~USD`]  
    })
}
function unsubscribeFromWebSocket(ticker){
    sendToWebScket({
        "action": "SubRemove",
        "subs": [`5~CCCAGG~${ticker}~USD`]  
    })
}

export const subscribeToTicker = (ticker, callback) => {
    const subscribers = tickersHandlers.get(ticker) || []
    tickersHandlers.set(ticker, [...subscribers, callback])
    subscribeToWebSocket(ticker)
}
// export const unsubscribeFromTicker = (ticker, callback) => {
//     const subscribers = tickersHandlers.get(ticker) || []
//     tickersHandlers.set(ticker, subscribers.filter(fn = fn !== callback))
// }
export const unsubscribeFromTicker = (ticker) => {
    tickersHandlers.delete(ticker)
    unsubscribeFromWebSocket(ticker)
}

window.tickers = tickersHandlers