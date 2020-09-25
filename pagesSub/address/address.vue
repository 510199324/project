<template>
	<view class="page">
		<!-- 地址列表 -->
		<view class="address-list">
			<view class="list" v-for="(item,index) in 4" :key="index">
				<view class="name-phone">
					<view class="name">
						<text class="one-omit">哇哈哈</text>
					</view>
					<view class="phone">
						<text>188****8888</text>
						<text class="tag">默认</text>
						<text class="tag blue">公司</text>
					</view>
				</view>
				<view class="address-edit">
					<view class="address">
						<text>黑龙江哈尔滨市道里区爱建路你猜楼5号886室</text>
					</view>
					<view class="edit" @click.stop="onAddressEdit(1)">
						<text class="iconfont icon-edit1"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 添加地址 -->
		<view class="add-address">
			<view class="btn" @click="onAddressEdit(2)">
				<text>新建收货地址</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			/**
			 * 编辑地址点击
			 */
			onAddressEdit(type){
				uni.navigateTo({
					url: '/pages/AddressEdit/AddressEdit?type=' + type,
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	
	/* 地址列表 */
	.address-list{
		width: 100%;
		background-color: #FFFFFF;
		padding-bottom: 120rpx;
		.list{
			padding: 0 4%;
			height: 160rpx;
			border-bottom: 2rpx solid #f6f6f6;
			.name-phone{
				display: flex;
				align-items: center;
				width: 100%;
				height: 80rpx;
				.name{
					display: flex;
					align-items: center;
					width: 30%;
					height: 100%;
					text{
						width: 100%;
						font-size: 26rpx;
						font-weight: bold;
						color: #222222;
					}
				}
				.phone{
					display: flex;
					align-items: center;
					width: 70%;
					height: 100%;
					text{
						font-size: 28rpx;
						font-weight: bold;
						color: #222222;
					}
					.tag{
						padding: 4rpx 8rpx;
						font-size: 24rpx;
						color: #FFFFFF;
						background-color: $base;
						border-radius: 4rpx;
						margin-left: 20rpx;
					}
					.blue{
						background-color: #0099FF;
					}
				}
			}
			.address-edit{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 60rpx;
				.address{
					display: flex;
					align-items: center;
					width: 90%;
					height: 100%;
					text{
						font-size: 26rpx;
						color: #959595;
					}
				}
				.edit{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					width: 10%;
					height: 100%;
					text{
						font-size: 38rpx;
						color: #555555;
					}
				}
			}
		}
	}
	
	/* 添加地址 */
	.add-address{
		position: fixed;
		left: 0;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80%;
			height: 70rpx;
			background: linear-gradient(to right,$base,$change-clor);
			border-radius: 70rpx;
			box-shadow: 0 10rpx 10rpx $base;
			text{
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
