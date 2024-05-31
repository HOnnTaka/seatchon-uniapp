"use strict";
const jwt = require("jsonwebtoken");
const SECRET_KEY = "seatchonadmin";

function verifyToken(token) {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (err) {
		console.error("Token verification failed:", err);
		return null;
	}
}
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const token = event.token;
	const decoded = verifyToken(token);
	if (decoded) {
		// JWT有效，可以访问受保护的资源
		return {
			message: "Access granted",
			userId: decoded.userId
		};
	} else {
		// JWT无效或已过期
		return {
			error: "Unauthorized"
		};
	}
	//返回数据给客户端
	return event;
};