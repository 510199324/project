<template>
	<view class="register">
		<view class="logo">
			<image src="../../static/imags/logo2.jpg" class="logoImg margin"></image>
		</view>
		<view class="mailbox">
			<view class="email">
				<input type="text" class="maliboxInput margin emailInput" placeholder="请输入旧邮箱" @input="emailHandel($event)" v-model="email">
				<text class="error margin" v-if="emailFlag">邮箱格式不正确</text>
				<input type="text" class="maliboxInput margin emailInput" placeholder="请输入新邮箱" @input="newEmailHandel($event)" v-model="newEmail">
				<text class="error margin" v-if="newEmailFlag">邮箱格式不正确</text>
			</view>
			<view class="code margin flex-between">
				<input type="text" v-model="code" class="maliboxInput codeInput" placeholder="请输入验证码">
				<view class="getCode" v-show="codeFlag" @tap="getCode">获取验证码</view>
				<view class="Countdown" v-show="!codeFlag">{{count}}s后重试</view>
			</view>
		</view>
		<view class="send">
			<button class="sendEali" @tap="registerHandel">确定</button>
		</view>
	</view>
</template>

<script>
	import { modifyEmail, sendEmail } from '../../api/users/user.js';
	import { getCode } from '@/utlis/getToken.js';
	export default {
		data() {
			return {
				token: '', // 用户token
				newEmail: '', // 新邮箱的v-model
				newEmailFlag: false, // 邮箱不正确的显示和隐藏
				count: 60, // 倒计时的秒数
				codeFlag: true,  // 倒计时的显示和隐藏
				emailFlag: false, // 邮箱不正确的显示和隐藏
				emailReg: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,  // 邮箱验证的正则
				email: '', // 邮箱的双向绑定
				code: '', // 验证码的双向绑定
				flag: true // 注册按钮的防抖
			}
		},
		onShow() {
			getCode().then(res => {
				this.token = res.token;
			})
		},
		methods: {
			// 用户协议
			protocol() {
				uni.redirectTo({
					url: '../protocol/protocol'
				})
			},
			// 用户隐私
			privacy() {
				uni.redirectTo({
					url: '../privacy/privacy'
				})
			},
			// 新邮箱
			newEmailHandel(e) {
				if (!(this.emailReg.test(e.target.value))) {
					this.newEmailFlag = true;
				} else {
					this.newEmailFlag = false;
				}
			},
			// 与邮箱绑定的函数
			emailHandel(e) {
				if (!(this.emailReg.test(e.target.value))) {
					this.emailFlag = true;
				} else {
					this.emailFlag = false;
				}
			},
			// 获取验证码
			getCode() {
				if ((this.emailReg.test(this.newEmail)) && (this.emailReg.test(this.email))) {
					let timer = null;
					this.codeFlag = false;
					sendEmail({
						email: this.email,
						type: 'upemail'
					})
					timer = setInterval(()=>{
						this.count --;
						if (this.count == 0) {
							this.codeFlag = true;
							clearInterval(timer);
							this.count = 60;
						}
					},1000);
				}
			},
			// 点击登录
			registerHandel() {
				if (this.flag) {
					this.flag = false;
					modifyEmail({
						newemail: this.newEmail,
						code: this.code,
						type: 'upemail',
						email: this.email
					}, this.token).then((res)=>{
						let resData = res[1];
						let { data } = resData;
						if (data.code == 204) {
							this.Toast('修改成功','success');
							setTimeout(()=>{
								uni.switchTab({
									url: '../../pages/home/home'
								})
							},2000);
						} else if (data.code == 505) {
							this.Toast('邮箱验证码错误','none');
						} else if (data.code == 591) {
							this.Toast('邮箱验证码过期','none');
						} else if (data.code == 592) {
							this.Toast('旧邮箱错误','none');
						}
					})
					setTimeout(()=>{
						this.flag = true;
					},5000);
				}
			},
			// 对弹窗进行封装
			Toast(title, icon) {
				uni.showToast({
					title: title,
					icon: icon
				})
				setTimeout(()=>{
					uni.hideToast()
				},2000)
			}
		}
	}
</script>

<style>
	.protocol{
		margin-right:10rpx;
	}
	.logoImg{
		height:100rpx;
		margin:30rpx auto;
		display:block;
		width:70%;
	}
	.maliboxInput{
		width:75%;
		height:100rpx;
		border:none;
		font-size:32rpx;
		border-bottom:1px solid #EBEEF7;
	}
	.error{
		color:#f00;
		font-size:28rpx;
		width:75%;
		margin-top:20rpx;
		display:block;
	}
	.send{
		width:100%;
	}
	.sendEali{
		width:75%;
		height:80rpx;
		text-align:center;
		border-radius:10rpx;
		color:#999;
		background:#A6DBFB;
		margin:20rpx auto;
	}
	.mailbox>view{
		margin-top:20rpx;
		margin-bottom:20rpx;
	}
	.code{
		width:75%;
	}
	.codeInput{
		width:40%;
	}
	.getCode,
	.Countdown{
		height:100rpx;
		width:40%;
		font-size:28rpx;
		text-align:center;
		line-height:100rpx;
		border:1px solid #EBEEF7;
		border-radius:20rpx;
	}
</style>