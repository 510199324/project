<template>
	<view class="login">
		<view class="logo">
			<image src="../../static/imags/logo2.jpg" class="logoImg margin"></image>
		</view>
		<view class="mailbox">
			<input type="text" class="maliboxInput margin" placeholder="请输入用户名" v-model="userName">
			<input type="password" class="maliboxInput margin" placeholder="请输入密码" v-model="password">
		</view>
		<view class="send">
			<button class="sendEali" @tap.enter="login">登录</button>
		</view>
		<view class="register flex-between margin">
			<navigator url="../register/register" class="sendLogin" hover-class="none">立即注册</navigator>
			<navigator url="../forgetPassword/forgetPassword" class="sendLogin" hover-class="none">忘记密码</navigator>
		</view>
		<view class="other">
			<!-- <text class="otherLogin flex-center">其他方式登录 / 注册</text>
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
	import { login } from '../../api/users/user.js'
	export default {
		data() {
			return {
				emailFlag: false, // 邮箱不正确的显示和隐藏
				userName: '', // 用户名的双向绑定
				password: '', // 密码的双向绑定
				flag: true // 登录按钮的防抖
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
			// 登录函数
			login () {
				if (this.userName != '' && this.password != '') {
					if (this.flag) {
						this.flag = false;
						login({
							username: this.userName,
							password: this.password
						}).then((res)=>{
							let resData = res[1];
							let { data } = resData;
							if (data.code == 204) {
								this.Toast('登录成功');
								uni.setStorage({
									key: 'token',
									data: data.token
								})
								setTimeout(()=>{
									uni.switchTab({
										url: '../../pages/personil/personil'
									})
								},2000)
							} else if (data.code == 518) {
								this.Toast('用户名密码错误','none');
							} else if (data.code == 414) {
								this.Toast('服务器有问题请稍后重试','none')
							} else if (data.code == 517) {
								this.Toast('登录失败，暂无此用户','none');
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
				} else {
					this.Toast('检查用户名和密码是否完善','none');
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
		width:75%;
		margin:30rpx auto;
		display:block;
	}
	.maliboxInput{
		width:75%;
		height:100rpx;
		border:none;
		border-bottom:1px solid #EBEEF7;
	}
	.error{
		color:#f00;
		font-size:30rpx;
		width:75%;
		display:block;
		margin-top:20rpx;
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
		background:#98D1CA;
		margin:20rpx auto;
	}
	.register{
		font-size:28rpx;
		width:75%;
	}
	.sendLogin{
		text-align:left;
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
	.other{
		position:fixed;
		bottom:40rpx;
	}
</style>
