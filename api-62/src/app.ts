import express, { type Application } from "express";
import router from "./router/router";
import { ErrorHandler } from "./middleware/ErrorHandling";
import { type Request, type Response, type NextFunction } from "express";

//express application
const app: Application = express(); //server-side application

// security middlewares
// CORS (Cross-Origin Resource Site)
// a.com => b.com (destination -> CORS allow)

//built in middlewares
// parsers
// raw format
app.use(express.json({
    limit: "3mb"
}));  //json parsing

//x-www-form-urlencoded format
app.use(express.urlencoded({
    limit: "3mb",
}))

// loading the router
app.use(router);

//404
app.use((req: Request, res: Response, next: NextFunction) => {
    next({
        code : 404,
        message : "Route Not Found",
    });
})

// error handling middlewares
app.use(ErrorHandler);

export default app;
