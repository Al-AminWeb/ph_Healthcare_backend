import express from "express";
import type {Application} from "express";
import {prisma} from "../shared/prisma.js";
import {toNodeHandler} from "better-auth/node";
import {auth} from "../lib/auth.js";

const app: Application = express();

app.all('/api/v1/auth/{*any}', toNodeHandler(auth));

app.get("/", async (req, res) => {
    res.send("Hello World!");
})

export default app;