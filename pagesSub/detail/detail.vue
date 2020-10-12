<template>
	<view class="detail">
		<!-- detail主体 -->
		<view class="detailHome">
			<view class="swiper">
				<!-- 图片预览 -->
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
		<!-- 加入购物车和立即购买 -->
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" class="goods"/>
		<!-- 选择参数的弹框 -->
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
	import { addShop, favorites, deleteFavorites, favoritesAll } from '@/api/users/user.js';
	import { getCode } from '@/utlis/getToken.js';
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
		            text: '客服',
					color: '#646566'
		        }, {
		            icon: 'star',
		            text: '收藏',
		            color: ''
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
				detailList: {},  // 商品详情
				hide: false,  // 控制添加购物车和购买的框显示和隐藏
				price: '', // 子组件的价格
				detail: null, // 子组件的详情
				specification: '', // 尺寸或者颜色
				quantity: 1, // 购买或者购物车数量
				confirmText: '', // 点击购物车或者立即购买的提示
				imgIndex: 0,
				token: '', // 用户token
				code: '', // 判断是否登录的code
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
				// 判断是否有商品参数
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
			// 购买规格
			attr(data) {
				let { parameter, index } = data;
				this.specification = parameter;
				this.imgIndex = index;
			},
			// 购买数量
			count(data) {
				let { count } = data;
				this.quantity = count;
			},
			// 对收藏的处理
			onClick(e) {
				if (e.content.text == '收藏') {
					if (this.code == 401) {
						uni.navigateTo({
							url: '../login/login'
						})
					} else {
						favorites({
							product_id: this.detailList.id
						}, this.token).then(res => {
							let code = res[1].data.code;
							if (code == 204) {
								uni.showToast({
									title: '收藏成功'
								})
								this.options = [{
									icon: 'headphones',
									text: '客服',
									color: '#646566'
								}, {
									icon: 'star-filled',
									text: '已收藏',
									color: '#cb2525'
								}]
								setTimeout(() => {
									uni.hideToast();
								}, 2000);
							}
						})
					}
				}
				if (e.content.text == '已收藏') {
					deleteFavorites({
						product_id: this.detailList.id
					}, this.token).then(res => {
						let codeOne = res[1].data.code;
						if (codeOne == 204) {
							uni.showToast({
								title: '已取消收藏'
							})
							this.options = [{
								icon: 'headphones',
								text: '客服',
								color: '#646566'
							}, {
								icon: 'star',
								text: '收藏',
								color: ''
							}]
							setTimeout(() => {
								uni.hideToast();
							}, 2000);
						}
					})
				}
			}, 
			// 控制选择参数的弹框的显示和隐藏 并 判断是否是购买或加入购物车
			buttonClick(e) {
				if (this.code == 401) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					this.hide = true;
					this.confirmText = e.content.text;
				}
			},
			// 立即购买和加入购物车
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
						addShop({
							id: that.detailList.id,
							num: that.quantity,
							parameter_index: that.imgIndex,
							parameter: that.detailList.parameter,
							price: that.detailList.price,
							title: that.detailList.title
						},this.token).then(res => {
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
						uni.navigateTo({
							url: `../ConfirmOrder/ConfirmOrder?detail=${JSON.stringify({
								productsNumArr: [this.quantity],
								productParametersArr: [this.specification],
								shopIdList: [this.detailList.id],
								priceAll: this.price,
								specificationArr: [this.imgIndex],
								deleteShopList: [this.detailList.delete_id]
							})}`
						})
					}
				}
			},
			// 商品图片滑动的索引
			change(e) {
				this.index = e.detail.current + 1;
			},
			// 图片预览
			previewImage(index) {
				uni.previewImage({
					urls: this.detailList.img_list.split(','),
					current: index
				})
			},
			// 参数弹框的消失
			hideAlert() {
				this.hide = false;
			}
		},
		created() {
			uni.showLoading({
				mask: true
			})
		},
		onShow() {
			getCode().then(res => {
				this.token = res.token;
				this.code = res.code.data.code;
				// 判断是否收藏  如果收藏让五角星变红 要是没有就不变红
				favoritesAll(this.token).then(res=>{
					let arr = res[1].data.data;
					if (arr.indexOf(String(this.detailList.id)) == -1) {
						this.options = [{
							icon: 'headphones',
							text: '客服',
							color: '#646566'
						}, {
							icon: 'star',
							text: '收藏',
							color: ''
						}]
					} else {
						this.options = [{
							icon: 'headphones',
							text: '客服',
							color: '#646566'
						}, {
							icon: 'star-filled',
							text: '已收藏',
							color: '#cb2525'
						}]
					}
				}).catch(err => {
					console.log(err)
				})
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
