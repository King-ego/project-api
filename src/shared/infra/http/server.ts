import "reflect-metadata";
import express from 'express';
import cors from "cors";
import DataSource from "../typeorm/config";
import routes from "./routes";
import "../../container"

const app = express();
DataSource.initialize()
    .then(() => {
        console.log("Type ORM initialized");

        app.use(cors({
            origin: "*"
        }));
        app.use(express.json());

        app.use("/api/", routes);

        /* app.use((req, res, next) => {
             res.setHeader('ngrok-skip-browser-warning', 'true');
             res.setHeader("Access-Control-Allow-Origin", '*');
             next();
         });*/


        app.listen(3001, () => {
            console.log("Server started on port 3333!");
        });
    })
    .catch(error => console.log(error));
