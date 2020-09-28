<template>
	<view class="detail">
		<view class="detailHome">
			<view class="swiper">
				<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="400" class="swiperCom" @change="change">
					<view class="detailSwiper" v-for="(item, index) in JSON.parse(detailList.img_list)" :key="index">
						<swiper-item>
							<image :src="item" mode="widthFix" class="deteilImg" @tap="previewImage(index)"></image>
						</swiper-item>
					</view>
				</swiper>
				<text class="number">{{JSON.parse(detailList.img_list).length}}/{{index}}</text>
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
		<view class="backFather" v-show="hide">
			<view class="back" @tap="hideAlert"></view>
			<good-attr class="fixed"></good-attr>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
	import goodList from '../../components/my-components/goodList/goodList.vue';
	import { getGood } from '../../api/shops/shops.js';
	import goodAttr from '../../components/my-components/GoodsAttr/GoodsAttr.vue';
	export default {
		components: {
			uniGoodsNav,
			goodList,
			goodAttr
		},
		onLoad({id}) {
			console.log(id)
			let arr = [getGood({
				id: id
			})];
			Promise.all(arr).then(res=>{
				this.detailList = res[0][1].data.data[0];
				console.log(this.detailList)
			}).cacth(err=>{
				console.log(err)
			});
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
				detailList: null,  // 商品详情
				hide: true  // 控制添加购物车和购买的框显示和隐藏
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
					urls: JSON.parse(this.detailList.img_list),
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
			},
			hideAlert() {
				this.hide = false;
			}
		},
		created() {
			// this.getgoodList();
		}
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
	}
	.detail{
		width:100%;
		height:100%;
	}
	.backFather{
		width:100%;
		height:100%;
	}
	.back{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.3);
		position:fixed;
		top:0;
		left:0;
	}
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
	.fixed{
		position:fixed;
		bottom:0rpx;
		left:0rpx;
		width:100%;
		z-index:8888;
	}
</style>
