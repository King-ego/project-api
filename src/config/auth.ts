import * as process from "process";

export default {
    jwt: {
        secret: process.env.APPAPP_SECRET || "default",
        expiresIn: "1d",
    }
}