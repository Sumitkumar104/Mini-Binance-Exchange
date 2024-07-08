
import { Router } from "express";
import { RedisManager } from "../redisManager";
import { GET_DEPTH } from "../types";

export const depthRouter = Router();


// get the depth of the given market means all asks and bids.
depthRouter.get("/", async (req, res) => {
    const { symbol } = req.query;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_DEPTH,
        data: {
            market: symbol as string
        }
    });

    res.json(response.payload);
});