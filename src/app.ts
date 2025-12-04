import dotenv from 'dotenv'

dotenv.config();

import express, {Request, RequestHandler, Response} from "express";
import {AppRoutes} from "./routes";
import {PostgresDataSource} from "../app_data_source";
import {verifyFirebaseToken} from "./middlewares/auth";

const app = express();
app.use(express.json());

AppRoutes.forEach(route => {
    const middlewares: RequestHandler[] = [];

    if (route.auth) {
        middlewares.push(verifyFirebaseToken);
    }

    app[route.method](route.path, ...middlewares, (req: Request, res: Response, next: Function) => {
        route.action(req, res).then(() => next).catch(err => next(err));
    })
})

app.listen(3000, async () => {
    console.log("Server running on port 3000");

    await PostgresDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
})