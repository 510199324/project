<template>
	<view class="Favorites">
		<shop v-if="favorites.length == 0">
			<text slot="text-title">这里已空空如也~</text>
			<text slot="text-two">"藏藏更健康~"</text>
		</shop>
		<view class="head">
			<checkbox-group style="display: flex;" v-if="isEdit?true:false" @change="checkAll">
				<label :checked="checkAllKey">
					<checkbox value="all" :checked="checkAllKey"/><text>全选</text>
				</label>
			</checkbox-group>
			<view class="edit" @click="poeration">
				<text>{{isEdit?'完成':'编辑'}}</text>
			</view>
		</view>
		<checkbox-group class="goods-list" @change="favoritesCheck">
			<label class="list" v-for="(item,index) in favorites" :key="index">
				<checkbox class="check"  v-if="isEdit?true:false"  style="display: flex;" :value="item.id" :checked="checkKey" />
				<view class="thumb">
					<image :src="item.img_list.split(',')[0]" mode=""></image>
				</view>
				<view class="item">
					<view class="title">
						<text class="two-omit">{{item.title}}</text>
					</view>
					<view class="price-more">
						<view class="price">￥{{item.price}}</view>
					</view>
					<view class="goods-btn">
						<view class="btn" @tap="similar(item.type_one)">
							<text>看相似</text>
						</view>
						<view class="cart">
							<text class="iconfont icon-cart"></text>
						</view>
					</view>
				</view>
			</label>
		</checkbox-group>
		<view class="footer-btn" :style="isEdit?'display: flex':'display: none'" @tap="cancel">
			<view class="btn">取消收藏</view>
		</view>
	</view>
</template>

<script>
	import { favoritesAll, deleteFavorites } from '@/api/users/user.js';
	import shop from '@/components/my-components/shop/shop.vue'; 
	import { getCode } from '@/utlis/getToken.js';
	import { getGood } from '@/api/shops/shops.js';
	export default {
		components: {
			shop
		},
		data() {
			return {
				isEdit: false, 
				token: '', // 用户token
				favorites: [], // 收藏列表
				checkKey: false, // 选择的字段
				checkAllKey: false, // 全选的字段
				deleteFavorites: [], // 删除收藏夹的数组
			};
		},
		methods:{
			// 相似商品
			similar(type_one) {
				uni.navigateTo({
					url: '../classify/classify?type_one='+type_one
				})
			},
			// 操作
			poeration() {
				this.isEdit = !this.isEdit;
				this.checkAllKey = false;
				this.checkKey = false;
			},
			// 选择的事件
			favoritesCheck(e) {
				this.deleteFavorites = e.detail.value;
				if (this.deleteFavorites.length < this.favorites.length) {
					this.checkAllKey = false;
				} else {
					this.checkAllKey = true;
				}
			},
			// 全选
			checkAll(e) {
				if (e.detail.value.length == 0) {
					this.checkKey = false;
				} else {
					this.checkKey = true;
					for (let i of this.favorites) {
						this.deleteFavorites.push(i.id)
					}
				}
			},
			// 取消收藏
			cancel() {
				for (let i of this.deleteFavorites) {
					deleteFavorites({
						product_id: i
					}, this.token).then(res => {
						if (res[1].data.code == 204) {
							this.favoritesAllArr();
							uni.showToast({
								title: '取消收藏成功'
							})
							setTimeout(()=>{
								uni.hideToast();
							},2000)
						}
					})
				}
			},
			// 获取收藏列表
			favoritesAllArr() {
				favoritesAll(this.token).then(res => {
					let arr = res[1].data.data;
					for (let i of arr) {
						getGood({
							id: i
						}).then(res => {
							this.favorites.push(res[1].data.data[0])
						})
					}
				}).catch(err => {
					console.log(err);
				})
			}
		},
		onShow() {
			getCode().then(res => {
				this.token = res.token;
				this.favoritesAllArr();
			})
		}
	}
</script>

<style scoped lang="scss">
	@import 'GoodsOn.scss';
</style>
