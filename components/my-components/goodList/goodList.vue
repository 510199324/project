<template>
	<view class="goodList">
		<view class="flex wrap">
			<view class="'good-list flex-shrink margin-top" v-for="(item, index) in goodShopList" :key="index">
				<navigator hover-class="none" :url="src + item.type_one + '&id=' + item.id">
					<image class="images" :src="JSON.parse(item.img_list)[0]"></image>
					<text class="title">{{item.title}}</text>
					<view class="flex-between money">
						<text class="price">￥{{item.price}}</text>
						<view class="shop">
							<image src="/static/imags/shop.png" class="shopImg"></image>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodShopList: {
				type: Array,
				default: []
			},
			src: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
	.goodList{
		width:100%;
		font-size:20rpx;
	}
	.images{
		width:150rpx;
		height:150rpx;
		display:block;
		margin:0 auto;
		margin-top:30rpx;
	}
	.good-list{
		width:40%;
		height:300rpx;
		background:#fff;
		margin:0rpx 15rpx 15rpx 15rpx;
		border-radius:15rpx;
	}
	.wrap{
		flex-wrap:wrap;
		justify-content:center;
	}
	.title{
		display:block;
		margin-top:15rpx;
		margin-left:15rpx;
	}
	.price{
		align-self:center;
		font-weight:700;
	}
	.shop>.shopImg{
		width:50rpx;
		height:50rpx;
		display:block;
		margin-right:5rpx;
	}
	.shop{
		border-radius:50%;
		background:#28D8B4;
	}
	.money{
		margin:0rpx 15rpx;
	}
</style>