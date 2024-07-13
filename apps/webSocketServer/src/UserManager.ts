// It handle all user connected with backend.

import { WebSocket } from "ws";
import { User } from "./User";
import { SubscriptionManager } from "./SubscriptionManager";


// Singleton class to manage all users connected with the backend
export class UserManager {
    private static instance: UserManager;
    private users: Map<string, User> = new Map();     // store all users connected with the backend

    private constructor() {
        
    }

    // make it singleton class
    public static getInstance() {
        if (!this.instance)  {
            this.instance = new UserManager();
        }
        return this.instance;
    }
    
    // add the user to the users map
    public addUser(ws: WebSocket) {
        const id = this.getRandomId();
        const user = new User(id, ws);
        this.users.set(id, user);
        this.registerOnClose(ws, id);
        return user;
    }
    
    // remove the user from the users map on WS close
    private registerOnClose(ws: WebSocket, id: string) {
        ws.on("close", () => {
            this.users.delete(id);
            SubscriptionManager.getInstance().userLeft(id);
        });
    }
    

    public getUser(id: string) {
        return this.users.get(id);
    }

    private getRandomId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}