<template>
	<view class="home">
		<!-- 搜索 -->
		<view class="search">
			<uni-search-bar radius="30" :margin="'0rpx auto'" :width="'80%'" />
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<mySwiper :imgs="imgs" />
		</view>
		<!-- 提示信息 -->
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
		<!-- 分裂列表 -->
		<view class="">
			<classify-list :src="'../../pagesSub/classify/classify?type_one='" :classifyImgs="classifyImgs" :classifyTitle="classifyTitle"></classify-list>
		</view>
		<view class="wrapper">
			<!-- 限时抢购，好货精选 -->
			<view class="flash-good">
				<view class="flash-sale">
					<view class="flash-title" @click="onSkip('flash')">
						<text>限时抢购</text>
						<view class="date-time">
							<text class="time">02</text>
							<text class="da">:</text>
							<text class="time">15</text>
							<text class="da">:</text>
							<text class="time">55</text>
						</view>
						<view class="describe">
							<text>更多</text>
						</view>
					</view>
					<view class="goods-list">
						<view class="list">
							<view class="pictrue">
								<!-- <image src="/static/img/goods_03.png"></image> -->
							</view>
							<view class="price">
								<text class="selling-price">￥59</text>
								<text class="original-price">￥999</text>
							</view>
						</view>
						<view class="list">
							<view class="pictrue">
								<!-- <image src="/static/img/goods_08.png"></image> -->
							</view>
							<view class="price">
								<text class="selling-price">￥59</text>
								<text class="original-price">￥999</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 特价商品 -->
			<view class="new-product">
				<view class="product-title">
					<view class="title">
						<!-- <image src="/static/hr_ico.png"></image> -->
						<text>特价商品</text>
					</view>
					<view class="describe">
						<text>更多</text>
					</view>
				</view>
				<view class="goods-list">
					<view class="list">
						<view class="pictrue">
							<!-- <image src="/static/img/goods_10.png"></image> -->
						</view>
						<view class="price">
							<text class="selling-price">￥599</text>
							<text class="original-price">￥199</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="good-List">
			<view class="recommendF">
				<image src="/static/imags/wntj_title.png" mode="" class="recommend"></image>
			</view>
			<goodList :goodShopList="goodShopList" :src="'../../pagesSub/detail/detail?type_one='" />
		</view>
	</view>
</template>

<script>
	import mySwiper from '@/components/my-components/swiper/my-swiper.vue';
	import { getGood } from '@/api/shops/shops.js';
	import goodList from '@/components/my-components/goodList/goodList.vue';
	import classifyList from '@/components/my-components/detailList/detailList.vue';
	export default {
		name: 'Home',
		components: {
			mySwiper, // 轮播图
			goodList, // 商品列表 
			classifyList // 分类列表
		},
		data() {
			return {
				imgs: [ // 轮播图图片列表
					'https://www.sngblog.cn:7147/lunbo1.jpg',
					'https://www.sngblog.cn:7147/lunbo2.jpg',
					'https://www.sngblog.cn:7147/lunbo3.jpg',
					'https://www.sngblog.cn:7147/indexbottom.jpg'
				],
				goodShopList: [], // 商品列表
				classifyImgs: [ // 分类图片列表
					'https://www.sngblog.cn:7147/bathroom.png',
					'https://www.sngblog.cn:7147/bed.jpg',
					'https://www.sngblog.cn:7147/Lamps.jpg',
					'https://www.sngblog.cn:7147/Locker.jpg',
					'https://www.sngblog.cn:7147/sofa.jpg',
					'https://www.sngblog.cn:7147/TablesAndChairs.jpg',
					'https://www.sngblog.cn:7147/cupboard.jpg',
					'https://www.sngblog.cn:7147/Fabric.jpg'
				],
				classifyTitle: ['浴室', '床', '灯', '储物柜', '沙发', '桌椅', '厨房橱柜', '布艺'] // 分类名称
			}
		},
		methods: {
			// 获取商品列表
			getgoodList() {
				let arr = [getGood()];
				Promise.all(arr).then((res) => {
					for (let i = 0; i < 30; i++) {
						this.goodShopList.push(res[0][1].data.data[i])
					}
					this.$nextTick(()=>{
						uni.hideLoading()
					})
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		created() {
			this.getgoodList();
			uni.showLoading({
				mask: true
			})
		}
	}
</script>

<style>
	.home {
		background: #f8f8f8;
	}

	.search {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 20;
		width: 100%;
		background: #fff;
	}

	.swiper {
		padding-top: 80rpx;
	}

	.welfare {
		margin: 20rpx 5rpx;
	}

	.welfare image {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}

	.welfare>view {
		margin-left: 15rpx;
	}

	.welfare text {
		font-size: 22rpx;
		color: #999;
		font-weight: 600;
		line-height: 30rpx;
	}
	.recommendF{
		width:100%;
	}
	.recommend{
		width:416rpx;
		height:40rpx;
		margin:30rpx auto;
	}
</style>

<style scoped lang="scss">
	/* 限时抢购，好货精选 */
	.flash-good{
		display: flex;
		align-items: center;
		padding: 0 25rpx;
		height: 320rpx;
		background-color: #FFFFFF;
		border-bottom: 16rpx solid #f9f9f9;
		.flash-sale{
			position: relative;
			width: 100%;
			height: 100%;
			.flash-title{
				display: flex;
				align-items: center;
				// justify-content: space-between;
				width: 100%;
				height: 80rpx;
				position:relative;
				.describe{
					position:absolute;
					right:0rpx;
					top:50%;
					transform:translate(0,-50%);
					margin-left: 10rpx;
					text{
						font-size: 28rpx;
						color: #979696;
					}
				}
				.pictrue{
					display: flex;
					align-items: center;
					height: 100%;
					image{
						width: 118rpx;
						height: 28rpx;
					}
				}
				.date-time{
					display: flex;
					align-items: center;
					margin-left: 50rpx;
					.time{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 40rpx;
						height: 40rpx;
						background-color:#ccc;
						font-size: 24rpx;
						color: #FFFFFF;
						border-radius: 6rpx;
					}
					.da{
						font-size: 34rpx;
						color: #212121;
						margin: 0 6rpx;
					}
				}
			}
			.goods-list{
				display: flex;
				width: 100%;
				height: 220rpx;
				.list{
					width: 50%;
					height: 100%;
					.pictrue{
						width: 100%;
						height: 70%;
						image{
							width: 150rpx;
							height: 150rpx;
						}
					}
					.price{
						display: flex;
						align-items: center;
						width: 100%;
						height: 30%;
						.selling-price{
							font-size: 28rpx;
							font-weight: bold;
							color: $price-clor;
						}
						.original-price{
							font-size: 24rpx;
							text-decoration: line-through;
							color: #bbbaba;
							margin-left: 10rpx;
						}
					}
				}
			}
		}
		.good-choice{
			width: 50%;
			height: 100%;
			.goods-title{
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				height: 80rpx;
				.title{
					display: flex;
					align-items: center;
					text{
						font-size: 28rpx;
						color: #4c4b4b;
					}
				}
				.describe{
					display: flex;
					align-items: center;
					margin-left: 10rpx;
					text{
						font-size: 24rpx;
						color: #979696;
					}
					.num{
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0 6rpx;
						width: 30rpx;
						height: 30rpx;
						background-color: $price-clor;
						color: #FFFFFF;
						border-radius: 6rpx;
					}
				}
			}
			.goods-list{
				display: flex;
				width: 100%;
				height: 220rpx;
				.list{
					width: 50%;
					height: 100%;
					.pictrue{
						width: 100%;
						height: 70%;
						image{
							width: 150rpx;
							height: 150rpx;
						}
					}
					.price{
						display: flex;
						align-items: center;
						width: 100%;
						height: 30%;
						.selling-price{
							font-size: 28rpx;
							font-weight: bold;
							color: $price-clor;
						}
						.original-price{
							font-size: 24rpx;
							text-decoration: line-through;
							color: #bbbaba;
							margin-left: 10rpx;
						}
					}
				}
			}
		}
	}
	/* 今日上新 */
	.new-product{
		padding: 0 25rpx;
		height: 350rpx;
		background:#fff;
		.product-title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 100rpx;
			.title{
				display: flex;
				align-items: center;
				image{
					width: 24rpx;
					height: 32rpx;
				}
				text{
					font-size: 30rpx;
					color: #4c4b4b;
					margin-left: 20rpx;
				}
			}
			.describe{
				display: flex;
				align-items: center;
				text{
					font-size: 26rpx;
					color: #a09f9f;
				}
			}
		}
		.goods-list{
			white-space:nowrap;
			width: 100%;
			height: 220rpx;
			overflow-y: hidden;
			overflow-x: auto;
			padding: 0rpx 30rpx;
			.list{
				display:inline-block;
				width: 25%;
				height: 100%;
				margin-right: 20rpx;
				.pictrue{
					width: 100%;
					height: 70%;
					image{
						width: 150rpx;
						height: 150rpx;
					}
				}
				.price{
					display: flex;
					align-items: center;
					width: 100%;
					height: 30%;
					.selling-price{
						font-size: 28rpx;
						font-weight: bold;
						color: $price-clor;
					}
					.original-price{
						font-size: 24rpx;
						text-decoration: line-through;
						color: #bbbaba;
						margin-left: 10rpx;
					}
				}
			}
		}
		
	}	
</style>