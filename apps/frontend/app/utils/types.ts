
// KLine data come from the backend in the following format:
export interface KLine {   // KLine is a candlestick chart that is used to represent the price movement of a security, derivative, or currency.    
    close: string;
    end: string;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    start: string;
    trades: string;
    volume: string;
}

export interface Trade {
    "id": number,
    "isBuyerMaker": boolean,
    "price": string,
    "quantity": string,
    "quoteQuantity": string,
    "timestamp": number
}


// [[price,quantity],[],[],[]]
export interface Depth {
    bids:[string,string][],    // type is tuple means array of arrays this array contain two elements first is string(price) and second is string(quantity)
    asks: [string, string][],
    lastUpdateId: string
}

// Ticker is basically a summary of the market data for a particular trading pair or asset it contain all latest data of the market
export interface Ticker { 
    "firstPrice": string,
    "high": string,
    "lastPrice": string,
    "low": string,
    "priceChange": string,
    "priceChangePercent": string,
    "quoteVolume": string,
    "symbol": string,
    "trades": string,
    "volume": string
}
