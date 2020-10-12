<template>
	<view class="page">
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="integral-balance">
				<view class="integral">
					<text>当前可用积分</text>
					<text class="number">{{integral}}</text>
				</view>
			</view>
			<view class="bg">
				<image src="/static/imags/integral_bg1.png" mode=""></image>
			</view>
		</view>
		<!-- 优惠券兑换专区 -->
		<view class="coupon-exchange">
			<view class="exchange-title">
				<view class="title">优惠券兑换</view>
			</view>
			<view class="coupon-list">
				<view class="list" v-for="(item,index) in couponList"
					:key="index" @tap="onIntegral(item, index)">
					<view class="thumb">
						<image src="/static/imags/Discount.png" mode=""></image>
					</view>
					<view class="title">{{item.title}}</view>
					<view class="integral">{{item.Preferential}}积分</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { exchangeCoupon, exchange, getUserInfo } from '@/api/users/user.js';
	import { getCode } from '@/utlis/getToken.js';
	export default {
		data() {
			return {
				couponList: [], // 可兑换的积分
				token: '', // token
				integral: 0, // 总积分
			};
		},
		onShow() {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success(res) {
					that.integral = res.data.data.integral
				}
			})
			getCode().then(res => {
				this.token = res.token;
			})
			exchangeCoupon().then(res => {
				this.couponList = res[1].data;
			})
		},
		methods:{
			/**
			 * 积分点击
			 */
			onIntegral(item, index) {
				exchange({
					_id: item._id
				}, this.token).then(res => {
					let code = res[1].data.code
					if (code == 204) {
						this.toast('兑换成功');
						this.getUser();
					} else if (code == 414) {
						this.toast('暂无次优惠券，不能兑换','none');
					} else if (code == 517) {
						this.toast('积分不足无法兑换','none');
					}
				})
			},
			// 封装弹框
			toast(title, icon) {
				uni.showToast({
					title: title,
					icon
				})
				setTimeout(()=>{
					uni.hideToast();
				},1500)
			},
			getUser() {
				getUserInfo(this.token).then((res)=>{
					let resData = res[1].data;
					if (resData.code === 204) {
						uni.setStorage({
							key: 'userInfo',
							data: res[1].data
						})
						this.integral = res[1].data.data.integral;
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './IntegralDetails.scss';
</style>
