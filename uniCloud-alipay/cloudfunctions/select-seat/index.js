"use strict";
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		chartId,
		orderId,
		seatIndex,
		userinfo,
		isSelectSubmit
	} = event;
	const db = uniCloud.database();
	const _ = db.command;
	const $ = db.command.aggregate;

	// 撤销
	if (!isSelectSubmit) {
		const orderResult = await db.collection("order").doc(orderId).remove()
		console.log(orderId, orderResult)
		if (orderResult.deleted > 0) {
			const res = await db
				.collection("seat-chart")
				.doc(chartId)
				.update({
					[`seats.${seatIndex - 1}.status`]: 1,
					[`seats.${seatIndex - 1}.selectTime`]: null,
					[`seats.${seatIndex - 1}.stuInfo`]: null
				});
			if (res.updated == 1) {
				console.log(orderResult)
				return {
					message: "撤销成功",
					code: 201,
				};
			}
		}
		return {
			message: "撤销失败",
		};
	}

	//查询座位信息
	const {
		data
	} = await db
		.collection("seat-chart")
		.aggregate()
		.match({
			_id: chartId,
		})
		.end();
	const chart = data[0];
	const seatInfo = data[0].seats[seatIndex - 1];
	const alreadySelected = Array.from(data[0].seats).find(v => v.stuInfo?.openid == userinfo._openid);
	if (alreadySelected)
		return {
			message: "您已选过座位",
		};
	if (seatInfo.status != 1)
		return {
			message: "座位已被占用",
		};

	// 更新座位状态为已占用，并添加用户信息到座位信息中
	const selectTime = new Date()
	const orderResult = await db.collection("order").add({
		chartId: chartId,
		openid: userinfo._openid,
		x: seatInfo.x,
		y: seatInfo.y,
		selectableTimeRange: data[0].selectableTimeRange,
		effectiveTimeRange: data[0].effectiveTimeRange,
		title: data[0].title,
		note: data[0].note,
		orderTime: selectTime
	})

	if (orderResult) {
		const res = await db
			.collection("seat-chart")
			.doc(chartId)
			.update({
				[`seats.${seatIndex - 1}.status`]: 3,
				[`seats.${seatIndex - 1}.selectTime`]: selectTime,
				[`seats.${seatIndex - 1}.orderId`]: orderResult.id,
				[`seats.${seatIndex - 1}.stuInfo`]: _.set({
					openid: userinfo._openid,
					name: userinfo.stuInfo.name,
					id: userinfo.stuInfo.id,
					class: userinfo.stuInfo.class,
					avatar: userinfo.avatarUrl,
				}),
			});
		if (res.updated == 1) {
			return {
				message: "选座成功",
				code: 200,
			};
		}
	}
	console.log(res);
	return {
		message: "选座失败",
	};
};