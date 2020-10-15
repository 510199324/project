<template>
	<view class="register">
		<view class="logo">
			<image src="../../static/imags/logo2.jpg" class="logoImg margin"></image>
		</view>
		<view class="mailbox">
			<view class="user">
				<input type="text" class="margin maliboxInput" placeholder="请设置用户名" @input="userNameHandel($event)" v-model="userName"/>
				<text class="error margin" v-if="userNameFlag">长度为6-20个子母,数字,和下划线和减号,必须以字母开头</text>
				<input type="text" class="margin maliboxInput" placeholder="请设置密码" style="margin-top:20rpx;" @input="passHandel($event)" v-model="password"/>
				<text class="error margin" v-if="passFlag">长度为8-16位字母+特殊符号</text>
			</view>
			<view class="email">
				<input type="text" class="maliboxInput margin emailInput" placeholder="请输入邮箱" @input="emailHandel($event)" v-model="email">
				<text class="error margin" v-if="emailFlag">邮箱格式不正确</text>
			</view>
			<view class="code margin flex-between">
				<input type="text" v-model="code" class="maliboxInput codeInput" placeholder="请输入验证码">
				<view class="getCode" v-show="codeFlag" @tap="getCode">获取验证码</view>
				<view class="Countdown" v-show="!codeFlag">{{count}}s后重试</view>
			</view>
		</view>
		<view class="send">
			<button class="sendEali" @tap="registerHandel">注册</button>
		</view>
		<view class="login">
			<navigator url="../login/login" class="sendLogin margin" hover-class="none">返回登录</navigator>
		</view>
		<view class="other">
		<!-- 	<text class="otherLogin flex-center">其他方式登录 / 注册</text>
			<view class="WeChat">
				<image src="../../static/icon/login-wx.png" class="weChatLogo"></image>
			</view> -->
			<view class="UserAgreement">
				<view>
					<text>登录代表同意</text>
					<text class="protocol" @tap="protocol()">用户协议</text>
					<text class="privacy" @tap="privacy()">隐私协议</text>
					<text>并授权使用您的账号信息（如昵称、头像、地址）以便您统一管理</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { register, sendEmail } from '../../api/users/user.js';
	export default {
		data() {
			return {
				count: 60, // 倒计时的秒数
				codeFlag: true,  // 倒计时的显示和隐藏
				userNameFlag: false, // 用户名不正确的显示和隐藏
				passFlag: false, // 密码不正确的显示和隐藏
				emailFlag: false, // 邮箱不正确的显示和隐藏
				emailReg: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,  // 邮箱验证的正则
				userReg: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, // 用户名的正则
				passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,  // 密码的正则
				userName: '', // 用户名的双向绑定
				password: '', // 密码的双向绑定
				email: '', // 邮箱的双向绑定
				code: '', // 验证码的双向绑定
				flag: true // 注册按钮的防抖
			}
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
			// 与userName绑定的函数
			userNameHandel(e) {
				if (!(this.userReg.test(e.target.value))) {
					this.userNameFlag = true;
				} else {
					this.userNameFlag = false;
				}
			},
			// 与密码绑定的函数
			passHandel(e) {
				if (!(this.passReg.test(e.target.value))) {
					this.passFlag = true;
				} else {
					this.passFlag = false;
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
				if ((this.userReg.test(this.userName)) && (this.passReg.test(this.password)) && (this.emailReg.test(this.email))) {
					let timer = null;
					this.codeFlag = false;
					sendEmail({
						email: this.email,
						type: 'register'
					})
					timer = setInterval(()=>{
						this.count --;
						if (this.count == 0) {
							this.codeFlag = true;
							clearInterval(timer);
							this.count = 60;
						}
					},1000);
				} else {
					this.Toast('用户名密码和邮箱是否正确','none')
				}
			},
			// 点击登录
			registerHandel() {
				if (this.flag) {
					this.flag = false;
					register({
						username: this.userName,
						password: this.password,
						email: this.email,
						code: this.code
					}).then((res)=>{
						let resData = res[1];
						let { data } = resData;
						if (data.code == 204) {
							this.Toast('注册成功','success');
							setTimeout(()=>{
								uni.redirectTo({
									url: '../login/login'
								})
							},2000);
						} else if (data.code == 505) {
							this.Toast('邮箱验证码错误','none');
						} else if (data.code == 591) {
							this.Toast('邮箱验证码过期','none');
						} else if (data.code == 517) {
							this.Toast('用户名已存在','none');
						} else if (data.code == 527) {
							this.Toast('邮箱已被注册','none');
						} else if (data.code == 301) {
							this.Toast('请检查用户名和密码是否完整','none')
						} else if (data.code == 302) {
							this.Toast('请检查用户名和密码是否正确','none')
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
		width:75%;
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
	.login{
		font-size:28rpx;
	}
	.mailbox>view{
		margin-top:20rpx;
		margin-bottom:20rpx;
	}
	.sendLogin{
		width:75%;
		text-align:left;
	}
	.other{
		position:fixed;
		bottom:40rpx;
	}
	.otherLogin{
		color:#999;
		font-size:28rpx;
		margin:20rpx 0rpx;
	}
	.weChatLogo{
		width:100rpx;
		height:100rpx;
		display:block;
		margin:0 auto;
	}
	.UserAgreement{
		margin:20rpx;
		font-size:28rpx;
		color:#999;
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
