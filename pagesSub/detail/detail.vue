<template>
	<view class="detail">
		<!-- detail主体 -->
		<view class="detailHome">
			<view class="swiper">
				<!-- 图片预览 -->
				<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="400" class="swiperCom" @change="change">
					<view class="detailSwiper" v-for="(item, index) in imgArr" :key="index">
						<swiper-item>
							<image :src="item" mode="widthFix" class="deteilImg" @tap="previewImage(index)"></image>
						</swiper-item>
					</view>
				</swiper>
				<text class="number">{{imgArr.length}}/{{index}}</text>
			</view>
			<view class="detailText">
				<view class="flex-between">
					<text class="title">{{detailList.title}}</text>
					<text class="typeTwo">{{detailList.type_two}}</text>
				</view>
				<view class="money" :class="{text:detailList.spike_price}">
					<text class="gold" :style="{color:detailList.spike_price?'#ccc':'#f40'}">￥</text>
					<text class="price" :style="{color:detailList.spike_price?'#ccc':'#f40'}">{{detailList.price}}</text>
				</view>
				<view v-if="detailList.spike_price" style="font-size:36rpx;color:#f00;">
					<text class="gold">￥</text>
					<text class="price">{{detailList.spike_price}}</text>
				</view>
				<text class="introduce">{{detailList.introduce}}</text>
			</view>
			<view class="detailList">
				<view class="recommendF">
					<image src="/static/imags/wntj_title.png" mode="" class="recommend"></image>
				</view>
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
	import { getGood, getTypeOne, mayLike } from '@/api/shops/shops.js';
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
				imgArr: [], // 商品图片
		    }
		},
		onLoad({id, type_one}) {
			let arr = [getGood({
				id
			}),mayLike()];
			Promise.all(arr).then(res=>{
				this.detailList = res[0][1].data.data[0];
				if (this.detailList.spike) {
					this.price = this.detailList.spike_price;
				} else {
					this.price = this.detailList.price;
				}
				if (this.detailList.img_list.split(',').length > 1) {
					this.imgArr = this.detailList.img_list.split(',');
				} else {
					this.imgArr = this.detailList.img_list.split(',');
				}
				// 判断是否有商品参数
				if (JSON.parse(this.detailList.parameter).length == 0) {
					this.detail = '';
				} else {
					this.detail = JSON.parse(this.detailList.parameter)[0];
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
			// 对加入购物车和立即购买的封装
			spikeLike(type) {
				if (type == '立即购买') {
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
				if (type == '加入购物车') {
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
			},
			// 活动未开始的封装
			activity() {
				if (this.detailList.type == 'spike') {
					if (Number(this.detailList.create_time) > new Date().getTime()) {
						uni.showToast({
							title: '活动未开始，请稍后',
							icon: 'none'
						})
						setTimeout(()=>{
							uni.hideToast();
						},1500)
					} else {
						this.spikeLike(this.confirmText);
					}
				} else if (this.detailList.type == '') {
					this.spikeLike(this.confirmText);
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
					this.activity();
				}
				if (this.confirmText == '立即购买') {
					this.activity();
				}
			},
			// 商品图片滑动的索引
			change(e) {
				this.index = e.detail.current + 1;
			},
			// 图片预览
			previewImage(index) {
				uni.previewImage({
					urls: this.imgArr,
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
	.text{
		color:#ccc;
		text-decoration: line-through;
	}
	.recommendF{
		width:100%;
	}
	.recommend{
		width:416rpx;
		height:40rpx;
		margin:30rpx auto;
	}
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
