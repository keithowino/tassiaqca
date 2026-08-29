import app from "./app.js";
import env from "./config/env.js";
import { bootstrapPlatformRegistries } from "../shared/index.js";
import { connectDatabase } from "./bootstrap/database.js";
/**
 * recommended for use only during development.
 * import dns from "dns";
 * dns.setServers(["8.8.8.8", "1.1.1.1"]);
 */

async function start() {
	/**
	 * Validate all platform registries.
	 */
	bootstrapPlatformRegistries();

	await connectDatabase();

	app.listen(env.port, () => {
		console.log(`🚀 Server listening on port ${env.port}`);
	});
}

start().catch((error) => {
	console.error("❌ MongoDB connection error: ", error);
	process.exit(1);
});
