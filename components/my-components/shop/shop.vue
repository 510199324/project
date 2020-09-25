<template>
	<view class="shop-slot">
		<view class="image">
			<image src="../../../static/imags/shopCartNot.png" class="margin"></image>
		</view>
		<view class="slot">
			<view class="text-title">
				<slot name="text-title"></slot>
			</view>
			<view class="text-two">
				<slot name="text-two"></slot>
			</view>
			<view class="button">
				<slot name="button"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style>
	.shop-slot{
		margin:20rpx;
		border-radius:20rpx;
		overflow:hidden;
	}
	.image>image{
		width:260rpx;
		height:260rpx;
		display:block;
		margin-top:60rpx;
	}
	.button>button{
		width:40%;
		height:60rpx;
		margin:10rpx auto;
		line-height:60rpx;
		font-size:30rpx;
		margin-bottom:60rpx;
	}
	.button{
		margin-top:10rpx;
	}
	.text-title,
	.text-two{
		text-align:center;
		margin:10rpx 0rpx;
	}
	.text-title{
		color:#28D8B4;
		font-size:36rpx;
	}
	.text-two{
		color:#C9C9C9;
		font-size:36rpx;
	}
</style>
