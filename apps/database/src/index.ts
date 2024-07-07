// this timedb database take data from the redis queue and store it slowly slowly in dataBase.
// so that the dataBase is not overloaded with data.
// redis is in memory database so its throught put is very high i.e it can store data very fast.
// but the dataBase is on disk so it is slow.


// this time Scale DB store the data of candles of stock market.

import { Client } from "pg";
import { createClient} from "redis";


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


redisClient.on("connect",()=>{
    console.log("connected to redis");
})

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

console.log("connect to redis");

async function main(){
     while(true)
     {
        const response=await redisClient.rPop("db_processor"as string);
        if(!response){

        }
        else
        {
            
        }
     }
}

main().catch((err)=>{
    console.log("error in dataBase fnc -",err);
});