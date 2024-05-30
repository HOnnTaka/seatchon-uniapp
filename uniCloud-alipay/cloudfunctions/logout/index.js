'use strict';
const uniID = require('uni-id-common')
exports.main = async (event, context) => {

	context.APPID = context.APPID // 替换为当前客户端的APPID，通过客户端callFunction请求的场景可以使用context.APPID获取
	context.PLATFORM = context.PLATFORM // 替换为当前客户端的平台类型，通过客户端callFunction请求的场景可以使用context.PLATFORM获取
	context.LOCALE = 'zh-Hans'
	const uniIDIns = uniID.createInstance({ // 创建uni-id实例
		context: context,
		// config: {} // 完整uni-id配置信息，使用config.json进行配置时无需传此参数
	})
	//event为客户端上传的参数
	console.log('event : ', event)
	const payload = await uniIDIns.checkToken(event.uniIdToken) // 后续使用uniIDIns调用相关接口
	if (payload.code) {
		return payload
	}
};