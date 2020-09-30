<template>
	<view class="cu-modal bottom-modal" :class="{'show':isShow}">
	  <view class="cu-dialog">
			<view class="goods-data">
				<view class="thumb">
					<image :src="detail.content[0]" mode=""></image>
				</view>
				<view class="item">
					<view class="title">
						<text></text>
					</view>
					<view class="price">
						<text class="min">￥</text>
						<text class="max">{{price}}</text>
					</view>
				</view>
			</view>
			<view class="attr-size">
				<view class="attr-list">
					<view v-if="detail.title == '颜色'">
						<view class="title">
							<text>颜色</text>
						</view>
						<view class="size-list">
							<view class="list" v-for="(value,idx) in detail.name" :key="idx" @tap="attrItem(value, idx)">
								<text>{{value}}</text>
							</view>
						</view>
					</view>
					<view v-if="detail.title == '尺寸'">
						<view class="title">
							<text>尺寸</text>
						</view>
						<view class="size-list">
							<view class="list" v-for="(value,idx) in detail.name" :key="idx" @tap="attrItem(value, idx)">
								<text>{{value}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="attr-number">
					<view class="tit">购买数量</view>
					<view class="numberOne">
						<text class="icon" @tap="countDn" style="padding-left:20rpx;padding-right:20rpx;">-</text>
						<text class="count">{{count}}</text>
						<text class="icon" @tap="countUp">+</text>
					</view>
				</view>
			</view>
			<view class="attr-btn">
				<view class="add-buy" @tap="confirm">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				AttrIndex: 0,
				SizeIndex: 0,
				BuyType: 0,
				count: 1
			}
		},
		props: {
			detail: {
				type: Object,
				default: {}
			},
			price: {
				type: String,
				default: ''
			}
		},
		methods:{
			attrItem(value, index) {
				this.$emit('onattr',{
					parameter: value,
					index
				})
				this.AttrIndex = index;
			},
			countUp() {
				this.count ++;
				this.$emit('oncount',{
					count: this.count
				})
			},
			countDn() {
				if (this.count == 0) {
					this.count = 0;
				} else {
					this.count --;
					this.$emit('oncount',{
						count: this.count
					})
				}
			},
			confirm() {
				this.$emit('confirm')
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'GoodsAttr.scss';
</style>
