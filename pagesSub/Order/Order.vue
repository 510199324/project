<template>
	<view class="Order">
		<view class="tab-header">
			<view @tap='changeTab($event,item)' :class="{'tab-item':true,active:index==curTab}" :data-curtab="index" v-for="(item, index) in orderList"
			 :key="index">{{item}}</view>
		</view>
		<view class="content" :style="{height:ch+'rpx'}">
			<swiper :style="{height:ch+'rpx'}" @change='swiperChange' :current='curTab' :interval="200">
				<swiper-item v-for="(item, index) in orderList" :key="index">
					<scroll-view scroll-y class="scroll" :style="{height:ch+'rpx'}">
						<!-- 订单列表 -->
						<view class="order-list">
							<view class="list" v-for="(item,index) in 10" @click="onOrderList" :key="index">
								<view class="title-status">
									<view class="title">
										<text>下单时间：2020-12-12 18:56</text>
									</view>
									<view class="status">
										<text>待付款</text>
										<text class="iconfont icon-laji del"></text>
									</view>
								</view>
								<view class="goods-list">
									<view class="goods">
										<view class="thumb">
											<image :src="'/static/img/goods_thumb_0'+(index+1)+'.png'" mode=""></image>
										</view>
										<view class="item">
											<view class="goods-name">
												<text class="two-omit">薇妮(Viney)时尚包包女包牛皮单肩包女休闲百搭斜挎包韩版小方包潮(枪色)</text>
											</view>
											<view class="goods-price">
												<text class="min">￥</text>
												<text class="max">299</text>
												<text class="min">.00</text>
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
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ch: 0,
				curTab: 0,
				orderList: [
					'全部',
					'待收款',
					'待发货',
					'待收货',
					'待评价'
				]
			}
		},
		methods: {
			changeTab: function(e, item) {
				console.log(item)
				this.curTab = e.currentTarget.dataset.curtab;
				uni.showLoading({
					title: '加载中......'
				})
				uni.hideLoading()
			},
			swiperChange: function(e) { //切换
				this.curTab = e.detail.current;
				uni.showLoading({
					title: '加载中......'
				})
				uni.hideLoading()
			}
		},
		onLoad: function(options) {
			let {
				status
			} = options;
			this.curTab = status;
			uni.getSystemInfo({
				success: res => {
					//转为rpx
					let ch = (750 / res.screenWidth) * res.windowHeight - 80;
					this.ch = ch
				},
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
	/* 订单列表 */
	.order-list {
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
						width: 30%;
						height: 100%;

						image {
							width: 160rpx;
							height: 160rpx;
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
				justify-content: flex-end;
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
