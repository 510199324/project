<template>
	<view class="classifyList flex">
		<navigator :url="src + item" hover-class="none" class="classificationList" v-for="(item, index) in classifyTitle" :key="index">
			<image :src="classifyImgs[index]" class="images margin"></image>
			<text class="classifyTitle">{{item}}</text>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: {
			// type—_one 的文本
			classifyTitle: {
				type: Array,
				default: []
			},
			// type_one 的图片
			classifyImgs: {
				type: Array,
				default: []
			},
			// 路径
			src: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
	.classifyList{
		flex-wrap: wrap;
		margin:20rpx auto;
		width:749rpx;
		justify-content:center;
	}
	.classificationList{
		width:180rpx;
	}
	.images{
		width:80rpx;
		height:80rpx;
		display:block;
		border-radius:50%;
	}
	.classifyTitle{
		font-size:24rpx;
		padding:15rpx 0rpx;
		width:100%;
		color:#999999;
		display:block;
		text-align:center;
	}
</style>
