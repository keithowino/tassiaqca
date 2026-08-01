/**
 * #### The ipAddress value:
 * - When you deploy behind a reverse proxy (Vercel, Nginx, Render, Cloudflare, etc.), this captures the client's original IP rather than the proxy's address.
 * #### Session management improvements
 * - Later, i might integrate a user-agent parser (such as ua-parser-js) to populate these null value fields automatically.
 */
export default function requestMetadata(req, res, next) {
	req.requestMetadata = {
		ipAddress:
			req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip,
		userAgent: req.get("User-Agent"),
		deviceName: null,
		browser: null,
		operatingSystem: null,
	};

	next();
}
