<template>
	<view class="register">
		<view class="logo">
			<image src="../../static/imags/logo2.jpg" class="logoImg margin"></image>
		</view>
		<view class="mailbox">
			<input type="text" class="maliboxInput margin" placeholder="请输入邮箱">
			<text class="error margin">邮箱格式不正确</text>
		</view>
		<view class="send">
			<button class="sendEali">发送邮件</button>
		</view>
		<view class="login">
			<navigator url="../login/login" class="sendLogin margin" hover-class="none">返回登录</navigator>
		</view>
		<view class="other">
			<text class="otherLogin flex-center">其他方式登录/注册</text>
			<view class="WeChat">
				<image src="../../static/icon/login-wx.png" class="weChatLogo"></image>
			</view>
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
	export default {
		methods: {
			protocol() {
				uni.navigateTo({
					url: '../protocol/protocol'
				})
			},
			privacy() {
				uni.navigateTo({
					url: '../privacy/privacy'
				})
			}
		}
	}
</script>

<style>
	.logoImg{
		height:100rpx;
		margin:30rpx auto;
		display:block;
	}
	.maliboxInput{
		width:75%;
		height:100rpx;
		color:#f8f8f8;
		border:none;
		border-bottom:1px solid #EBEEF7;
	}
	.error{
		color:#f00;
		font-size:30rpx;
		width:75%;
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
		font-size:20rpx;
	}
	.sendLogin{
		width:75%;
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
	}
</style>
