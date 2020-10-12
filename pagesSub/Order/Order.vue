<template>
	<view class="Order">
		<view class="tab-header">
			<view @tap='changeTab($event,item)' :class="{'tab-item':true,active:index==curTab}" :data-curtab="index" v-for="(item, index) in orderList"
			 :key="index">{{item}}</view>
		</view>
		<view class="content" :style="{height:ch+'rpx'}">
			<swiper :style="{height:ch+'rpx'}" :current='curTab' :interval="200">
				<swiper-item v-for="(item, index) in orderList" :key="index">
					<scroll-view class="scroll" :style="{height:ch+'rpx'}" scroll-y @touchmove.stop="stopTouchMove">
						<!-- 订单列表为空的时候 -->
						<shop v-if="orderListArr.length == 0">
							<text slot="text-title">订单空空如也~</text>
							<text slot="text-two">快去逛逛吧，挑选您喜爱的商品</text>
							<button type="primary" slot="button" @tap="goShop">去逛逛</button>
						</shop>
						<!-- 订单列表 -->
						<checkbox-group class="order-list" v-else>
							<label class="list" v-for="(item,index) in goodsList" @click="onOrderList" :key="index">
								<view class="title-status">
									<view class="title">
										<checkbox :value="2" style="margin-left:10rpx;margin-right:30rpx;" v-if="itemOne == '待付款'" />
										<text>下单时间：2020-12-12 18:56</text>
									</view>
									<view class="status">
										<text>{{orderListArr[index].orderstatus}}</text>
										<text class="iconfont icon-laji del"></text>
									</view>
								</view>
								<view class="goods-list">
									<view class="goods">
										<view class="thumb">
											<image :src="item.img_list.split(',')[0]" mode=""></image>
										</view>
										<view class="item">
											<view class="goods-name">
												<text class="two-omit">{{item.title}}({{orderListArr[index].parameter}})</text>
											</view>
											<view class="goods-price">
												<text class="min">￥</text>
												<text class="max">{{item.price}}</text>
											</view>
										</view>
									</view>
								</view>
								<view class="status-btn">
									<view class="btn">
										<text>取消订单</text>
									</view>
									<view class="btn action">
										<text>待付款</text>
									</view>
									<view class="btn action">
										<text>查看物流</text>
									</view>
								</view>
							</label>
						</checkbox-group>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="close-account" v-if="itemOne == '待付款'">
			<view class="check-total">
				<view class="check">
					<checkbox-group @change="checkAll">
						<label>
							<checkbox value="all" :checked="checkKey"/>
							<text class="all">全选</text>
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="account">
				<view class="btn-calculate" v-if="!isEdit" @tap="pay">
					<text>合并结算</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { allOrder, received, unpaid, delivered } from '@/api/shops/order.js';
	import { getGood } from '@/api/shops/shops.js';
	import { getCode } from '@/utlis/getToken.js';
	import shop from '@/components/my-components/shop/shop.vue';
	export default {
		components: {
			shop
		},
		data() {
			return {
				ch: 0,
				curTab: 0,
				orderList: [
					'全部',
					'待付款',
					'待发货',
					'待收货'
				], // 订单状态
				token: '', // 用户token
				orderListArr: [], // 订单列表
				goodIdList: [], // 商品id列表 用来发请求获取商品数据
				goodsList: [], // 商品列表
				itemOne: '', // 状态
			}
		},
		methods: {
			// 登录状态的去逛逛
			goShop() {
				uni.switchTab({
					url: '../../pages/home/home'
				})
			},
			changeTab(e, item) {
				this.curTab = e.currentTarget.dataset.curtab;
				this.itemOne = item;
				// uni.showLoading({
				// 	title: '加载中......'
				// })
				// uni.hideLoading()
				this.requestOrder(item);
			},
			// 获取订单列表
			requestOrder(status) {
				if (status == '全部') {
					allOrder(this.token).then(res => {
						this.eachRequest(res[1].data.data);						
					})
				} else if (status == '待付款') {
					unpaid(this.token).then(res => {
						this.eachRequest(res[1].data.data);
					})
				} else if (status == '待发货') {
					delivered(this.token).then(res => {
						this.eachRequest(res[1].data.data);
					})
				} else if (status == '待收货') {
					received(this.token).then(res => {
						this.eachRequest(res[1].data.data);
					})
				}
			},
			// 发请求获取商品列表
			eachRequest(arr) {
				console.log(arr)
				this.orderListArr = [];
				for (let i of arr) {
					this.goodIdList.push(i.goodsid);
					this.orderListArr.push(i);
				}
				for (let j of this.goodIdList) {
					getGood({
						id: j
					}).then(res => {
						this.goodsList.push(res[1].data.data[0]);
					})
				}
			},
			stopTouchMove() {
				return true;
			}
		},
		onLoad(options) {
			let { status } = options;
			this.curTab = status;
			this.itemOne = this.orderList[this.curTab];
			uni.getSystemInfo({
				success: res => {
					//转为rpx
					let ch = (750 / res.screenWidth) * res.windowHeight - 80;
					this.ch = ch
				},
			})
		},
		onShow() {
			getCode().then(res => {
				this.token = res.token;
				this.requestOrder(this.orderList[this.curTab]);
			})
		}
	}
</script>

<style>
	.tab-header {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	.tab-header .tab-item {
		color: #333333;
		font-size: 28rpx;
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-bottom: 1px solid #fff;
	}

	.tab-header .cur {
		color: #2ca2ed;
		border-bottom: 1px solid #2ca2ed;
	}

	.tab-header .active {
		color: #f40;
		border-bottom: 6rpx solid #f40;
	}
</style>

<style scoped lang="scss">
	.close-account {
		position: fixed;
		left: 0;
		bottom:0;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid #f6f6f6;
		.check-total {
			display: flex;
			align-items: center;
			width: 50%;
			height: 100%;
			.check {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40%;
				height: 100%;
				text {
					font-size: 36rpx;
					color: #333333;
				}
				.icon-checked {
					color: $base;
					// box-shadow: 0 0 10rpx $base;
				}
				.all {
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}
			.total {
				display: flex;
				align-items: center;
				width: 60%;
				height: 100%;
				text {
					font-size: 24rpx;
					color: #333333;
				}
				.price {
					font-weight: bold;
					color: $base;
				}
			}
		}
		.account {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 46%;
			padding-right: 4%;
			.btn-calculate {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 160rpx;
				height: 60rpx;
				background-color: $base;
				border-radius: 60rpx;
				text {
					color: #FFFFFF;
					font-size: 24rpx;
				}
			}
		}
	}
	/* 订单列表 */
	.order-list {
		margin-bottom:120rpx;
		width: 100%;
		/* #ifdef APP-PLUS */
		margin-top: calc(170rpx + var(--status-bar-height));
		/* #endif */
		.list {
			padding: 0 4%;
			min-height: 400rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.title-status {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100rpx;
				padding:0rpx 30rpx;
				.title {
					display: flex;
					align-items: center;
					text {
						font-size: 26rpx;
						font-weight: bold;
						color: #222222;
					}
				}
				.status {
					display: flex;
					align-items: center;
					text {
						font-size: 26rpx;
						color: $base;
					}
					.del {
						padding: 10rpx;
						font-size: 34rpx;
						color: #222222;
						background-color: #f6f6f6;
						border-radius: 100%;
						margin-left: 20rpx;
					}
				}
			}
			.goods-list {
				width: 100%;
				.goods {
					display: flex;
					align-items: center;
					width: 100%;
					height: 200rpx;
					.thumb {
						display: flex;
						align-items: center;
						width: 25%;
						height: 100%;
						image {
							width: 140rpx;
							height: 140rpx;
							border-radius: 10rpx;
						}
					}
					.item {
						display: flex;
						align-items: center;
						width: 70%;
						height: 100%;
						.goods-name {
							width: 70%;
							text {
								font-size: 26rpx;
								color: #555555;
							}
						}
						.goods-price {
							display: flex;
							align-items: center;
							justify-content: flex-end;
							width: 30%;
							text {
								color: #222222;
							}
							.min {
								font-size: 26rpx;
							}
							.max {
								font-size: 34rpx;
							}
						}
					}
				}
			}
			.status-btn {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				height: 100rpx;
				.btn {
					padding: 10rpx 30rpx;
					border: 2rpx solid #EEEEEE;
					border-radius: 100rpx;
					margin-left: 20rpx;

					text {
						font-size: 26rpx;
						color: #555555;
					}
				}
				.action {
					border: 2rpx solid $base;

					text {
						color: $base;
					}
				}
			}
		}
	}
</style>
