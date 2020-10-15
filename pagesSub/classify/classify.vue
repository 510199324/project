<template>
	<view class="page" ref="page">
		<!-- 搜索 -->
		<view class="search-index">
			<!-- #ifndef H5 -->
				<view class="icon" @click="onCode">
					<text class="cuIcon cuIcon-list"></text>
				</view>
			<!-- #endif -->
			<!-- #ifdef  H5 -->
			<view class="icon" @click="onPayCode">
				<text class="mix-icon icon-sousuo"></text>
			</view>
			<!-- #endif -->
			<view class="search">
				<text class="mix-icon icon-sousuo"></text>
				<input type="text" placeholder="输入搜索内容" v-model="keyword" />
			</view>
			<view class="icon" @tap="search">
				<text class="mix-icon icon-sousuo"></text>
			</view>
		</view>
		<!-- 分类数据 -->
		<view class="classify-data">
			<view class="classify-one">
				<scroll-view scroll-y class="classify-list">
					<view :class="{list: true, action: titleIndex == index}" v-for="(item,index) in classifyList" :key="index" @tap="clickScroll(index)">
						<text class="title">{{item.title}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="classify-two-three">
				<scroll-view scroll-y class="scroll" @scroll="scroll($event)" :scroll-top="scrollTop">
					<view class="classify-two" v-for="(item,index) in classifyList" :key="index" @tap="detailMian(item.id, item.type_one)">
						<view class="two-name">
							<view class="name">{{item.title}}</view>
						</view>
						<view class="classify-three">
							<view class="list" v-for="(itemOne, index) in item.data" :key="index">
								<image :src="itemOne.img_list.split(',')[0]"></image>
								<text>{{itemOne.title}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getTypeOne } from '@/api/shops/shops.js';
	export default {
		data() {
			return {
				classifyList: null, // 分裂列表
				titleAll: null, // 标题详情信息
				titleScrollAll: null, // 标题的侧边栏谢谢
				titleIndex: 0, // 标题索引
				scrollTop: 0, // 滚动条距离
				keyword: '', // 搜索关键字
			};
		},
		onShow() {
			uni.showLoading({
				mask: true
			})
		},
		onLoad(options) {
			let { type_one } = options;
			let res = [getTypeOne({
				type_one
			})];
			Promise.all(res).then(res => {
				let newArr = [];
				let resArr = res[0][1].data.data;
				let uniqueSort = [];
				// 数组去重
				for (let i of resArr) {
					if (newArr.indexOf(i.type_two) === -1) {
						newArr.push(i.type_two);
					}
				}
				// 数据重组
				for (let j of newArr) {
					let arr = [];
					let obj = {};
					for (let h of resArr) {
						if (h.type_two === j) {
							arr.push(h);
						}
					}
					obj.title = j;
					obj.data = arr;
					uniqueSort.push(obj);
				}
				this.classifyList = uniqueSort;
				// 获取标题的详情
				this.$nextTick(()=>{
					const title = uni.createSelectorQuery().in(this).selectAll('.name');
					title.boundingClientRect(data => {
						this.titleAll = data;
					}).exec();
					
					const titleScroll = uni.createSelectorQuery().in(this).selectAll('.title');
					title.boundingClientRect(data => {
						this.titleScrollAll = data;
					}).exec();
					uni.hideLoading();
				})
			}).catch(err => {
				console.log(err);
			})
		},
		methods:{
			// 点击跳转详情
			detailMian(id, type_one) {
				uni.navigateTo({
					url: '../detail/detail?type_one=' + type_one + '&id=' + id 
				})
			},
			// 滚动事件
			scroll(e) {
				for (let i = 0; i < this.titleAll.length; i ++) {
					if (e.detail.scrollTop > this.titleAll[i].top - 150) {
						for (let j = 0; j < this.titleScrollAll.length; j ++) {
							this.titleIndex = null;
						}
						this.titleIndex = i;
					}
				}
			},
			// 点击滚动楼层
			clickScroll(index) {
				this.scrollTop = this.titleAll[index].top - 130;
			},
			// 搜索
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
		}
	}
</script>
<style scoped lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.page{
		position: absolute;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #FFFFFF;
	}
	/* 搜索 */
	.search-index{
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef APP-PLUS */
		top: 80rpx;
		/* #endif */
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100rpx;
		padding: 0 4%;
		background-color: #FFFFFF;
		.icon{
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 10%;
			height: 100%;
			text{
				color: #333333;
				font-size: 52rpx;
			}
		}
		.search{
			display: flex;
			align-items: center;
			padding: 0 3%;
			width: 75%;
			height: 60rpx;
			background-color: #f6f6f6;
			border-radius: 60rpx;
			.iconfont{
				font-size: 28rpx;
				color: #C0C0C0;
			}
			input{
				width: 90%;
				height: 100%;
				color: #212121;
				font-size: 24rpx;
				margin-left: 10rpx;
			}
		}
	}
	/* 分类数据 */
	.classify-data{
		display: flex;
		width: 100%;
		height: 90%;
		background-color: #FFFFFF;
		margin-top: 100rpx;
		/* #ifdef APP-PLUS */
		margin-top: 170rpx;
		/* #endif */
		.classify-one{
			width: 25%;
			height: 100%;
			background-color: #f6f6f6;
			.classify-list{
				width: 100%;
				height: 100%;
				.list{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 80rpx;
					text{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						color: #C0C0C0;
						font-size: 26rpx;
						box-sizing: border-box;
					}
				}
				.action{
					background-color: #FFFFFF;
					text{
						font-size: 28rpx;
						color: #212121;
						border-left: 6rpx solid $base;
						box-sizing: border-box;
					}
				}
			}
		}
		.classify-two-three{
			width: 80%;
			height: 100%;
			margin:0 auto;
			.scroll{
				width: 100%;
				height: 100%;
				.classify-two{
					width: 100%;
					.two-name{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 80%;
						height: 80rpx;
						background: #98D1CA;
						margin: 20rpx auto;
						border-radius: 15rpx;
						.name{
							font-size: 26rpx;
							color: #212121;
						}
					}
				}
				.classify-three{
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					.list{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 32%;
						height: 140rpx;
						margin:5rpx;
						image{
							width: 120rpx;
							height: 120rpx;
						}
						text{
							color: #212121;
							font-size: 24rpx;
							margin-top: 10rpx;
						}
					}
					.list:nth-child(3n){
						margin-right: 0;
					}
				}
			}
		}
	}
</style>