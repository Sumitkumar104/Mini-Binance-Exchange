import { Router } from "express";

export const tradesRouter = Router();




// get all trades from the DB for the given market. Till now we not store the trade inforamtion in the DB.
tradesRouter.get("/", async (req, res) => {
    const { market } = req.query;
    // get from DB
    res.json({});
})