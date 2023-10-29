import "reflect-metadata";
import DataSource from "./config";

DataSource.initialize()
    .then(() => {
        console.log("Type ORM initialized");
    })
    .catch(error => console.log(error));