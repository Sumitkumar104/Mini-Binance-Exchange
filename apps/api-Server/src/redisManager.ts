// this redis manager take the data from the redis as subscriber.
// In a publish/subscribe (pub/sub) architecture with Redis, subscribers listen to channels for messages published by publishers

import {RedisClientType,createClient } from "redis";
import { MessageToEngine } from "./types/to";
import { MessageFromOrderbook } from "./types";


export class RedisManager{
    private client: RedisClientType;
    private messageQueue: RedisClientType;
    private static instance: RedisManager;

    private constructor(){
        this.client = createClient();   //the Redis client will default to connecting to localhost on port 6379
        this.messageQueue = createClient();

        this.client.connect();
        this.messageQueue.connect();

        this.client.on("error", (err) => {
            console.log("Error in connect redis client-" + err);
        });
        this.messageQueue.on("error", (err) => {
            console.log("Error in connecting redis client as pub -" + err);
        })
    }


    // make it singleton class
    public static getInstance(): RedisManager{
        if(!this.instance){
            this.instance=new RedisManager();
        }
        return  this.instance;
    }

    public sendAndAwait(message:MessageToEngine):any{

        // first we will subscribe to the client and then we will send the message to the engine server queue.
        // we subscribe means any message comming from the engine server will be recieved by the client(engine server as publisher).
        return new Promise<MessageFromOrderbook>((resolve)=>{
           const clientId=this.getRandomClientId();
           this.client.subscribe(clientId,(message)=>{
                this.client.unsubscribe(clientId);
                resolve(JSON.parse(message));
           })
            // push the message to the engine server queue.
           this.messageQueue.lPush("messages",JSON.stringify({clientId:clientId,message}));
        })

    }


    // this Id is used to identify the client uniquely which is also used by redis client as subsciber id.
    public getRandomClientId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}