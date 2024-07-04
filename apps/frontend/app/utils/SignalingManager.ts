import { Ticker } from "./types";

export const WS_URL = process.env.NEXT_PUBLIC_WS_URL||"wss://ws.backpack.exchange/";


// this class is responsible for handling the websocket connection by singleton pattern
export class SignalingManager {

    private ws: WebSocket;                     // create an instance of WebSocket
    private static instance: SignalingManager;  // static means it can not be further modified
    private bufferedMessages: any[] = [];       // if connection is not established, store the messages in this array
    private callbacks: any = {};
    private id: number;
    private initialized: boolean = false;


    // we declare contructor as private so that we can't create an instance of this class (singeleton pattern)
    private constructor() {
        this.ws = new WebSocket(WS_URL);
        this.bufferedMessages = [];
        this.id = 1;
        this.init();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new SignalingManager();
        }
        return this.instance;
    }

    init() {

        // when connection is established, first send the buffered messages
        this.ws.onopen = () => {
            this.initialized = true;
            this.bufferedMessages.forEach(message => {
                this.ws.send(JSON.stringify(message));
            });
            this.bufferedMessages = [];
        }

        //recieve message from the server
        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const type = message.data.e;

            if (this.callbacks[type]) {
                this.callbacks[type].forEach(({ callback }: { callback: any }) => {
                    if (type === "ticker") {
                        const newTicker: Partial<Ticker> = {
                            lastPrice: message.data.c,
                            high: message.data.h,
                            low: message.data.l,
                            volume: message.data.v,
                            quoteVolume: message.data.V,
                            symbol: message.data.s,
                        }
                        callback(newTicker);
                   }

                   if (type === "depth") {
                        const updatedBids = message.data.b;
                        const updatedAsks = message.data.a;
                        callback({ bids: updatedBids, asks: updatedAsks });
                    }
                });
            }
        }
    }


    // send message to the server
    sendMessage(message: any) {
        const messageToSend = {
            ...message,
            id: this.id++
        }
        if (!this.initialized) {
            this.bufferedMessages.push(messageToSend);
            return;
        }
        this.ws.send(JSON.stringify(messageToSend));
    }


    // register a callback for a specific type of message
    async registerCallback(type: string, callback: any, id: string) {
        this.callbacks[type] = this.callbacks[type] || [];
        this.callbacks[type].push({ callback, id });
    }

    // de-register a callback for a specific type of message
    async deRegisterCallback(type: string, id: string) {
        if (this.callbacks[type]) {
            const index = this.callbacks[type].findIndex((callback: { callback: any; id: string }) => callback.id === id);
            if (index !== -1) {
                this.callbacks[type].splice(index, 1);
            }
        }
    }
}