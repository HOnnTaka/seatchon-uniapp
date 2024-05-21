<script>
export default {
	onLaunch: async () => {
		await login();
	},
	onShow() {},
	onHide() {},
	globalData: {}
};
const login = async () => {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	const { code } = await uni.login({
		timeout: 6000
	});

	const { result } = await uniCloud.callFunction({
		name: 'login',
		data: { code }
	});

	console.log(result);
	getApp().globalData.userinfo = result;
	uni.hideLoading();
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
// 设置整个项目的背景色
page {
	background-image: linear-gradient(90deg, #47c5ff20, #ff8fde20);
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>
