<template>
	<view class="page">
		<!-- 搜索 -->
		<view class="search-head">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="search">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" v-model="keyword" placeholder="搜索商品" />
			</view>
			<view class="searchBtn" @tap="search">
				<text>搜索</text>
			</view>
			<view class="cut" @click="isList = !isList">
				<text class="cuIcon" :class="isList?'cuIcon-list':'cuIcon-card'"></text>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-data">
			<view class="goods-list">
				<view :class="isList?'list-view':'list-li'" v-for="(item,index) in goodList" @click="onGoodsList" :key="index" @tap="goodDetail(item.id, item.type_one)">
					<view class="thumb">
						<image :src="item.img_list[0]" mode="heightFix"></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="two-omit">{{item.title}}</text>
						</view>
						<view class="price">
							<view class="retail-price">
								<text class="min">￥</text>
								<text class="max">{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { searchList } from '@/api/users/user.js';
	export default {
		data() {
			return {
				// 列表视图切换
				isList: true,
				// 筛选弹窗
				isScreen: false,
				// 筛选切换
				screenShow: 0,
				// 抽屉
				isDrawer: false,
				goodList:[], // 搜索列表
				keyword: '', // 搜索关键字
			}
		},
		onLoad(params) {
			searchList({
				keyword: params.value
			}).then(res => {
				this.goodList = res[1].data.data;
			})
		},
		methods: {
			/**
			 * 返回点击
			 */
			onBack(){
				uni.navigateBack();
			},
			/**
			 * 综合点击
			 * @param {Number} type
			 */
			onSynthesize(type){
				this.screenShow = type;
				this.isScreen = !this.isScreen;
			},
			/**
			 * 商品列表点击
			 */
			onGoodsList(item,index){
				uni.navigateTo({
					url: '/pages/GoodsDetails/GoodsDetails',
					animationType: 'zoom-fade-out',
					animationDuration: 200
				})
			},
			// 搜索按钮
			search() {
				if (this.keyword == '') {
					uni.showToast({
						title: '搜索不能为空',
						icon: 'none'
					})
					setTImeout(()=>{
						uni.hideToast();
					},1500)
				} else {
					searchList({
						keyword: this.keyword
					}).then(res => {
						this.goodList = res[1].data.data;
					})
				}
			},
			// 点击跳转到商品详情
			goodDetail(type,type_one) {
				uni.navigateTo({
					url: '../detail/detail?id='+type+'&type_one='+type_one
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import  'SearchGoodsList.scss';
</style>
