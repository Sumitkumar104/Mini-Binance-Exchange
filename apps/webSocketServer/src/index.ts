import { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";

const wss = new WebSocketServer({ port: 9000 });

console.log("Web Socket Server started on port 9000");

wss.on("connection", (ws) => {
    UserManager.getInstance().addUser(ws);
    console.log(ws);
});