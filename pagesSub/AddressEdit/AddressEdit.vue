<template>
	<view class="page">
		<view class="address-input">
			<view class="list-input">
				<view class="title">
					<text>收货人</text>
				</view>
				<view class="content">
					<input type="text" placeholder="请填写收货人姓名">
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>手机号</text>
				</view>
				<view class="content">
					<input type="tel" placeholder="请填写收货人手机号">
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>所在地区</text>
				</view>
				<view class="content">
					<input type="tel" placeholder="省市区县/乡镇等">
				</view>
			</view>
			<view class="list-textarea">
				<view class="title">
					<text>详细地址</text>
				</view>
				<view class="content">
					<textarea type="tel" placeholder="街道/楼牌号等" />
				</view>
			</view>
		</view>
		<view class="tag-default">
			<view class="tag-list">
				<view class="title">
					<text>标签</text>
				</view>
				<view class="content">
					<view class="list action">
						<text>家</text>
					</view>
					<view class="list">
						<text>公司</text>
					</view>
					<view class="list">
						<text>学校</text>
					</view>
				</view>
			</view>
			<view class="default-address">
				<view class="title">
					<text>默认地址</text>
				</view>
				<view class="switch-default">
					<switch class="red sm" color="#0077EE !important" checked></switch>
				</view>
			</view>
		</view>
		<view class="footer-btn">
			<view class="btn">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressType: '2',
			};
		},
		onLoad(params) {
			this.addressType = params.type||'2';
			uni.setNavigationBarTitle({
				title: this.addressType === '1' ? '编辑收货地址':'新建收货地址'
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
	
	
	.address-input{
		width: 100%;
		background-color: #FFFFFF;
		.list-input{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 100rpx;
			border-bottom: 2rpx solid #f6f6f6;
			.title{
				display: flex;
				align-items: center;
				width: 20%;
				height: 100%;
				text{
					color: #222222;
					font-size: 26rpx;
				}
			}
			.content{
				display: flex;
				align-items: center;
				width: 70%;
				height: 100%;
				input{
					width: 100%;
					height: 100%;
					font-size: 26rpx;
					color: #222222;
				}
			}
		}
		.list-textarea{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 200rpx;
			border-bottom: 2rpx solid #f6f6f6;
			.title{
				display: flex;
				width: 20%;
				height: 80%;
				text{
					color: #222222;
					font-size: 26rpx;
				}
			}
			.content{
				display: flex;
				align-items: center;
				width: 70%;
				height: 100%;
				textarea{
					width: 100%;
					height: 80%;
					font-size: 26rpx;
					color: #222222;
				}
			}
		}
	}
	
	.tag-default{
		width: 100%;
		border-top: 20rpx solid #f6f6f6;
		.tag-list{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 200rpx;
			.title{
				width: 20%;
				height: 80%;
				text{
					font-size: 26rpx;
					color: #222222;
				}
			}
			.content{
				display: flex;
				width: 70%;
				height: 80%;
				.list{
					display: flex;
					align-items: center;
					justify-content: center;
					min-width: 120rpx;
					height: 60rpx;
					border: 2rpx solid #f6f6f6;
					border-radius: 60rpx;
					margin-right: 20rpx;
					text{
						color: #555555;
						font-size: 24rpx;
					}
				}
				.action{
					background-color: $base;
					border: 2rpx solid $base;
					text{
						color: #FFFFFF;
					}
				}
			}
		}
		.default-address{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 4%;
			height: 100rpx;
			.title{
				display: flex;
				align-items: center;
				width: 20%;
				height: 80%;
			}
			.switch-default{
				uni-switch .uni-switch-input{
					background: #22AA44 !important;
				}
			}
		}
	}
	
	.footer-btn{
		position: fixed;
		left: 0;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
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
