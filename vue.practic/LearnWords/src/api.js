const API_KEY = `c0af29b098273ecec419bc70f6b7c23712ea544831a579c714ddceddfe12e7f7`
 const tickers = new Map()
export const loadTickers = (tickers) =>
fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(',')}&tsyms=USD&api_key=${API_KEY}`
    ).then(r => r.json()).then(beforeData => Object.fromEntries(
        Object.entries(beforeData).map(([key, value]) => [key, value.USD])
        ));

export const subscribeToTicker = (ticker, callback) => {
    const subscribers = tickers.get(ticker) || []
    tickers.set(ticker, [...subscribers, callback])
}
export const unsubscribeToTicker = (ticker, callback) => {
    const subscribers = tickers.get(ticker) || []
    tickers.set(ticker, subscribers.filter(fn = fn !== callback))
}