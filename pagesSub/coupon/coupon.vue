<template>
	<view class="page">
		<!-- 优惠券tab -->
		<view class="coupon-tab">
			<view class="tab" :class="{'action':TabShow===0}" @click="onCouponTab(0)">
				<text>未使用</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':TabShow===2}" @click="onCouponTab(2)">
				<text>已过期</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 优惠券列表是否为空 -->
		<shop v-if="!couponList.length">
			<text slot="text-title">优惠券空空如也~</text>
			<text slot="text-two">快去兑换吧，兑换合适您的优惠券。</text>
		</shop>
		<!-- 优惠券列表 -->
		<view class="coupon-list" v-else>
			<view class="list" v-for="(item,index) in couponList" :key="index">
				<view class="list-data" :class="{'coupon-lose':TabShow!=0}">
					<view class="coupon-price">
						<view class="discounts">
							<text class="min">￥</text>
							<text class="max">{{item.price}}</text>
						</view>
						<view class="full-reduction"><text>{{item.title}}</text></view>
						<view class="jag"></view>
					</view>
					<view class="coupon-info">
						<view class="info-title">
							<view class="tag"><text>全场通用</text></view>
						</view>
						<view class="date-get">
							<view class="date"><text>{{dayjsHandel(item.createtimer)}}-{{dayjsHandel(item.losetimer)}}</text></view>
						</view>
						<view class="describe-title" @click="isDes=!isDes">
							<text class="iconfont icon-more more" :style="isDes?'transform: rotate(-90deg);':'transform: rotate(90deg);'"></text>
						</view>
					</view>
				</view>
				<view class="use-status" v-if="TabShow != 0">
					<text v-if="TabShow === 1">已使用</text>
					<text v-else-if="TabShow === 2">已过期</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { couponAll } from '@/api/users/user.js';
	import { getCode } from '@/utlis/getToken.js';
	import shop from '@/components/my-components/shop/shop.vue';
	import dayjs from 'dayjs';
	export default {
		components: {
			shop
		},
		data() {
			return {
				TabShow: 0,
				isDes: false,
				couponList: [], // 优惠券列表
				couponListAll: [], // 全部优惠券列表
			};
		},
		onShow() {
			console.log(dayjs);
			getCode().then(res => {
				couponAll(res.token).then(response => {
					this.couponListAll =  response[1].data.data;
					let arr = response[1].data.data;
					for (let i of arr) {
						if (new Date().getTime() < i.losetimer) {
							this.couponList.push(i);
						}
					}
				})
			})
		},
		methods:{
			// 时间格式化
			dayjsHandel(date) {
				return dayjs(date).format('YYYY-MM-DD');
			},
			/**
			 * 优惠券tab点击
			 * @param {Number} type
			 */
			onCouponTab(type){
				this.TabShow = type;
				if (type == 0) {
					this.couponList = [];
					for (let i of this.couponListAll) {
						if (new Date().getTime() < i.losetimer) {
							this.couponList.push(i);
						}
					}
					console.log(this.couponList)
				}
				if (type == 2) {
					this.couponList = [];
					for (let j of this.couponListAll) {
						if (new Date().getTime() > j.losetimer) {
							this.couponList.push(j);
						}
					}
					console.log(this.couponList)
				}
			}
		}
	};
</script>

<style scoped lang="scss">
@import 'MyCoupon.scss';
</style>
