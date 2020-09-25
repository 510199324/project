<template>
	<view class="app">
		<view class="top">
			<image class="u-bg" src="/static/bg/user.png"></image>
			<view class="user-wrapper">
				<image class="avatar" :src="userInfo.avatar || '/static/imags/default.png'"></image>
				<view class="login-box" @tap="login" v-show="!hasLogin">
					<text>请登录</text>
				</view>
			</view>
			<image class="arc-line" src="/static/icon/arc.png" mode="aspectFill"></image>
		</view>
		<!-- 订单 -->
		<view class="order-wrap">
			<view class="o-header row">
				<text class="tit">我的订单</text>
				<text class="more" @tap="order(0)">查看全部</text>
				<text class="mix-icon icon-you"></text>
			</view>
			<view class="o-list">
				<view class="item center" hover-class="hover-gray" :hover-stay-time="50" @tap="order(1)">
					<text class="mix-icon icon-daifukuan"></text>
					<text>待付款</text>
					<text v-if="orderCount.c0 > 0" class="number">{{ orderCount.c0 }}</text>
				</view>
				<view class="item center" hover-class="hover-gray" :hover-stay-time="50" @tap="order(2)">
					<text class="mix-icon icon-daifahuo"></text>
					<text>待发货</text>
					<text v-if="orderCount.c1 > 0" class="number">{{ orderCount.c1 }}</text>
				</view>
				<view class="item center" hover-class="hover-gray" :hover-stay-time="50" @tap="order(3)">
					<text class="mix-icon icon-yishouhuo"></text>
					<text>待收货</text>
					<text v-if="orderCount.c2 > 0" class="number">{{ orderCount.c2 }}</text>
				</view>
				<view class="item center" hover-class="hover-gray" :hover-stay-time="50" @tap="order(4)">
					<text class="mix-icon icon-daipingjia"></text>
					<text>待评价</text>
					<text v-if="orderCount.c3 > 0" class="number">{{ orderCount.c3 }}</text>
				</view>
			</view>
		</view>
		<!-- 浏览历史 -->
		<view class="option-wrap">
			<view v-if="historyList.length > 0" class="sec-header row">
				<text class="mix-icon icon-lishijilu"></text>
				<text class="fill">浏览历史</text>
				<text class="mix-icon icon-lajitong"></text>
			</view>
			<scroll-view v-if="historyList.length > 0" scroll-x class="h-scroll">
				<view class="pro-list row">
					<image v-for="(item, index) in historyList" :key="index" :src="item.thumb" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<mix-list-cell :src="'../../static/imags/address.png'" iconColor="#5fcda2" title="地址管理" @tap="address"></mix-list-cell>
			<mix-list-cell :src="'../../static/imags/Discount.png'" title="优惠券" @tap="coupon()"></mix-list-cell>
			<mix-list-cell :src="'../../static/imags/integral.png'" title="积分" @tap="integral"></mix-list-cell>
			<mix-list-cell :src="'../../static/imags/Favorites.png'" iconColor="#54b4ef" title="我的收藏" @tap="favorites()"></mix-list-cell>
		</view>
	</view>  
</template>

<script>
	import mixListCell from '../../components/mix-list-cell/mix-list-cell.vue';
	import mixModal from '../../components/mix-modal/mix-modal.vue';
	export default {
		components:{
			mixListCell,
			mixModal
		},
		data(){
			return {
				historyList: []
			}
		},
		computed: {
			
		},
		onShow(){
			
		},
		methods: {
			login() {
				uni.navigateTo({
					url:'../../pagesSub/login/login'
				})
			},
			order(item) {
				uni.navigateTo({
					url:'../../pagesSub/Order/Order?status='+item
				})
			},
			address() {
				console.log('点击了')
				uni.navigateTo({
					url: '../../pagesSub/address/address'
				})
			},
			coupon() {
				uni.navigateTo({
					url:'../../pagesSub/coupon/coupon'
				})
			},
			favorites() {
				uni.navigateTo({
					url: '../../pagesSub/Favorites/Favorites'
				})
			},
			integral() {
				uni.navigateTo({
					url:'../../pagesSub/IntegralDetails/IntegralDetails'
				})
			}
		},
		created() {
			
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
<style scoped lang='scss'>
	.app{
		padding-bottom: 20rpx;
	}
	.top{
		position: relative;
		overflow: hidden;
		padding-top: calc(var(--status-bar-height) + 52rpx);	
		padding-bottom: 6rpx;
			
		.u-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 330rpx;
		}
		.user-wrapper{
			display:flex;
			flex-direction: column;
			flex-direction: row;
			align-items: center;
			position: relative;
			z-index: 5;
			padding: 20rpx 30rpx 60rpx;
		}
		.login-box{
			font-size: 36rpx;
			color: #fff;
		}
		.avatar{
			flex-shrink: 0;
			width: 130rpx;
			height: 130rpx;
			border-radius: 100px;
			margin-right: 24rpx;
			border: 4rpx solid #fff;
			background-color: #fff;
		}
		.username{
			font-size: 34rpx;
			color: #fff;
		}
		.user-group{
			align-self: flex-start;
			padding: 10rpx 16rpx;
			margin-top: 16rpx;
			font-size: 20rpx;
			color: #fff;
			background-color: rgba(255,255,255,.3);
			border-radius: 100rpx;
		}
		.arc-line{
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 9;
			width: 100%;
			height: 32rpx;
		}
	}
	.order-wrap{
		width: 700rpx;
		margin: 20rpx auto 0;
		background: #fff;
		border-radius: 10rpx;
		
		.o-header{
			padding: 28rpx 20rpx 6rpx 26rpx;
			
			.tit{
				flex: 1;
				font-size: 32rpx;
				color: #333;
				font-weight: 700;
			}
			.more{
				font-size: 24rpx;
				color: #999;
			}
			.icon-you{
				margin-left: 4rpx;
				font-size: 20rpx;
				color: #999;
			}
		}
		.o-list{
			display:flex;
			justify-content: space-around;
			padding: 20rpx 0;
		}
		.item{
			flex-direction: column;
			width: 130rpx;
			height: 130rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
			color: #606266;
			position: relative;
			
			.mix-icon{
				font-size: 50rpx;
				margin-bottom: 20rpx;
				color: #fa436a;
			}
			.icon-shouhoutuikuan{
				font-size: 44rpx;
			}
		}
		.number{
			position: absolute;
			right: 22rpx;
			top: 6rpx;
			min-width: 34rpx;
			height: 34rpx;
			line-height: 30rpx;
			text-align: center;
			padding: 0 8rpx;
			font-size: 18rpx;
			color: #fff;
			border: 2rpx solid #fff;
			background-color: #ff536f;
			border-radius: 100rpx;
		}
	}
	.option-wrap{
		width: 700rpx;
		margin: 20rpx auto 0;
		margin-top: 20rpx;
		background: #fff;
		border-radius:10rpx;
	}
</style>