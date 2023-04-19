const API_KEY = `c0af29b098273ecec419bc70f6b7c23712ea544831a579c714ddceddfe12e7f7`

export const loadTicker = (tickers) =>
fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(',')}&api_key=${API_KEY}`
    ).then(r => r.json())
