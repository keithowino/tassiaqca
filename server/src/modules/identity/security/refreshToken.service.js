import crypto from "crypto";
import jwt from "jsonwebtoken";
import env from "../../../app/config/env.js";

class RefreshTokenService {
	generate(user) {
		return jwt.sign(
			{
				sub: user._id.toString(),
				jti: crypto.randomUUID(),
			},
			env.jwt.refreshSecret,
			{
				expiresIn: env.jwt.refreshExpires,
				issuer: env.jwt.issuer,
				audience: env.jwt.audience,
			},
		);
	}

	verify(token) {
		return jwt.verify(token, env.jwt.refreshSecret, {
			issuer: env.jwt.issuer,
			audience: env.jwt.audience,
		});
	}
}

export default new RefreshTokenService();
