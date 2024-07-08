
import { Router } from "express";

export const tickersRouter = Router();


// this is very mathematically complex and time-consuming operation. So, we will not implement it in this project.
tickersRouter.get("/", async (req, res) => {    
    res.json({});
});