export default function getRequestMetadata(req) {
	return {
		ipAddress: req.ip,
		userAgent: req.get("User-Agent"),
		deviceName: null,
		browser: null,
		operatingSystem: null,
	};
}
