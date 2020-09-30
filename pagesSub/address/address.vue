[[]]<template>
	<view class="page">
		<!-- 地址列表 -->
		<view class="address-list">
			<view class="list" v-for="(item,index) in addressList" :key="index" v-show="addressList.length > 0" @tap="getAddress(item)">
				<view class="name-phone">
					<view class="name">
						<text class="one-omit">{{item.recipients}}</text>
					</view>
					<view class="phone">
						<text>{{item.tel}}</text>
					</view>
				</view>
				<view class="address-edit">
					<view class="address">
						<text>{{item.province + item.city + item.area}}</text>
					</view>
					<view class="edit" @tap.stop="onAddressEdit(index,item)">
						<image src="../../static/imags/modify.png" class="modify"></image>
					</view>
				</view>
			</view>
			<view class="addresslistAir" v-show="addressList.length === 0">
				<image src="../../static/imags/address.png" class="AirImg margin"></image>
				<view class="text">
					<text>还没有地址哦~</text>
					<text>添加地址后买买买吧</text>
				</view>
			</view>
		</view>
		<!-- 添加地址 -->
		<view class="add-address">
			<view class="btn" @tap="addAddress">
				<text>新建收货地址</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getAddress } from '../../api/users/address.js';
	export default {
		data() {
			return {
				addressList: null,
				id: ''
			};
		},
		methods:{
			/**
			 * 编辑地址点击
			 */
			onAddressEdit(index,item){ 
				item = JSON.stringify(item);
				uni.navigateTo({
					url: `../AddressEdit/AddressEdit?index=${index}&type=1&address=${item}`,
				})
			},
			// 新增地址
			addAddress() {
				uni.navigateTo({
					url: `../AddressEdit/AddressEdit?type=2`
				})
			},
			getAddress(item) {
				if (this.id === '1') {
					uni.redirectTo({
						url: '../ConfirmOrder/ConfirmOrder?item=' + JSON.stringify(item)
					})
				} else {
					return false;
				}
			}
		},
		onLoad({id}) {
			this.id = id;
		},
		onShow() {
			let that = this;
			uni.getStorage({
				key: 'token',
				success(res) {
					getAddress(res.data).then((res)=>{
						that.addressList = res[1].data.data;
						console.log(res[1].data.data)
					})
				}
			})
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
		.addresslistAir{
			position:fixed;
			left:50%;
			top:50%;
			transform:translate(-50%,-50%);
			.AirImg{
				width:120rpx;
				height:120rpx;
				display:block;
				margin-bottom:20rpx;
			}
			text{
				display:block;
				text-align:center;
				padding:20rpx 0rpx;
			}
		}
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
					justify-content: center;
					width: 10%;
					height: 100%;
					text{
						font-size: 38rpx;
						color: #555555;
					}
					.modify{
						width:40rpx;
						height:40rpx;
						display:block;
						
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
