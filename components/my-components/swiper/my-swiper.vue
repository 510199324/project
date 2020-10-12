<template>
	<swiper indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="true" :autoplay="true" class="imgs" :interval="3000" :duration="500" :circular="true">
		<swiper-item v-for="(item, index) in imgs" :key="index">
			<image :src="item" mode="widthFix" class="swiperImg"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props: {
			// 轮播图的图片列表
			imgs: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style>
	/* swiper 部分 */
	.imgs{
		width:100%;
		height:360rpx;
	}
	.imgs .swiperImg{
		width:100%;
		height:100% !important;
	}
</style>
