import { createClient } from "redis";
import { Engine } from "./trade/Engine";


async function main() {

    const engine = new Engine(); 
    const redisClient = createClient();
    await redisClient.connect();

    console.log("Connected to redis message queue in Trade engine server");
    
    redisClient.on("error", (err) => {
        console.log("Error to connect with redis message queue-" + err);
    });

    while (true) {

        // pop the message from the reids queue and process it in engine function.
        const response = await redisClient.rPop("messages" as string)
        if (!response) {

        }  else {
            engine.process(JSON.parse(response));
        }        
    }

}

main();