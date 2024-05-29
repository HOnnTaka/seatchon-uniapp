"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 10;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		id,
		pwd,
		newpwd,
		adminpwd,
		code
	} = event;
	console.log(id, pwd, adminpwd);

	const db = uniCloud.database();

	if (adminpwd) {
		if (adminpwd == "seatchonadmin") {
			const res = await uniCloud.request({
				url: "https://api.weixin.qq.com/sns/jscode2session",
				data: {
					appid: "wx8736e445fc5be3ee",
					secret: "f932281095561b49baf82aded2bb1de3",
					js_code: code,
					grant_type: "authorization_code",
				},
			});
			console.log(res);
			const {
				openid
			} = res.data;
			let {
				data
			} = await db
				.collection("user")
				.where({
					_openid: openid,
				})
				.get();
			console.log(data);
			let _id = data[0]?._id;
			if (data.length === 0) {
				const salt = await bcrypt.genSalt(saltRounds);
				const hash = await bcrypt.hash("seatchonadmin", salt);
				const {
					id
				} = await db.collection("user").add({
					_openid: openid,
					nickName: "微信管理员" + openid,
					avatarUrl: "",
					type: 1,
					pwd: hash,
				});
				_id = id;
				await db
					.collection("user")
					.doc(id)
					.update({
						avatarUrl: `https://api.multiavatar.com/${id}.png`,
					});
			}
			return {
				code: 0,
				message: "登录成功",
				userinfo: {
					_id: _id,
					avatarUrl: data[0] ? data[0]?.avatarUrl : `https://api.multiavatar.com/${_id}.png`,
					nickName: data[0] ? data[0]?.nickName : "微信管理员" + openid,
					_openid: openid,
					type: data[0] ? data[0]?.type : 1,
				},
			};
		} else {
			return {
				message: "管理密码错误",
				code: 1,
			};
		}
	}

	const collection = db.collection("user");
	const {
		data
	} = await collection.doc(id).get();
	if (data.length == 0)
		return {
			message: "用户不存在",
			code: 1,
		};
	let user = data[0];

	const bcres = await bcrypt.compare(pwd, user.pwd);

	if (bcres) {
		delete user.pwd;
		if (newpwd) {
			const salt = await bcrypt.genSalt(saltRounds);
			const hash = await bcrypt.hash(newpwd, salt);
			const updateres = await db.collection("user").doc(id).update({
				pwd: hash,
			});
			if (updateres.updated == 1)
				return {
					message: "密码修改成功",
					code: 3,
				};
			else
				return {
					message: "密码修改失败",
					code: 1,
				};
		}
		return {
			message: pwd == "123456" ? "登录成功,请修改密码" : "登录成功",
			userinfo: user,
			code: pwd == "123456" ? 2 : 0,
		};
	}
	return {
		message: newpwd ? "旧密码错误" : "账户或密码错误",
		code: 1,
	};
};