<template>
	<view class="page">
		<!-- 地址 -->
		<view class="address-data">
			<view class="address-list" @click="onSkip" v-if="address.province != undefined">
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
				<view class="list" @click="onSkip">
					<text class="tips">(如果快递不方便接收，您可以选择暂时寄存服务)</text>
				</view>
			</view>
			<view>
				<text>您该没添加地址哦~ 快去添加吧</text>
			</view>
		</view>
		<!-- 商品 -->
		<view class="goods-data">
			<view class="goods-title">
				<text>商品信息</text>
			</view>
			<view class="goods-list">
				<view class="list" v-for="(item, index) in goodList" :key="index">
					<view class="thumb">
						<image :src="JSON.parse(item.parameter)[0].content[specificationArr[index]]" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="name one-omit">{{item.title}}</text>
							<text class="attr">{{productParametersArr[index]}}</text>
						</view>
						<view class="price-number">
							<view class="price">
								<text class="min">￥</text>
								<text class="max">{{item.price}}</text>
							</view>
							<view class="number">
								<text>x {{productsNumArr[index]}}</text>
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
						<input placeholder="选填,建议先和商家沟通确认" v-model="postScript" />
					</view>
				</div>
			</view>
		</view>
		<!-- 优惠 -->
		<view class="discounts-data">
			<view class="discounts">
				<div class="list">
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
						<text>￥{{priceAll}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 地址提示 -->
		<view class="address-tips" :style="scrollTop >= 100 ? '':'display:none'">
			<text>{{address.province + address.city + address.area + address.address}}</text>
		</view>
		<!-- 底部合计提交 -->
		<view class="footer-submit">
			<view class="price">
				<text class="min">￥</text>
				<text class="max">{{priceAll}}</text>
			</view>
			<view class="submit" @click="onSubmit">
				<text>提交订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { addOrder } from '@/api/shops/order.js';
	import { getAddress } from '@/api/users/address.js';
	import { getGood } from '@/api/shops/shops.js';
	export default {
		data() {
			return {
				scrollTop: 0,
				address: null, // 地址
				postScript: '',// 用户的备注
				address_id: 0, // 收货地址的索引
				conpon: 0, // 优惠券的索引
				token: '' ,// 用户token
				shopIdList: [], // 商品ID和收藏 数组
				productsNumArr: [], // 商品数量的数组
				productParametersArr: [], // 商品参数的数组
				priceAll: '', // 总价格
				goodList: [], // 商品列表
				specificationArr: [], // 商品参数索引的数组
				deleteShopList: [], // 生成订单后清空购物车的数组
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad({ detail }) {
			let detailAll = JSON.parse(detail);
			this.shopIdList = detailAll.shopIdList;
			this.productsNumArr = detailAll.productsNumArr;
			this.productParametersArr = detailAll.productParametersArr;
			this.priceAll = detailAll.priceAll;
			this.specificationArr = detailAll.specificationArr;
			this.deleteShopList = detailAll.deleteShopList;
			for (let i of this.shopIdList) {
				getGood({
					id: i
				}).then(res => {
					this.goodList.push(res[1].data.data[0])
				})
			}
		},
		created() {
			this.getAddress()
		},
		onShow() {
			// 获取从地址页面获取的地址信息
			uni.getStorage({
				key: 'addressItem',
				success: res => {
					this.address = JSON.parse(res.data);
				}
			})
			// 获取从地址页面获取的地址索引位
			uni.getStorage({
				key: 'addressIndex',
				success: res => {
					this.address_id = res.data;
				}
			})
			// 获取用户token
			uni.getStorage({
				key: 'token',
				success: res => {
					this.token = res.data;
				}
			})
		},
		methods: {
			/**
			 * 提交订单
			 */
			onSubmit() {
				if (this.address.tel) {
					addOrder({
						goodsid: JSON.stringify(this.shopIdList),
						num: JSON.stringify(this.productsNumArr),
						postscript: this.postScript,
						address: JSON.stringify(this.address),
						coupon: JSON.stringify(null),
						parameter: JSON.stringify(this.productParametersArr),
						all_price: this.priceAll,
						detail_id: JSON.stringify(this.deleteShopList)
					}, this.token).then(res=>{
						if (res[1].data.code == 204) {
							uni.redirectTo({
								url: '../CashierDesk/CashierDesk?orderId='+res[1].data.data.indent_collection+'&priceAll='+this.priceAll,
							})
						} else {
							uni.showToast({
								title: '系统繁忙'
							})
							setTimeout(()=>{
								uni.hideToast();
							},1500)
						}
					}).catch(err => err)
				}
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
	}
</script>

<style scoped lang="scss">
	@import 'ConfirmOrder.scss';
</style>
