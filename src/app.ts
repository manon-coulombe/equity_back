import express from "express";
import {PostgresDataSource} from "../app_data_source";
import {AppRoutes} from "./routes";
import {Request, Response} from "express";

const app = express();
app.use(express.json());

AppRoutes.forEach(route => {
    app[route.method](route.path, (req: Request, res: Response, next: Function) => {
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