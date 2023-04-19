const API_KEY = `c0af29b098273ecec419bc70f6b7c23712ea544831a579c714ddceddfe12e7f7`
 const tickersHandlers = new Map()
const loadTickers = () =>{
    if(tickers.size === 0) {
        return;
    }
    
    fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickers.keys()].join(',')}&tsyms=USD&api_key=${API_KEY}`
    ).then(r => r.json()).then(beforeData => {
        const updatePrices = Object.fromEntries(Object.entries(beforeData).map(([key, value]) => [key, value.USD]))
        Object.entries(updatePrices).forEach(([currancy, newPrice]) => {
            const handlers = tickersHandlers.get(currancy) ?? []
            handlers.forEach(fn => fn(newPrice))
        })   
});
}

export const subscribeToTicker = (ticker, callback) => {
    const subscribers = tickersHandlers.get(ticker) || []
    tickersHandlers.set(ticker, [...subscribers, callback])
}
// export const unsubscribeFromTicker = (ticker, callback) => {
//     const subscribers = tickersHandlers.get(ticker) || []
//     tickersHandlers.set(ticker, subscribers.filter(fn = fn !== callback))
// }
export const unsubscribeFromTicker = (ticker) => {
    tickersHandlers.delete(ticker)
}

 
setInterval(loadTickers, 3000)
window.tickers = tickersHandlers