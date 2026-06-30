import jwt from "jsonwebtoken";
import env from "../../../app/config/env.js";

class AccessTokenService {
	generate(user) {
		return jwt.sign(
			{
				sub: user._id.toString(),
				email: user.email,
			},
			env.jwt.accessSecret,
			{
				expiresIn: env.jwt.accessExpires,
				issuer: env.jwt.issuer,
				audience: env.jwt.audience,
			},
		);
	}

	verify(token) {
		return jwt.verify(token, env.jwt.accessSecret, {
			issuer: env.jwt.issuer,
			audience: env.jwt.audience,
		});
	}
}

export default new AccessTokenService();
