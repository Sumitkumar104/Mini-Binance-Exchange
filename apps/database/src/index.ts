// this timedb database take data from the redis queue and store it slowly slowly in dataBase.
// so that the dataBase is not overloaded with data.
// redis is in memory database so its throught put is very high i.e it can store data very fast.
// but the dataBase is on disk so it is slow.


// this time Scale DB store the data of candles of stock market.

import { Client } from "pg";
import { createClient} from "redis";
import { DbMessage } from "./types";


const pgClient=new Client({
    user:"your_user",
    host:"localhost",
    database:"my_database",
    password:"your_password",
    port:5432
})

const redisClient=createClient();

pgClient.connect().then(()=>{
    console.log("connected to timeScale database");
}).catch((err)=>{
    console.log("there is some  error to connect with timeScale DB-",err);
})

redisClient.connect();

redisClient.on("connect",()=>{
    console.log("connected to database server with redis");
})

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

async function main(){
     while(true)
     {
        // console.log("1");
        const response=await redisClient.rPop("db_processor"as string);
        if(!response){

        }
        else
        {
            // console.log("2");
            const data:DbMessage=JSON.parse(response);
            if(data.type==="TRADE_ADDED")
            {
                // console.log("3");
                const price=data.data.price;
                const timestamp=new Date(data.data.timestamp);
                const query='INSERT INTO tata_prices (time,price) VALUES ($1,$2)';

                const values=[timestamp,price];
                await pgClient.query(query,values);
                // console.log("4");
            }
        }
     }
}

main().catch((err)=>{
    console.log("error in dataBase fnc -",err);
});