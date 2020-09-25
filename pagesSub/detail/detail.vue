<template>
	<view class="detail">
		<view class="detailHome">
			<view class="swiper">
				<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="400" class="swiperCom" @change="change">
					<view class="detailSwiper" v-for="(item, index) in detailList.img_list" :key="index">
						<swiper-item>
							<image :src="item" mode="widthFix" class="deteilImg" @tap="previewImage(index)"></image>
						</swiper-item>
					</view>
				</swiper>
				<text class="number">{{detailList.img_list.length}}/{{index}}</text>
			</view>
			<view class="detailText">
				<view class="flex-between">
					<text class="title">{{detailList.title}}</text>
					<text class="typeTwo">{{detailList.type_two}}</text>
				</view>
				<view class="money">
					<text class="gold">￥</text>
					<text class="price">{{detailList.price}}</text>
				</view>
				<text class="introduce">{{detailList.introduce}}</text>
			</view>
			<view class="detailList">
				<text class="like">猜你喜欢</text>
				<goodList :goodShopList="goodShopList"/>
			</view>
		</view>
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" class="goods"/>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
	import goodList from '../../components/my-components/goodList/goodList.vue';
	import {getGood} from '../../api/home/home.js';
	export default {
		components: {
			uniGoodsNav,
			goodList
		},
		onLoad({id}) {
			console.log(id)
		},
		data () {
		    return {
				goodShopList: null,
				index: 1,
		        options: [{
		            icon: 'headphones',
		            text: '客服'
		        }, {
		            icon: 'cart',
		            text: '购物车',
		            info: ''
		        }],
		        buttonGroup: [{
					 text: '加入购物车',
					 backgroundColor: '#39B0AE',
					 color: '#fff'
		        },
		        {
					 text: '立即购买',
					 backgroundColor: '#fff',
					 color: '#39B0AE',
					 radius: '0 100px 100px 0',
					 border: '1px solid #39B0AE'
					 
		        }],
				detailList: {
					"title": "拉斯克",
					"price": "249.00",
					"introduce": "这款手推车适用于狭小的空间，可随心推到任何你需要的地方。用它作为额外储物空间，安放你所有的厨用器具、书桌配件或手套、钥匙和手机。",
					"type_one": "床",
					"type_two": "床头柜",
					"img_list": [
						"https://www.ikea.cn/cn/zh/images/products/raskog-trolley__0503386_PE632627_S5.JPG?f=s",
						"https://www.ikea.cn/cn/zh/images/products/raskog-trolley__0870535_PE644566_S5.JPG?f=s",
						"https://www.ikea.cn/cn/zh/images/products/raskog-trolley__0806246_PH161134_S5.JPG?f=s",
						"https://www.ikea.cn/cn/zh/images/products/raskog-trolley__0870531_PE644545_S5.JPG?f=s",
					],
					"parameter": [
						{
							"title": "颜色",
							"name": [
								"白色",
								"淡粉红色",
								"灰绿色",
								"白色"
							],
							"content": [
								"https://www.ikea.cn/cn/zh/images/products/raskog-trolley__0503386_PE632627_S5.JPG?f=xxxs",
								"https://www.ikea.cn/cn/zh/images/products/raskog-trolley__0664042_PE712604_S5.JPG?f=xxxs",
								"https://www.ikea.cn/cn/zh/images/products/raskog-trolley-grey-green__0758013_PE756787_S5.JPG?f=xxxs",
								"https://www.ikea.cn/cn/zh/images/products/raskog-trolley__0503386_PE632627_S5.JPG?f=xxxs"
							]
						}
					]
				}
		    }
		},
		methods: {
			onClick(e) {
				// console.log(e)
			}, 
			buttonClick(e) {
				// console.log(e)
			},
			change(e) {
				this.index = e.detail.current + 1;
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.detailList.img_list,
					current: index
				})
			},
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
	.goods{
		position:fixed;
		bottom:0rpx;
		left:0rpx;
		width:100%;
	}
	.detailText{
		background:#f8f8f8;
		font-size:22rpx;
		margin:20rpx;
		padding:20rpx;
		border-radius:15rpx;
	}
	.price{
		font-size:30rpx;
		color:#f40;
	}
	.gold{
		color:#f40;
	}
	.money{
		padding:20rpx 0rpx;
	}
	.deteilImg{
		width:100%;
	}
	.swiperCom{
		height:700rpx;
	}
	.swiper{
		position:relative;
	}
	.number{
		position:absolute;
		bottom:30rpx;
		right:30rpx;
		font-size:30rpx;
		font-weight:600;
		border:1px solid #000;
		border-radius:30rpx;
		padding:10rpx;
	}
	.typeTwo{
		color:#ccc;
	}
	.like{
		font-size:40rpx;
		font-weight:700;
		padding:20rpx;
	}
</style>
