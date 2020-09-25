<template>
	<view class="page">
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="head-user">
				<view class="user">
					<image src="/static/img/user_pic.jpg" mode=""></image>
					<text>爱跳舞的汤姆</text>
				</view>
				<view class="exchange" @click="onExchangeRecord">
					<text>兑换记录</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="integral-balance">
				<view class="integral" @click="onIntegral">
					<text>当前可用积分</text>
					<text class="number">10000</text>
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
				<view class="list" v-for="(item,index) in 6"
					:key="index">
					<view class="thumb">
						<image src="" mode=""></image>
					</view>
					<view class="title">10元直减优惠券</view>
					<view class="integral">1000积分</view>
				</view>
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
			 * 兑换记录
			 */
			onExchangeRecord(){
				uni.navigateTo({
					url:'../ExchangeRecord/ExchangeRecord'
				})
			},
			/**
			 * 积分点击
			 */
			onIntegral(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './IntegralDetails.scss';
</style>
