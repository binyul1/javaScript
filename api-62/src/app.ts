import express, { type Application } from "express";
import router from "./router/router";

//express application
const app: Application = express(); //server-side application

// loading the router
app.use(router);

export default app;
