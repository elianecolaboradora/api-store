import jwt from "jsonwebtoken";
// process.loadEnvFile(".env")
process.loadEnvFile(".envexample")

const createToken = (data) => {
	const token = jwt.sign(data, process.env.JWT_KEY, {
		expiresIn: 60 * 60 * 24 * 7,
	});
	return token;
};

const decodeToken = (headers) => {
	const authHeader = headers["authorization"];
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		const error = new Error("Token is required");
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(" ")[1];
	const decodeData = jwt.verify(token, process.env.JWT_KEY);
	return decodeData;
};

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["currentUser"];
    }
    return token;
};

export { createToken, decodeToken, cookieExtractor };
