import express from "express";
import cookieParser from "cookie-parser";
import cors from "./config/cors.js";
import routes from "./routes/api.js";
import {
	requestMetadata,
	errorHandler,
	notFound,
	uploadErrorHandler,
} from "../shared/index.js";

const app = express();

// rm
app.use((req, res, next) => {
	console.log("[APP] Incoming request:", req.method, req.originalUrl);

	next();
});

/**
 * #### Express Setup
 * - Middleware order must be as follows
 * - Any other order leads to subtle bugs
 * #### The Thought is:
 * - (cors)Cross-origin validation
 * - (JSON Parser)Parse request body
 * - (Cookie Parser)Parse refresh/access cookies
 * - (Request Metadata)Build request context - (IP, User-Agent, etc.)
 * - (Routes)Controllers, Services, Audit Logging,..
 * - 404 Handler
 * - Global Error Handler
 */

app.use(cors);

app.use(express.json());

app.use(cookieParser());

app.use(requestMetadata);

app.use("/api/v1", routes);

app.use(notFound);

app.use(uploadErrorHandler);

app.use(errorHandler);

export default app;
