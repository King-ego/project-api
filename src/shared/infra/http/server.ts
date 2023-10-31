import "reflect-metadata";
import express, {Request, Response, NextFunction} from 'express';
import cors from "cors";

import "express-async-errors"
import {errors} from "celebrate"

import DataSource from "../typeorm/config";
import routes from "./routes";
import "../../container"
import AppError from "../../erros/AppError";

const app = express();
DataSource.initialize()
    .then(() => {
        console.log("Type ORM initialized");

        app.use(cors({
            origin: "*"
        }));
        app.use(express.json());

        app.use("/api/", routes);

        app.use(errors())

        /* app.use((req, res, next) => {
             res.setHeader('ngrok-skip-browser-warning', 'true');
             res.setHeader("Access-Control-Allow-Origin", '*');
             next();
         });*/

        app.use((err: Error, _: Request, resp: Response, __: NextFunction) => {
            if(err instanceof AppError) {
                return resp.status(err.statusCode).json({
                    status: "error",
                    message: err.message
                })
            }

            console.error(err);

            return resp.status(500).json({
                status: "error",
                message: "Internal server error",
            });
        })


        app.listen(3001, () => {
            console.log("Server started on port 3333!");
        });
    })
    .catch(error => console.log(error));
