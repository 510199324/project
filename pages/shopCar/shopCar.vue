<template>
	<view class="shop-car">
		<view class="shop-back">
			<shop v-show="!flag">
				<text slot="text-title">未登陆</text>
				<text slot="text-two">登录成功后将显示购物车内商品</text>
				<button type="primary" slot="button" @tap="goLogin">去登陆</button>
			</shop>
			<shop v-if="shopList.length">
				<text slot="text-title">购物车空空如也~</text>
				<text slot="text-two">快去逛逛吧，挑选您喜爱的商品</text>
				<button type="primary" slot="button" @tap="goShop">去逛逛</button>
			</shop>
			<!-- 购物车列表 -->
			<view class="shopList" v-if="shopList.length > 0">
				<view class="head">
					<!-- #ifdef APP-PLUS -->
					<view class="title">购物车</view>
					<!-- #endif -->
					<view class="edit" @click="poeration">
						<text>{{isEdit?'完成':'编辑'}}</text>
					</view>
				</view>
				<!-- 购物车列表 -->
				<view class="cart-list">
					<checkbox-group @change="checkHandel($event)">
						<label class="list" v-for="(item, index) in shopList" :key="index">
							<view class="check">
								<checkbox :value="index" :checked="item.checked"/>
							</view>
							<view class="goods">
								<view class="thumb">
									<image :src="JSON.parse(item.parameter).content[item.parameter_index]" mode=""></image>
								</view>
								<view class="item">
									<view class="title">
										<text class="two-omit">{{item.title}}</text>
									</view>
									<view class="attribute">
										<view class="attr" @tap="buttonClick(item, index)">
											<text>{{JSON.parse(item.parameter).name[item.parameter_index]}}</text>
											<text class="more"></text>
										</view>
									</view>
									<view class="price-num">
										<view class="price">
											<text class="min">￥</text>
											<text class="max">{{item.price}}</text>
										</view>
										<view class="num">
											<view class="number">
												<text>X {{item.num}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</label>
					</checkbox-group>
				</view>
				<!-- 购物车失效商品列表 -->
			</view>
			<view class="recommend">
				<view class="recommendF">
					<image src="/static/imags/wntj_title.png" mode="" class="recommendS"></image>
				</view>
				<view class="goods">
					<goodList :goodShopList="goodShopList" />
				</view>
			</view>
			<!-- 结算 -->
			<view class="close-account" v-if="shopList.length">
				<view class="check-total">
					<view class="check">
						<checkbox-group @change="checkAll">
							<label>
								<checkbox value="all" :checked="checkKey"/>
								<text class="all">全选</text>
							</label>
						</checkbox-group>
					</view>
					<view class="total"  v-if="!isEdit">
						<text>合计：</text>
						<text class="price">￥{{priceAll}}</text>
					</view>
				</view>
				<view class="account">
					<view class="btn-calculate" v-if="!isEdit" @tap="pay">
						<text>去结算({{checkArr.length}})</text>
					</view>
					<view class="btn-del" v-else>
						<text class="attention" @tap="moveFavorites">移入收藏</text>
						<text class="del" @tap="deleteShopCar">删除</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 参数弹框 -->
		<view class="backFather" v-show="hide">
			<view class="back" @tap="hideAlert"></view>
			<good-attr class="fixed" :detail="detail" :price="price" @oncount="count" @onattr="attr" @confirm="confirm"></good-attr>
		</view>
	</view>
</template>

<script>
	import goodList from '@/components/my-components/goodList/goodList.vue';
	import shop from '@/components/my-components/shop/shop.vue';
	import goodAttr from '@/components/my-components/GoodsAttr/GoodsAttr.vue';
	import { getGood } from '@/api/shops/shops.js';
	import { getCode } from '@/utlis/getToken.js';
	import { deleteShop, upDateShop, getShop, favorites } from '@/api/users/user.js';
	export default {
		components: {
			goodList,
			shop,
			goodAttr
		},
		data() {
			return {
				// checkItem: false, // 单选的
				checkKey: false, // 全选的
				price: null, // 参数中的价格
				hide: false,  // 控制添加购物车和购买的框显示和隐藏
				detail: null, // 商品参数
				isEdit: false, // 删除和付款的出现和隐藏
				shopList: [], // 购物车列表
				goodShopList: null, // 猜你喜欢商品列表
				flag: true, // 判断是否登录
				token: null, // 用户token
				countShop: null, // 商品数量
				quantity: null, // 更改的数量
				imgIndex: null, // 商品参数索引
				specification: null, // 商品参数
				index: null, // 商品索引
				paramsIndex: null, // 商品原参数索引
				checkArr: [], // 选择的数组
				priceAll: 0, // 商品的总价钱
				shopIdList: [], // 商品ID和收藏 数组
				newCheckKey: false, // 用来判断是否勾选的字段
				productsNumArr: [], // 商品数量的数组
				productParametersArr: [], // 商品参数的数组
				deleteShopList: [], // 删除购物车数组
				specificationArr: [], // 商品参数索引的数组
			}
		},
		methods: {
			// 登录状态的去逛逛
			goShop() {
				uni.switchTab({
					url: '../home/home'
				})
			},
			// 未登录状态的去登录
			goLogin() {
				console.log('去登陆')
				uni.navigateTo({
					url: '../../pagesSub/login/login'
				})
			},
			// 收藏
			moveFavorites() {
				for (let i of this.checkArr) {
					this.shopIdList.push(this.shopList[i].id)
				}
				for (let j of this.shopIdList) {
					favorites({
						product_id: j
					}, this.token).then(res => {
						if (res[1].data.code == 204) {
							uni.showToast({
								title: '移入收藏成功'
							})
							setTimeout(() => {
								uni.hideToast()
							}, 2000)
						}
					})
				}
			},
			// 操作
			poeration() {
				this.isEdit = !this.isEdit;
			},
			// 支付
			pay() {
				for (let i of this.checkArr) {
					this.deleteShopList.push(this.shopList[i].delete_id);
					this.productsNumArr.push(this.shopList[i].num);
					this.shopIdList.push(this.shopList[i].id);
					this.specificationArr.push(this.shopList[i].parameter_index);
					this.productParametersArr.push(JSON.parse(this.shopList[i].parameter).name[this.shopList[i].parameter_index]);
				}
				console.log(this.deleteShopList)
				uni.navigateTo({
					url: `../../pagesSub/ConfirmOrder/ConfirmOrder?detail=${JSON.stringify({
						productsNumArr: this.productsNumArr,
						productParametersArr: this.productParametersArr,
						shopIdList: this.shopIdList,
						priceAll: this.priceAll,
						specificationArr: this.specificationArr,
						deleteShopList: this.deleteShopList
					})}`
				})
			},
			// 全选
			checkAll(e) {
				let arr = e.detail.value;
				if (arr.length == 0) {
					this.checkKey = false;
					this.priceAll = 0;
					this.checkArr = [];
				} else {
					this.checkKey = true;
					for (let i = 0; i < this.shopList.length; i ++) {
						this.checkArr.push(i)
					}
				}
				// 数组去重
				for (let i = 0; i < this.checkArr.length; i ++) {
					for (let j = i + 1; j < this.checkArr.length; j ++) {
						if (this.checkArr[i] == this.checkArr[j]) {
							this.checkArr.splice(j ,1);
							j --;
						}
					}
				}
			},
			// 选择商品或者删除商品
			checkHandel(e) {
				this.checkArr = e.detail.value;
				if (this.checkArr.length < this.shopList.length) {
					this.checkKey = false;
				} else {
					this.checkKey = true;
				}
			},
			// 删除购物车商品
			async deleteShopCar() {
				let res;
				for (let i of this.checkArr) {
					this.deleteShopList.push(this.shopList[i].delete_id);
				}
				for (let i of this.deleteShopList) {
					res = await deleteShop({
						delete_id: i
					}, this.token)
				}
				let code = res[1].data.code;
				if (code == 204) {
					uni.showToast({
						title: '删除成功'
					});
					this.checkKey = false;
					this.getgoodList();
					setTimeout(() => {
						uni.hideToast();
					}, 1500)
				}
			},
			// 修改参数的组件出现
			buttonClick(item, index) {
				this.hide = true;
				this.detail = JSON.parse(item.parameter);
				this.countShop = item.num;
				this.index = index;
				this.price = item.price;
				this.paramsIndex = item.parameter_index;
			},
			// 更改参数提交
			confirm() {
				upDateShop({
					index: this.index,
					num: Number(this.quantity) || Number(this.countShop),
					parameter_index: this.imgIndex
				}, this.token).then(res => {
					if (res[1].data.code == 204) {
						this.getgoodList();
						this.hide = false;
						uni.showToast({
							title: '修改成功'
						})
						setTimeout(() => {
							uni.hideToast();
						}, 1500);
					}
				})
			},
			// 接收参数
			attr(data) {
				let { parameter, index } = data;
				this.specification = parameter;
				this.imgIndex = index;
			},
			// 接收数量
			count(data) {
				let { count } = data;
				this.quantity = count;
			},
			// 让修改参数的弹框消失
			hideAlert() {
				this.hide = false;
			},
			// 请求
			getgoodList() {
				let arr = [getGood(), getShop(this.token)];
				Promise.all(arr).then((res) => {
					// this.goodShopList = res[0][1].data.data;
					this.shopList = res[1][1].data.data;
					// this.$nextTick(() => {
					// 	uni.hideLoading();
					// })
				}).catch((err) => {
					console.log(err)
				})
			},
			/**
			 * 跳转点击
			 * @param {String} type 跳转类型
			 */
			onSkip(type) {
				
			}
		},
		onShow() {
			// uni.showLoading({
			// 	mask: true
			// })
			this.productsNumArr = [];
			this.shopIdList = [];
			this.specificationArr = [];
			this.productParametersArr = [];
			this.priceAll = 0;
			this.checkArr = [];
			this.deleteShopList = [];
			this.checkKey = false;
			getCode().then(res => {
				this.token = res.token;
				let code = res.code.data.code;
				if (code === 401) {
					this.flag = false;
				} else if (code === 204) {
					this.flag = true;
				} else {
					this.flag = true;
				}
				this.getgoodList();
			}).catch(err => {
				console.log(err);
			})
		},
		watch: {
			// 监听商品勾选计算价格
			checkArr(newArr,oldArr) {
				var index;
				var price = 0;
				for (var i = 0; i < this.shopList.length; i ++) {
					delete this.shopList[i].checked;
				}
				for (var i = 0; i < newArr.length; i ++) {
					index = newArr[i];
					price += Number(this.shopList[index].price) * Number(this.shopList[i].num);
					this.shopList[index].checked = true;
				}
				this.priceAll = price;
			},
			// 监听全选
			checkKey(newCheck, oldCheck) {
				if (newCheck) {
					this.priceAll = 0;
					for (var i = 0; i < this.shopList.length; i ++) {
						this.shopList[i].checked = true;
						this.priceAll += Number(this.shopList[i].price) * Number(this.shopList[i].num);
					}
				} else {
					if (checkArr.length == 0) {
						for (var i = 0; i < this.shopList.length; i ++) {
							delete this.shopList[i].checked;
						}
						this.priceAll = 0;
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.head {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80rpx;
		/* #ifdef APP-PLUS */
		height: calc(100rpx + var(--status-bar-height));
		padding-top: var(--status-bar-height);
		/* #endif */
		background-color: #FFFFFF;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30rpx;
			color: #212121;
		}

		.edit {
			position: absolute;
			right: 20rpx;
			top: 50%;
			/* #ifdef APP-PLUS */
			top: calc(50rpx + var(--status-bar-height));
			/* #endif */
			transform: translate(0, -50%);

			text {
				color: #212121;
				font-size: 26rpx;
			}
		}
	}

	/* 购物车列表 */
	.cart-list {
		width: 100%;
		background-color: #FFFFFF;
		padding: 20rpx 0;
		margin-top: 30rpx;
		/* #ifdef APP-PLUS */
		margin-top: calc(100rpx + var(--status-bar-height));

		/* #endif */
		.list {
			display: flex;
			padding: 0 3%;
			height: 240rpx;
			margin-bottom: 20rpx;

			.check {
				display: flex;
				align-items: center;
				width: 10%;
				height: 100%;

				text {
					font-size: 36rpx;
					color: #333333;
				}

				.icon-checked {
					color: $base;
					// box-shadow: 0 0 10rpx $base;
				}
			}

			.goods {
				display: flex;
				align-items: center;
				width: 90%;
				height: 100%;
				background-color: #FFFFFF;
				box-shadow: 0 0 20rpx #f6f6f6;
				border-radius: 10rpx;

				.thumb {
					display: flex;
					// align-items: center;
					justify-content: center;
					width: 30%;
					margin-top: 20rpx;
					image {
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
					}
				}

				.item {
					padding: 10rpx 0;
					width: 70%;
					.title {
						display: flex;
						align-items: center;
						width: 100%;
						height: 80rpx;

						text {
							font-size: 26rpx;
							color: #212121;
						}
					}

					.attribute {
						display: flex;
						align-items: center;
						margin-top: 10rpx;

						.attr {
							display: flex;
							align-items: center;
							padding: 0 20rpx;
							height: 40rpx;
							background-color: #f6f6f6;
							border-radius: 10rpx;

							text {
								font-size: 24rpx;
								color: #333333;
							}

							.more {
								display: flex;
								width: 10rpx;
								height: 10rpx;
								border-left: 2rpx solid #333333;
								border-bottom: 2rpx solid #333333;
								transform: rotate(-45deg);
								margin-left: 10rpx;
							}
						}
					}

					.price-num {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 80rpx;

						.price {
							display: flex;

							.min {
								color: $base;
								font-size: 24rpx;
							}

							.max {
								font-size: 28rpx;
								color: $base;
								font-weight: bold;
							}
						}

						.num {
							display: flex;
							height: 40rpx;

							.number {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 80rpx;
								height: 40rpx;
								background-color: #f6f6f6;
								border-radius: 8rpx;

								text {
									font-size: 24rpx;
									color: #212121;
								}
							}
						}
					}
				}
			}
		}
	}

	.close-account {
		position: fixed;
		left: 0;
		bottom:0;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid #f6f6f6;

		.check-total {
			display: flex;
			align-items: center;
			width: 50%;
			height: 100%;

			.check {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40%;
				height: 100%;

				text {
					font-size: 36rpx;
					color: #333333;
				}

				.icon-checked {
					color: $base;
					// box-shadow: 0 0 10rpx $base;
				}

				.all {
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}

			.total {
				display: flex;
				align-items: center;
				width: 60%;
				height: 100%;

				text {
					font-size: 24rpx;
					color: #333333;
				}

				.price {
					font-weight: bold;
					color: $base;
				}
			}
		}

		.account {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 46%;
			padding-right: 4%;

			.btn-calculate {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 160rpx;
				height: 60rpx;
				background-color: $base;
				border-radius: 60rpx;

				text {
					color: #FFFFFF;
					font-size: 24rpx;
				}
			}

			.btn-del {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.attention {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 140rpx;
					height: 60rpx;
					border: 2rpx solid #EEEEEE;
					border-radius: 60rpx;
					color: #333333;
					font-size: 24rpx;
					margin-right: 20rpx;
				}

				.del {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100rpx;
					height: 60rpx;
					background-color: $base;
					border-radius: 60rpx;
					color: #FFFFFF;
					font-size: 24rpx;
				}
			}
		}
	}
</style>

<style>
	.recommendF{
		width:100%;
	}
	.recommendS{
		width:416rpx;
		height:40rpx;
		margin:30rpx auto;
	}
	.text {
		font-size: 40rpx;
		font-weight: 700;
		color: #6B6B6B;
		line-height: 100rpx;
		padding-left: 20rpx;
	}

	.Settlement {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		background: #fff;
		border-top: 1px solid #E1E1E1;
		z-index: 20;
		padding: 25rpx 10rpx;
	}
	.fixed{
		position:fixed;
		bottom:0rpx;
		left:0rpx;
		width:100%;
		z-index:8888;
	}
	.settlementBtn {
		width: 100rpx;
		height: 60rpx;
		border: none;
		background: #4CD964;
		color: #fff;
		line-height: 60rpx;
		border-radius: 30rpx;
	}

	.total,
	.totalMoney {
		align-self: center;
	}

	.total {
		color: #43474A;
		font-size: 36rpx;
	}

	.totalMoney {
		font-size: 28rpx;
		color: #f40;
		margin: 0rpx 15rpx;
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
</style>
