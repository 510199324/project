<template>
	<view class="page">
		<!-- 订单状态 -->
		<view class="order-status">
			<view class="status">
				<text class="iconfont icon-zhuyi"></text>
				<text>{{order.orderstatus}}</text>
			</view>
			<view class="reason">
				<text>剩余12分68秒</text>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="shipping-address">
			<view class="name-phone">
				<text class="iconfont icon-dingwei"></text>
				<text>{{address.recipients}}</text>
				<text>{{address.tel}}</text>
			</view>
			<view class="address">
				<text>{{address.province + address.city + address.area + address.address}}</text>
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="order-goods">
			<view class="goods-list">
				<view class="list">
					<view class="thumb">
						<image :src="imgUrl" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="one-omit">{{title}}</text>
						</view>
						<view class="num-size">
							<text>数量：{{order.num}}</text>
							<text>{{order.parameter}}</text>
						</view>
						<view class="price">
							<text>￥ {{price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="contact">
				<button type="default" open-type="contact" style="background:#fff;font-size:28rpx;">联系客服</button>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="info-list">
				<view class="list">
					<view class="title">订单编号:</view>
					<view class="content">
						<text>{{order.detailid}}</text>
						<text class="btn" @tap="copy(order.detailid)">复制</text>
					</view>
				</view>
				<view class="list">
					<view class="title">下单时间:</view>
					<view class="content"> 
						<text>{{day(order.create_time)}}</text>
					</view>
				</view>
				<view class="list">
					<view class="title">支付方式:</view>
					<view class="content">
						<text>在线支付</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单明细 -->
		<view class="order-details">
			<view class="details-list">
				<view class="list">
					<view class="title">
						<text>商品总额</text>
					</view>
					<view class="price">
						<text>￥{{price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="footer-btn">
			<view class="del" @tap="deleteOrder()">
				<text>删除订单</text>
			</view>
			<view class="btn">
				<text class="action">确认付款</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { refund } from '@/api/shops/order.js';
	import dayJs from 'dayjs';
	import { getCode } from '@/utlis/getToken.js';
	export default {
		data() {
			return {
				order: {}, // 订单列表的对象
				title: '', // 商品名字
				price: '', // 商品价格
				imgUrl: '', // 商品参数图 
				address: {}, // 地址对象
				token: '', // token 用来取消订单
			};
		},
		onLoad(options) {
			let detail = JSON.parse(options.detail);
			this.title = detail.title;
			this.order = detail.order;
			this.price = detail.price;
			this.imgUrl = options.imgUrl;
			this.address = JSON.parse(JSON.parse(this.order.address));
		},
		onShow() {
			getCode().then(res => {
				this.token = res.token;
			}) 
		},
		methods:{
			// 复制订单编号
			copy(item) {
				uni.setClipboardData({
					data: item
				})
			},
			// 时间格式胡
			day(item) {
				return dayJs(Number(item)).format('YYYY-MM-DD HH:mm:ss');
			},
			// 删除订单
			deleteOrder() {
				refund({
					detailid: this.order.detailid
				}, this.token).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './orderDeteils.scss';
</style>
