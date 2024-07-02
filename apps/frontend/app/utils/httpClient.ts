// here we are making the http requests to the backend to get the data of the markets, tickers, depth, trades, klines etc
// and use everwhere in the frontend to show the data of the markets, tickers, depth, trades, klines etc

import axios from "axios";
import { Depth, KLine, Ticker, Trade } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function getTicker(market: string): Promise<Ticker> {     // get the ticker of the market from the backend
    
    const tickers = await getTickers();
    const ticker = tickers.find(t => t.symbol === market);
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    return ticker;
}

export async function getTickers(): Promise<Ticker[]> {    // get all the tickers from the backend
    
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // return 1;
    const response = await axios.get(`${BASE_URL}/tickers`);
    return response.data;
}   


export async function getDepth(market: string): Promise<Depth> {   // get the depth of the market from the backend
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    return response.data;
}
export async function getTrades(market: string): Promise<Trade[]> {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
    return response.data;
}


// get the  data for trade view chart from the backend
export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}

export async function getMarkets(): Promise<string[]> {
    const response = await axios.get(`${BASE_URL}/markets`);
    return response.data;
}