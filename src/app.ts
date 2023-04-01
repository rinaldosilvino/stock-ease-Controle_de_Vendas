import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { appRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());
const cors = require("cors");

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	app.use(cors());
	next();
});

appRoutes(app);

app.use(errorMiddleware);
export default app;
