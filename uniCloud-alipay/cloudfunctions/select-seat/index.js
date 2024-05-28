"use strict";
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		chartId,
		orderId,
		seatIndex,
		userinfo,
		isSelectSubmit,
		edit
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
					[`seats.${seatIndex - 1}.orderId`]: null,
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

	const alreadySelected = Array.from(data[0].seats).find(v => v.stuInfo?.id == (edit ? userinfo.id : userinfo
		._id));
	if (alreadySelected)
		return {
			message: edit ? "此id已选座" : "您已选过座位",
		};
	if (!edit && seatInfo.status != 1)
		return {
			message: "座位已被占用",
		};

	const selectTime = new Date()
	if (edit) {
		const userRes = await db.collection("user").doc(userinfo.id).get()
		if (userRes.data.length <= 0) return {
			message: "用户不存在,检查学号",
			code: 404
		}
		const user = userRes.data[0]
		console.log(userRes)
		if (orderId) {
			const orderResult = await db.collection("order").doc(orderId).update({
				orderTime: selectTime,
				userId: userinfo.id,
			})
			if (orderResult) {
				const res = await db
					.collection("seat-chart")
					.doc(chartId)
					.update({
						[`seats.${seatIndex - 1}.selectTime`]: selectTime,
						[`seats.${seatIndex - 1}.stuInfo`]: _.set({
							name: user.name,
							id: user._id,
							class: user.class,
							avatar: user.avatarUrl,
						}),
					});
				if (res.updated == 1) {
					return {
						message: "修改成功",
						code: 200,
					};
				}
			}
		} else {
			const orderResult = await db.collection("order").add({
				chartId: chartId,
				userId: user._id,
				x: seatInfo.x,
				y: seatInfo.y,
				orderTime: selectTime
			})
			const res = await db
				.collection("seat-chart")
				.doc(chartId)
				.update({
					[`seats.${seatIndex - 1}.status`]: 3,
					[`seats.${seatIndex - 1}.selectTime`]: selectTime,
					[`seats.${seatIndex - 1}.orderId`]: orderResult.id,
					[`seats.${seatIndex - 1}.stuInfo`]: _.set({
						name: user.name,
						id: user._id,
						class: user.class,
						avatar: user.avatarUrl,
					}),
				});
			if (res.updated == 1) {
				return {
					message: "选座成功",
					code: 200,
				};
			}
		}
	} else {
		const orderResult = await db.collection("order").add({
			chartId: chartId,
			userId: userinfo._id,
			x: seatInfo.x,
			y: seatInfo.y,
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
						name: userinfo.name,
						id: userinfo._id,
						class: userinfo.class,
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
	}
	return {
		message: "选座失败",
	};
};