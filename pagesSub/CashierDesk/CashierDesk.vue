<template>
	<view class="page">
		<view class="price-count-down">
			<view class="price">
				<text class="min">￥</text>
				<text class="max">{{priceAll}}</text>
			</view>
			<view class="count-down">
				<view class="title">支付剩余时间</view>
				<view class="count">
					<text class="time">{{min}}</text>
					<text class="dot">:</text>
					<text class="time">{{sec}}</text>
				</view>
			</view>
		</view> 
		<!-- 支付方式列表 -->
		<view class="pay-way">
			<view class="pay-list">
				<view class="list" v-for="(item,index) in PayList" 
				@click="onPayWay(item,index)"
				:key="index">
					<view class="pay-type">
						<image :src="item.icon" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pay-submit">
			<view class="submit" @click="onSubmit">{{PayPirce}}</view>
		</view>
	</view>
</template>

<script>
	import { payOrder } from '@/api/shops/order.js';
	import { getCode } from '@/utlis/getToken.js';
	export default {
		data() {
			return {
				PayList: [
					{
						icon: '/static/icon/login-wx.png',
						name: '微信支付',
					},{
						icon: '/static/icon/alipay.png',
						name: '支付宝支付',
					}
				],
				PayWay: 0,
				PayPirce: '',
				CountDown: 900,
				min: 0,
				sec: 0,
				priceAll: '', // 总价钱
				orderId: null, // 订单编号
				token: '', // 用户token
			};
		},
		onLoad(options){
			if (typeof options.orderId == 'string') {
				this.orderId = [options.orderId];
			} else {
				this.orderId = options.orderId;
			}
			this.priceAll = options.priceAll;
			this.PayPirce = `${this.PayList[1].name}￥${this.priceAll}`;
			this.CountDownData();
		},
		onShow() {
			getCode().then(res => {
				this.token = res.token;
			})
		},
		methods:{
			/**
			 * 支付方式切换点击
			 */
			onPayWay(item,index){
				this.PayWay = index;
				this.PayPirce = `${item.name}￥${this.priceAll}`
			},
			/**
			 * 倒计时
			 */
			CountDownData(){
				setTimeout(() =>{
					this.CountDown--;
					this.min = parseInt(this.CountDown / 60 % 60);
					this.sec = parseInt(this.CountDown % 60);
					if(this.CountDown <= 0){
						return
					}
					this.CountDownData();
				},1000)
			},
			/**
			 * 支付点击
			 */
			onSubmit(){
				payOrder({
					indent_collection: JSON.stringify(this.orderId)
				}, this.token).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'CashierDesk.scss';
</style>
