<template>
	<view class="page">
		<!-- 地址 -->
		<view class="address-data">
			<view class="address-list" @click="onSkip">
				<view class="list">
					<text>{{address.province + address.city + address.area}}</text>
				</view>
				<view class="list">
					<text class="address">{{address.address}}</text>
				</view>
				<view class="list">
					<text>{{address.recipients}}</text>
					<text>{{address.tel}}</text>
				</view>
				<view class="list">
					<text class="tips">(如果快递不方便接收，您可以选择暂时寄存服务)</text>
				</view>
			</view>
		</view>
		<!-- 商品 -->
		<view class="goods-data">
			<view class="goods-title">
				<text>商品信息</text>
			</view>
			<view class="goods-list">
				<view class="list">
					<view class="thumb">
						<image :src="imgUrl" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="name one-omit">{{detail.title}}</text>
							<text class="attr">{{specification}}</text>
						</view>
						<view class="price-number">
							<view class="price">
								<text class="min">￥</text>
								<text class="max">{{detail.price}}</text>
							</view>
							<view class="number">
								<text>x {{quantity}}</text>
							</view>
						</view>
						<view class="tag">
							<text>支持七天无理由退货</text>
						</view>
					</view>
				</view>
			</view>
			<view class="delivery">
				<div class="list">
					<view class="title">留言</view>
					<view class="content">
						<input placeholder="选填,建议先和商家沟通确认" />
					</view>
				</div>
			</view>
		</view>
		<!-- 优惠 -->
		<view class="discounts-data">
			<view class="discounts">
				<div class="list" @click="$refs['UseCoupon'].show()">
					<view class="title">优惠券</view>
					<view class="content">
						<text>无可用</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div>
				<div class="list">
					<view class="title">积分</view>
					<view class="content">
						<text>共300，满1000可用</text>
					</view>
				</div>
			</view>
		</view>
		<!-- 订单金额 -->
		<view class="order-price">
			<view class="price-list">
				<view class="list">
					<view class="title">
						<text>商品金额</text>
					</view>
					<view class="price">
						<text>￥{{detail.price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 地址提示 -->
		<view class="address-tips" :style="scrollTop >= 100 ? '':'display:none'">
			<text>黑龙江哈尔滨市道里区爱建路1333号</text>
		</view>
		<!-- 底部合计提交 -->
		<view class="footer-submit">
			<view class="price">
				<text class="min">￥</text>
				<text class="max">{{detail.price}}</text>
			</view>
			<view class="submit" @click="onSubmit">
				<text>提交订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getAddress } from '../../api/users/address.js';
	export default {
		data() {
			return {
				scrollTop: 0,
				address: null, // 地址
				detail: null, // 商品信息
				specification: null, // 规格
				quantity: null ,// 数量
				imgUrl: ''
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			/**
			 * 提交订单
			 */
			onSubmit() {
				// uni.redirectTo({
				// 	url: '/pages/CashierDesk/CashierDesk',
				// })
			},
			/**
			 * 跳转点击
			 * @param {String} type 跳转类型
			 */
			onSkip() {
				uni.navigateTo({
					// 参数加id=1是因为要判断是否是订单页点击的
					url: '../address/address?id=1'
				})
			},
			// 获取地址列表
			getAddress() {
				let that = this;
				uni.getStorage({
					key: 'token',
					success(res) {
						getAddress(res.data).then(res=>{
							that.address = res[1].data.data[0];
						}).catch(err=>{
							console.log(err)
						})
					}
				});
			}
		},
		onLoad({detail,imgUrl}) {
			this.detail = JSON.parse(detail).id;
			this.quantity = JSON.parse(detail).quantity;
			this.specification = JSON.parse(detail).specification;
			this.imgUrl = imgUrl;
		},
		created() {
			this.getAddress()
		}
	}
</script>

<style scoped lang="scss">
	@import 'ConfirmOrder.scss';
</style>
