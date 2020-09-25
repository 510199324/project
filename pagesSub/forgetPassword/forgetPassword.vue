<template>
	<view class="login">
		<view class="logo">
			<image src="../../static/imags/logo2.jpg" class="logoImg margin"></image>
		</view>
		<view class="mailbox">
			
			<text class="error margin">邮箱格式不正确</text>
			<view class="">
				<input type="text" class="maliboxInput margin" placeholder="请输入邮箱">
				<view class="getCheckCode">
					获取验证码
				</view>
			</view>
		</view>
		<view class="send">
			<button class="sendEali">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			
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
		background:#98D1CA;
		margin:20rpx auto;
	}
	.login{
		font-size:20rpx;
	}
	.sendLogin{
		width:75%;
		text-align:left;
	}
</style>
