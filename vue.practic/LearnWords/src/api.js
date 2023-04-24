const API_KEY = `b0003d91330495a01e5ae69b7c651343003a7c1f2ab5094141919911deb9025a`
const tickersHandlers = new Map()
const AGGREGATE_INDEX = '5'

const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`)
let worker = new SharedWorker('src/worker.js')

socket.addEventListener('message', a => {
    const { TYPE: type, FROMSYMBOL: currancy, PRICE: newPrice, PARAMETER: param} = JSON.parse(a.data)
    // if (param) {
    //     const tikers = param.split('~')
    //     if (type === '500' && tikers[3] !== 'BTC') {
    //         console.log(tikers[2]);
    //         subscribeToWebSocketBTC(tikers[2])
    //     } else if(tikers[3] === 'BTC') {
    //         return
    //         // console.log('this is Btc');
    //     }
    // }
    const handlers = tickersHandlers.get(currancy) ?? []
    // worker.port.postMessage([currancy, newPrice])
    // worker.port.onmessage = function(e){
    //             console.log(e.data);
    //         }
    if (type !== AGGREGATE_INDEX || newPrice === undefined) {
        return
    }
    
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

function subscribeToWebSocketBTC(ticker){
    sendToWebScket({
        "action": "SubAdd",
        "subs": [`5~CCCAGG~${ticker}~BTC`]  
    })
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
    worker.port.postMessage([ticker])
    worker.port.onmessage = function(e){
                    callback(e.data);
                }
    fn => fn(newPrice)
    // const subscribers = tickersHandlers.get(ticker) || []
    // tickersHandlers.set(ticker, [...subscribers, callback])
    // subscribeToWebSocket(ticker)
}
// export const unsubscribeFromTicker = (ticker, callback) => {
//     const subscribers = tickersHandlers.get(ticker) || []    
//     tickersHandlers.set(ticker, subscribers.filter(fn = fn !== callback))
// }
export const unsubscribeFromTicker = (ticker) => {
    tickersHandlers.delete(ticker)
    unsubscribeFromWebSocket(ticker)
}

// function sendToWorker(ticker){
//     console.log(ticker);
//     worker.port.postMessage([ticker])
//     console.log('sended');
//     worker.port.onmessage = function(e){
//         console.log(e.data);
//     }
// }
window.tickers = tickersHandlers