import express, {type NextFunction, type Request, type Response} from "express";
import type {Application} from "express";
import {prisma} from "../shared/prisma.js";
import {toNodeHandler} from "better-auth/node";
import {auth} from "../lib/auth.js";

const app: Application = express();

app.all('/api/v1/auth/{*any}', toNodeHandler(auth));

app.get("/", async (req, res) => {
    res.send("Hello World!");
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500).json({message: err.message, error: 'Internal Server Error'});
})

app.use((req, res) => {
    res.status(404).json({message: 'Not Found'});
})

export default app;