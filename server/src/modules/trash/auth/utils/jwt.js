import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
	return jwt.sign(
		{
			sub: user._id.toString(),
			email: user.email,
			tokenVersion: user.tokenVersion,
		},
		process.env.JWT_ACCESS_SECRET,
		{
			issuer: process.env.JWT_ISSUER,
			audience: process.env.JWT_AUDIENCE,
			expiresIn: process.env.JWT_ACCESS_EXPIRES,
		},
	);
}

export function generateRefreshToken(user) {
	return jwt.sign(
		{
			sub: user._id.toString(),
			tokenVersion: user.tokenVersion,
		},
		process.env.JWT_REFRESH_SECRET,
		{
			issuer: process.env.JWT_ISSUER,
			audience: process.env.JWT_AUDIENCE,
			expiresIn: process.env.JWT_REFRESH_EXPIRES,
		},
	);
}

export function verifyAccessToken(token) {
	return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
		issuer: process.env.JWT_ISSUER,
		audience: process.env.JWT_AUDIENCE,
	});
}

export function verifyRefreshToken(token) {
	return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
		issuer: process.env.JWT_ISSUER,
		audience: process.env.JWT_AUDIENCE,
	});
}
