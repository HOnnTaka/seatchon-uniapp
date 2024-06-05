'use strict';
const XLSX = require("xlsx");
exports.main = async (event, context) => {
	try {
		const db = uniCloud.database();
		const res = await db.collection("seat-chart").doc(event.chartId).get();
		const chart = res.data[0]
		const seats = chart.seats
		const wb = XLSX.utils.book_new();
		const wsChartDetail = XLSX.utils.aoa_to_sheet([
			["课室", chart.title],
			["备注", chart.note],
			["可选时间", chart.selectableTimeRange.join(" 至 ")],
			["生效时间", chart.effectiveTimeRange.join(" 至 ")],
		]);
		wsChartDetail["!cols"] = [{
			wch: 20
		}, {
			wch: 50
		}];
		XLSX.utils.book_append_sheet(wb, wsChartDetail, "课室信息", {
			cellStyles: true
		});

		const getSeatsByName = params => {
			const data = [];
			for (let R = 0; R < chart.row; R++) {
				const row = [];
				for (let C = 0; C < chart.col; C++) {
					const seat = seats[R * chart.col + C]
					const info = seat.stuInfo;
					row.push(info ? info['name'] : seat.status == 2 ? "禁用" : "空");
				}
				data.push(row);
			}
			return data;
		};

		const wsSeatsByName = XLSX.utils.aoa_to_sheet(getSeatsByName());
		wsSeatsByName["!cols"] = [...Array(chart.col).keys()].map(i => ({
			wpx: 60
		}));

		const getSeatsInfos = () => {
			const data = [
				["座位", "状态", "姓名", "学号", "班级", "选座时间"],
			]
			for (let R = 0; R < chart.row; R++) {
				for (let C = 0; C < chart.col; C++) {
					const seat = seats[R * chart.col + C];
					data.push([
						`${R + 1}行${C + 1}列`,
						seat.status == 3 ? "已选" : seat.status == 2 ? "禁用" : "空",
						seat.stuInfo ? seat.stuInfo.name : "",
						seat.stuInfo ? seat.stuInfo.id : "",
						seat.stuInfo ? seat.stuInfo.class : "",
						seat.stuInfo ? new Date(seat.selectTime).toLocaleString() : "",
					]);
				}
			}
			return data;
		}
		const wsSeatsByInfo = XLSX.utils.aoa_to_sheet(getSeatsInfos());

		XLSX.utils.book_append_sheet(wb, wsSeatsByName, "座位表（姓名）", {
			cellStyles: true
		});
		XLSX.utils.book_append_sheet(wb, wsSeatsByInfo, "座位表信息", {
			cellStyles: true
		});

		const excelBuffer = XLSX.write(wb, {
			bookType: 'xlsx',
			type: 'buffer'
		})
		const fileID = await uniCloud.uploadFile({
			cloudPath: `excel/${chart._id}.xlsx`,
			fileContent: excelBuffer
		})
		return {
			fileID: fileID.fileID
		}
	} catch (e) {
		return {
			error: e.message
		}
	}
};