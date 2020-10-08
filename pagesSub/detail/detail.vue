<template>
	<view class="detail">
		<!--  -->
		<view class="detailHome">
			<view class="swiper">
				<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="400" class="swiperCom" @change="change">
					<view class="detailSwiper" v-for="(item, index) in detailList.img_list.split(',')" :key="index">
						<swiper-item>
							<image :src="item" mode="widthFix" class="deteilImg" @tap="previewImage(index)"></image>
						</swiper-item>
					</view>
				</swiper>
				<text class="number">{{detailList.img_list.split(',').length}}/{{index}}</text>
			</view>
			<view class="detailText">
				<view class="flex-between">
					<text class="title">{{detailList.title}}</text>
					<text class="typeTwo">{{detailList.type_two}}</text>
				</view>
				<view class="money">
					<text class="gold">￥</text>
					<text class="price">{{detailList.price}}</text>
				</view>
				<text class="introduce">{{detailList.introduce}}</text>
			</view>
			<view class="detailList">
				<text class="like">猜你喜欢</text>
				<goodList :goodShopList="goodShopList" :src="'../../pagesSub/detail/detail?type_one='" />
			</view>
		</view>
		<!--  -->
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" class="goods"/>
		<view class="backFather" v-show="hide">
			<view class="back" @tap="hideAlert"></view>
			<good-attr class="fixed" :detail="detail" :price="price" @oncount="count" @onattr="attr" @confirm="confirm"></good-attr>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
	import goodList from '@/components/my-components/goodList/goodList.vue';
	import { getGood, getTypeOne } from '@/api/shops/shops.js';
	import goodAttr from '@/components/my-components/GoodsAttr/GoodsAttr.vue';
	import { addShop } from '@/api/users/user.js';
	export default {
		components: {
			uniGoodsNav,
			goodList,
			goodAttr
		},
		data () {
		    return {
				goodShopList: null,
				index: 1,
		        options: [{
		            icon: 'headphones',
		            text: '客服'
		        }, {
		            icon: 'cart',
		            text: '购物车',
		            info: ''
		        }],
		        buttonGroup: [{
					 text: '加入购物车',
					 backgroundColor: '#39B0AE',
					 color: '#fff'
		        },
		        {
					 text: '立即购买',
					 backgroundColor: '#fff',
					 color: '#39B0AE',
					 radius: '0 100px 100px 0',
					 border: '1px solid #39B0AE'
					 
		        }],
				detailList: null,  // 商品详情
				hide: false,  // 控制添加购物车和购买的框显示和隐藏
				price: '', // 子组件的价格
				detail: null, // 子组件的详情
				specification: '', // 尺寸或者颜色
				quantity: 1, // 购买或者购物车数量
				confirmText: '', // 点击购物车或者立即购买的提示
				imgIndex: 0,
				token: '' // 用户token
		    }
		},
		onLoad({id, type_one}) {
			let arr = [getGood({
				id
			}),getTypeOne({
				type_one
			})];
			Promise.all(arr).then(res=>{
				this.detailList = res[0][1].data.data[0];
				this.price = this.detailList.price;
				if (this.detailList.parameter == '') {
					this.detail = '';
				} else if (Array.isArray(JSON.parse(this.detailList.parameter))) {
					this.detail = JSON.parse(this.detailList.parameter)[0];
				} else if (!Array.isArray(JSON.parse(this.detailList.parameter))) {
					this.detail = JSON.parse(this.detailList.parameter);
				}
				this.goodShopList = res[1][1].data.data;
				this.$nextTick(()=>{
					uni.hideLoading()
				})
			}).catch(err=>{
				console.log(err)
			});
		},
		methods: {
			attr(data) {
				let { parameter, index } = data;
				this.specification = parameter;
				this.imgIndex = index;
			},
			count(data) {
				let { count } = data;
				this.quantity = count;
			},
			onClick(e) {
				
			}, 
			buttonClick(e) {
				this.hide = true;
				this.confirmText = e.content.text;
			},
			confirm() {
				if (this.confirmText == '加入购物车') {
					if (this.specification === '' || this.quantity === 0) {
						uni.showToast({
							title: '请选择规格',
							icon: 'none'
						});
						setTimeout(()=>{
							uni.hideToast();
						},1500)
					} else {
						let that = this;
						uni.getStorage({
							key: 'token',
							success(res) {
								addShop({
									id: that.detailList.id,
									num: that.quantity,
									parameter_index: that.imgIndex,
									parameter: that.detailList.parameter,
									price: that.detailList.price,
									title: that.detailList.title
								},res.data).then(res => {
									console.log(res)
									if (res[1].data.code == 204) {
										uni.showToast({
											title: '添加成功'
										})
										that.hide = false;
										setTimeout(() => {
											uni.hideToast();
										}, 1500)
									}
								}).catch(err => {
									console.log(err);
								})
							}
						})
					}
				}
				if (this.confirmText == '立即购买') {
					if (this.specification === '' || this.quantity === 0) {
						uni.showToast({
							title: '请选择规格',
							icon: 'none'
						});
						setTimeout(()=>{
							uni.hideToast();
						},1500)
					} else {
						uni.redirectTo({
							url: '../ConfirmOrder/ConfirmOrder?detail='+JSON.stringify({
								specification: this.specification,
								quantity: this.quantity,
								detail: {
									title: this.detailList.title,
									price: this.detailList.price,
									id: this.detailList.id
								}
							}) + '&imgUrl=' + JSON.parse(this.detailList.parameter).content[this.imgIndex]
						})
					}
				}
			},
			change(e) {
				this.index = e.detail.current + 1;
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.detailList.img_list.split(','),
					current: index
				})
			},
			hideAlert() {
				this.hide = false;
			}
		},
		onShow() {
			uni.showLoading({
				mask: true
			})
		}
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
	}
	.detail{
		width:100%;
		height:100%;
	}
	.backFather{
		width:100%;
		height:100%;
	}
	.back{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.3);
		position:fixed;
		top:0;
		left:0;
	}
	.goods{
		position:fixed;
		bottom:0rpx;
		left:0rpx;
		width:100%;
	}
	.detailText{
		background:#f8f8f8;
		font-size:22rpx;
		margin:20rpx;
		padding:20rpx;
		border-radius:15rpx;
	}
	.price{
		font-size:30rpx;
		color:#f40;
	}
	.gold{
		color:#f40;
	}
	.money{
		padding:20rpx 0rpx;
	}
	.deteilImg{
		width:100%;
	}
	.swiperCom{
		height:700rpx;
	}
	.swiper{
		position:relative;
	}
	.number{
		position:absolute;
		bottom:30rpx;
		right:30rpx;
		font-size:30rpx;
		font-weight:600;
		border:1px solid #000;
		border-radius:30rpx;
		padding:10rpx;
	}
	.typeTwo{
		color:#ccc;
	}
	.like{
		font-size:40rpx;
		font-weight:700;
		padding:20rpx;
	}
	.fixed{
		position:fixed;
		bottom:0rpx;
		left:0rpx;
		width:100%;
		z-index:8888;
	}
</style>
