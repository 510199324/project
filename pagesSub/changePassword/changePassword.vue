<template>
	<view class="register">
		<view class="logo">
			<image src="../../static/imags/logo2.jpg" class="logoImg margin"></image>
		</view>
		<view class="mailbox">
			<view class="user">
				<input type="text" class="margin maliboxInput" placeholder="请输入你的新密码" @input="userNameHandel($event)" v-model="userName"/>
				<text class="error margin" v-if="userNameFlag">长度为8-16位字母+特殊符号</text>
				<input type="text" class="margin maliboxInput" placeholder="请输入旧密码" style="margin-top:20rpx;" v-model="password"/>
				<text class="error margin" v-if="passFlag">旧密码不正确</text>
			</view>
		</view>
		<view class="send">
			<button class="sendEali" @tap="registerHandel">确认</button>
		</view>
		<view class="login">
			<text class="sendLogin margin">返回</text>
		</view>
	</view>
</template>

<script>
	import { modifyPass } from '../../api/users/user.js';
	import { getCode } from '@/utlis/getToken.js';
	export default {
		data() {
			return {
				token: '' , // 用户token
				userNameFlag: false, // 用户名不正确的显示和隐藏
				passFlag: false, // 密码不正确的显示和隐藏
				passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,  // 密码的正则
				userName: '', // 用户名的双向绑定
				password: '', // 密码的双向绑定
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
			// 与userName绑定的函数
			userNameHandel(e) {
				if (!(this.passReg.test(e.target.value))) {
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
			// 点击登录
			registerHandel() {
				if (this.flag) {
					this.flag = false;
					modifyPass({
						password: this.userName,
						newpass: this.password
					}, this.token).then(res => {
						if (res[1].data.code == 204) {
							uni.removeStorage({
								key: 'token',
								success(res) {
									uni.redirectTo({
										url: '../login/login'
									})
								}
							})
							uni.removeStorage({
								key: 'userInfo'
							})
							
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
		display:block;
		width:75%;
	}
</style>
