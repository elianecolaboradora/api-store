import jwt from "jsonwebtoken";
import { envpath } from "./env.utils.js";

process.loadEnvFile(envpath)

const createToken = (data) => {
	const token = jwt.sign(data, process.env.JWT_KEY, {
		expiresIn: 60 * 60 * 24 * 7,
	});
	return token;
};
const decodeToken = (token) => {
    const decodeData = jwt.verify(token, process.env.JWT_KEY)
    return decodeData
}
const verifyToken = (token) => {
    try {
        const decodeData = jwt.verify(token, process.env.JWT_KEY);
        return decodeData;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
};
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["currentUser"];
    }
    return token;
}

export { createToken, decodeToken, verifyToken, cookieExtractor }
