<template>
	<view class="page">
		<!-- 搜索 -->
		<view class="search-head">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="search">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" v-model="keyword" placeholder="搜索商品" />
			</view>
			<view class="searchBtn" @tap="search">
				<text>搜索</text>
			</view>
			<view class="cut" @click="isList = !isList">
				<text class="cuIcon" :class="isList?'cuIcon-list':'cuIcon-card'"></text>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-data">
			<view class="goods-list">
				<view :class="isList?'list-view':'list-li'" v-for="(item,index) in goodsList" @click="onGoodsList(item, index)" :key="index">
					<view class="thumb">
						<image :src="item.img_list[0]" mode="heightFix"></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="two-omit">{{item.title}}</text>
						</view>
						<view class="price">
							<view class="retail-price">
								<text class="min">￥</text>
								<text class="max">{{item.price}}</text>
							</view>
							<view class="vip-price">
								<text class="min">￥</text>
								<text class="max">{{item.spike_price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { searchList } from '@/api/users/user.js';
	import { getSpike } from '@/api/shops/shops.js';
	export default {
		data() {
			return {
				// 列表视图切换
				isList: true,
				// 筛选弹窗
				isScreen: false,
				// 筛选切换
				screenShow: 0,
				// 抽屉
				isDrawer: false,
				keyword: '',
				goodsList:[],
			}
		},
		onLoad(params) {
			getSpike(params.type).then(res => {
				this.goodsList = res[1].data.data;
			})
			uni.setNavigationBarTitle({
				title: params.type == 'special' ? '特价商品' : '限时秒杀'
			})
		},
		methods: {
			// 搜索
			search() {
				if (this.keyword == '') {
					uni.showToast({
						title: '搜索不能为空',
						icon: 'none'
					})
					setTImeout(()=>{
						uni.hideToast();
					},1500)
				} else {
					searchList({
						keyword: this.keyword
					}).then(res => {
						this.goodList = res[1].data.data;
					})
				}
			},
			/**
			 * 商品列表
			 */
			onGoodsList(item,index){
				uni.navigateTo({
					url: '../detail/detail?id='+ item.id + '&type_one='+item.type_one
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #f6f6f6;
		overflow-x: hidden;
		overflow-y: auto;
		padding-bottom: 40rpx;
	}
	
	/* 搜索 */
	.search-head {
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		z-index: 10;
		/* #ifdef APP-PLUS */
		height: calc(150rpx + var(--status-bar-height));
		/* #endif */
		background-color: #ffffff;
		.back {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 10%;
			height: 100%;
			text {
				width: 20rpx;
				height: 20rpx;
				border-left: 2rpx solid #555555;
				border-bottom: 2rpx solid #555555;
				transform: rotate(45deg);
			}
		}
		.search {
			display: flex;
			align-items: center;
			width: 60%;
			height: 60rpx;
			background-color: #f6f6f6;
			border-radius: 60rpx;
			padding: 0 4%;
			text {
				font-size: 34rpx;
				color: #c0c0c0;
			}
			input {
				width: 90%;
				height: 100%;
				font-size: 26rpx;
				color: #212121;
				margin-left: 10rpx;
			}
		}
		.searchBtn{
			margin-left:15rpx;
			padding:10rpx;
			background:#f6f6f6;
			border-radius:20rpx;
			text{
				font-size:28rpx;
				color:#808080;
			}
		}
		.cut {
			display: flex;
			align-items: center;
			margin-left:30rpx;
			justify-content:center;
			width: 10%;
			height: 100%;
			text {
				font-size: 38rpx;
				color: #555555;
			}
		}
	}
	
	/* 商品列表 */
	.goods-data {
		width: 100%;
		margin-top: 140rpx;
		/* #ifdef APP-PLUS */
		margin-top: 270rpx;
		/* #endif */
		.goods-list {
			padding: 0 25rpx;
			border-radius: 20rpx;
			overflow: hidden;
			.list-view {
				float: left;
				width: 49%;
				height: 560rpx;
				background-color: #ffffff;
				border-radius: 20rpx;
				margin-right: 2%;
				margin-bottom: 20rpx;
				overflow: hidden;
				.thumb {
					width: 100%;
					overflow: hidden;
					image {
	                    height: 350rpx;
					}
				}
				.item {
					width: 100%;
					.title {
						padding: 20rpx;
						text {
							width: 100%;
							color: #212121;
							font-size: 26rpx;
						}
					}
					.price {
						padding: 0 20rpx;
						.vip-price {
							display: flex;
							align-items: flex-end;
							width: 100%;
							height: 40rpx;
							.min {
								display: inline-block;
								font-size: 32rpx;
								color: $base;
								font-weight: bold;
							}
							.max {
								font-size: 32rpx;
								color: $base;
								font-weight: bold;
							}
						}
						.retail-price {
							display: flex;
							align-items: flex-end;
							width: 100%;
							height: 40rpx;
							.min {
								display: inline-block;
								font-size: 24rpx;
								color: #bbbaba;
								transform: scale(0.7);
							}
							.max {
								font-size: 28rpx;
								color: #bbbaba;
								text-decoration: line-through;
							}
						}
					}
				}
			}
			.list-view:nth-child(2n) {
				margin-right: 0;
			}
			// 列表
			.list-li {
				display: flex;
				align-items: center;
				width: 100%;
				height: 300rpx;
				background-color: #ffffff;
				margin-bottom:10rpx;
				.thumb {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 30%;
					height: 100%;
					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 10rpx;
					}
				}
				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 70%;
					height: 100%;
					.title {
						padding: 20rpx;
						text {
							width: 100%;
							color: #212121;
							font-size: 26rpx;
						}
					}
					.price {
						padding: 0 20rpx;
						.vip-price {
							display: flex;
							align-items: flex-end;
							width: 100%;
							height: 40rpx;
							.min {
								display: inline-block;
								font-size: 32rpx;
								color: $base;
								font-weight: bold;
							}
							.max {
								font-size: 32rpx;
								color: $base;
								font-weight: bold;
							}
						}
						.retail-price {
							display: flex;
							align-items: flex-end;
							width: 100%;
							height: 40rpx;
							.min {
								display: inline-block;
								font-size: 24rpx;
								color: #bbbaba;
								transform: scale(0.7);
							}
							.max {
								font-size: 28rpx;
								color: #bbbaba;
								text-decoration: line-through;
							}
						}
					}	
				}
			}
		}
	}
	.basis-lg {
		padding-top: 0;
		border-radius: 20rpx 0 0 20rpx;
		flex-basis: 80% !important;
		.serve {
			/* #ifdef APP-PLUS */
			padding-top: 50rpx;
			/* #endif */
			/* #ifdef MP */
			padding-top: 140rpx;
			/* #endif */
			padding-left: 20rpx;
			padding-right: 20rpx;
			background-color: #ffffff;
			.title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 80rpx;
				text {
					color: #212121;
					font-size: 28rpx;
				}
			}
			.serve-list {
				display: flex;
				flex-wrap: wrap;
				padding: 20rpx 0;
				.list {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 30%;
					height: 60rpx;
					border-radius: 60rpx;
					margin-right: 4%;
					background-color: #f6f6f6;
					text {
						color: #555555;
						font-size: 24rpx;
					}
				}
				.list:nth-child(3n) {
					margin-right: 0;
				}
				.action {
					background-color: $rgba-03;
					border: 2rpx solid $base;
					text {
						color: $base;
					}
				}
			}
		}
		.price-screen {
			padding: 0 4%;
			background-color: #ffffff;
			margin-top: 20rpx;
			.title {
				display: flex;
				align-items: center;
				width: 100%;
				height: 80rpx;
				text {
					color: #212121;
					font-size: 28rpx;
				}
			}
			.price-section {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 80rpx;
				input {
					width: 180rpx;
					height: 50rpx;
					border-radius: 50rpx;
					font-size: 24rpx;
					color: #555555;
					background-color: #f6f6f6;
				}
				text {
					display: flex;
					width: 60rpx;
					height: 2rpx;
					background-color: #f6f6f6;
					margin: 0 20rpx;
				}
			}
		}
		.operation-btn {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 4%;
			width: 100%;
			height: 100rpx;
			background-color: #ffffff;
			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 46%;
				height: 70rpx;
				background-color: #ffffff;
				border: 2rpx solid #f6f6f6;
				border-radius: 70rpx;
				// margin-left: 5%;
				text {
					color: #212121;
					font-size: 26rpx;
				}
			}
			.action {
				background-color: $base;
				text {
					color: #ffffff;
				}
			}
		}
	}
</style>