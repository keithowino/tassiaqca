import dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

export default {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	mongoUri: process.env.MONGODB_URI,
	clientUrl: process.env.CLIENT_URL,
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET,
		refreshSecret: process.env.JWT_REFRESH_SECRET,
		accessExpires: process.env.JWT_ACCESS_EXPIRES,
		refreshExpires: process.env.JWT_REFRESH_EXPIRES,
		issuer: process.env.JWT_ISSUER,
		audience: process.env.JWT_AUDIENCE,
	},
};
