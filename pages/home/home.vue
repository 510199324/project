<template>
	<view class="home">
		<view class="search">
			<uni-search-bar radius="30" :margin="'0rpx auto'" :width="'80%'"/>
		</view>
		<view class="swiper">
			<mySwiper :imgs="imgs"/>
		</view>
		<view class="welfare flex-around">
			<view class="SevenDays flex">
				<image src="/static/imags/seven.png"></image>
				<text>七天无理由退货</text>
			</view>
			<view class="Insurance flex">
				<image src="/static/imags/Insurance.png"></image>
				<text>全程畅享运费险</text>
			</view>
			<view class="fiveHundred flex">
				<image src="/static/imags/fiveHundred.png"></image>
				<text>满 500元包邮上门</text>
			</view>
		</view>
		<view class="">
			<classify-list :src="'../../pagesSub/classify/classify?id='" :classifyImgs="classifyImgs" :classifyTitle="classifyTitle"></classify-list>
		</view>
		<view class="good-List">
			<goodList :goodShopList="goodShopList" :src="'../../pagesSub/detail/detail?type_one='"/>
		</view>
	</view>
</template>

<script>
	import mySwiper from '../../components/my-components/swiper/my-swiper.vue';
	import {getGood} from '../../api/home/home.js';
	import goodList from '../../components/my-components/goodList/goodList.vue';
	import classifyList from '../../components/my-components/detailList/detailList.vue';
	export default {
		name: 'Home',
		components: {
			mySwiper,
			goodList,
			classifyList
		},
		data() {
			return {
				imgs: [ // 轮播图图片列表
					'/static/test/images/a.jpg',
					'/static/test/images/b.jpg',
					'/static/test/images/c.jpg',
					'/static/test/images/d.jpg',
					'/static/test/images/e.jpg'
				],
				goodShopList: null, // 商品列表
				classifyImgs: [ // 分类图片列表
					'/static/imags/bathroom.png',
					'/static/imags/bed.jpg',
					'/static/imags/Lamps.jpg',
					'/static/imags/Locker.jpg',
					'/static/imags/sofa.jpg',
					'/static/imags/TablesAndChairs.jpg',
					'/static/imags/cupboard.jpg',
					'/static/imags/Fabric.jpg'
				],
				classifyTitle: ['浴室', '床', '灯', '储物柜', '沙发', '桌椅', '橱柜', '布艺']  // 分类名称
			}
		},
		methods: {
			getgoodList() {
				let arr = [getGood()];
				Promise.all(arr).then((res)=>{
					this.goodShopList = res[0][1].data.data;
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		created() {
			this.getgoodList();
		}
	}
</script>

<style>
	.home{
		background:#f8f8f8;
	}
	.search{
		position:fixed;
		top:0rpx;
		left:0rpx;
		z-index:20;
		width:100%;
		background:#fff;
	}
	.swiper{
		padding-top:80rpx;
	}
	.welfare{
		margin:20rpx 5rpx;
	}
	.welfare image{
		width:40rpx;
		height:40rpx;
		vertical-align:middle;
	}
	.welfare>view{
		margin-left:15rpx;
	}
	.welfare text{
		font-size:22rpx;
		color:#999;
		font-weight:600;
		line-height:30rpx;
	}
</style>