import express, { type Application } from "express";
import router from "./router/router";
import { ErrorHandler } from "./middleware/ErrorHandling";
import { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet, { xXssProtection } from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import "./config/mongodb"; // Mongodatabase connection 
import "./config/sqldb" // Postgres database connection

//express application
const app: Application = express(); //server-side application

// security middlewares
// CORS (Cross-Origin Resource Site)
// a.com => b.com (destination -> CORS allow)
app.use(
  cors(
    //origin: "localhost:5137", // allow only this origin
  ),
);

// security
//helmet
app.use(
  helmet({
    xXssProtection: true, //scripting attack prevent
  }),
);

//express-rate-limit
const limiter = rateLimit({
  limit: 150,
  windowMs: 30000,
});
app.use(limiter);

//built in middlewares
// parsers
// raw format
app.use(
  express.json({
    limit: "3mb",
  }),
); //json parsing

//x-www-form-urlencoded format
app.use(
  express.urlencoded({
    limit: "3mb",
  }),
);

app.use('/assets',express.static(path.join(__dirname,"../public/")))

// loading the router
// app.use(cors(),router);// can write in this way also
app.use(router);

//404
app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    code: 404,
    message: "Route Not Found",
  });
});

// error handling middlewares
app.use(ErrorHandler);

export default app;
