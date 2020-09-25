<template>
	<view class="shop-car">
		<!-- 购物车列表 -->
		<view class="shop-back">
			<shop>
				<text slot="text-title">未登陆</text>
				<text slot="text-two">登录成功后将显示购物车内商品</text>
				<button type="primary" slot="button">去登陆</button>
			</shop>
			<shop v-show="false">
				<text slot="text-title">购物车空空如也~</text>
				<text slot="text-two">快去逛逛吧，挑选您喜爱的商品</text>
				<button type="primary" slot="button">去逛逛</button>
			</shop>
		</view>
		<view class="recommend">
			<text class="text">为你推荐</text>
			<view class="goods">
				<goodList :goodShopList="goodShopList"/>
			</view>
		</view>
		<view class="Settlement flex-between" v-show="false">
			<view class="selectAll flex-align-center">
				<label class="checkBox">
					<checkbox class="check" value="a" /><text>全选</text>
				</label>
			</view>
			<view class="SettlementBtn flex">
				<text class="total">合计:</text>
				<text class="totalMoney">￥{{arr.length}}</text>
				<button class="settlementBtn">结算({{arr1.length}})</button>
			</view>
		</view>
	</view>
</template>

<script>
	import goodList from '../../components/my-components/goodList/goodList.vue';
	import shop from '../../components/my-components/shop/shop.vue';
	import {getGood} from '../../api/home/home.js';
	export default {
		components: {
			goodList,
			shop
		},
		data() {
			return {
				goodShopList: null, // 商品列表
				arr: [],
				arr1: []
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
	.text{
		font-size:40rpx;
		font-weight:700;
		color:#6B6B6B;
		line-height:100rpx;
		padding-left:20rpx;
	}
	.Settlement{
		position:fixed;
		bottom:0rpx;
		left:0rpx;
		width:100%;
		background:#fff;
		border-top:1px solid #E1E1E1;
		z-index:20;
		padding:25rpx 10rpx;
	}
	.settlementBtn{
		width:100rpx;
		height:60rpx;
		border:none;
		background:#4CD964;
		color:#fff;
		line-height:60rpx;
		border-radius:30rpx;
	}
	.total,
	.totalMoney{
		align-self:center;
	}
	.total{
		color:#43474A;
		font-size:36rpx;
	}
	.totalMoney{
		font-size:28rpx;
		color:#f40;
		margin:0rpx 15rpx;
	}
	.check{
		width:40rpx;
		height:40rpx;
		border-radius:50%;
	}
	.checkBox>text{
		color:#a2a2a2;
		font-size:28rpx;
		margin-left:15rpx;
	}
</style>