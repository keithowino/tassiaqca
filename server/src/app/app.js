import express from "express";
import cookieParser from "cookie-parser";
import cors from "./config/cors.js";
import routes from "./routes/api.js";
import notFound from "../shared/errors/notFound.js";
import errorHandler from "../shared/errors/errorHandler.js";

const app = express();

app.use(cors);

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorHandler);

export default app;
