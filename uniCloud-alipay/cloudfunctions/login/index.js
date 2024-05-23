"use strict";
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		code
	} = event;
	const res = await uniCloud.request({
		url: "https://api.weixin.qq.com/sns/jscode2session",
		data: {
			appid: "wx8736e445fc5be3ee",
			secret: "f932281095561b49baf82aded2bb1de3",
			js_code: code,
			grant_type: "authorization_code",
		},
	});
	console.log(res)
	const {
		openid
	} = res.data;
	const db = uniCloud.database();
	let {
		data
	} = await db
		.collection("user")
		.where({
			_openid: openid,
		})
		.get();
	console.log(data);
	const defaultUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	if (data.length === 0) {
		const newuser = await db.collection("user").add({
			_openid: openid,
			nickName: "微信用户",
			avatarUrl: defaultUrl,
			type: 0,
			stuInfo: {
				name: "",
				id: "",
				class: "",
			},
		});

	}
	return {
		avatarUrl: data[0] ? data[0]?.avatarUrl : defaultUrl,
		nickName: data[0] ? data[0]?.nickName : "微信用户",
		_openid: openid,
		unionId: "",
		type: data[0]?.type,
		stuInfo: data[0]?.stuInfo,
	};
};