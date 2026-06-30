import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase } from "./bootstrap/database.js";

async function start() {
	await connectDatabase();

	app.listen(env.port, () => {
		console.log(`Server listening on port ${env.port}`);
	});
}

start().catch((error) => {
	console.error(error);
	process.exit(1);
});
