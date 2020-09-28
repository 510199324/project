<template>
	<view class="page">
		<!-- 用户信息列表 -->
		<view class="user-list">
			<view class="list" style="height: 160rpx;">
				<view class="more-content">
					<image src="../../static/imags/cpersonil.png" mode=""></image>
				</view>
				<view class="flex-align-center setUp" @tap="userSet">
					<text>编辑</text>
				</view>
			</view>
			<view class="list" @click="onNickname">
				<view class="title">
					<text>昵称</text>
				</view>
				<view class="more-content">
					<text class="content">{{userInfo.data.name ? userInfo.data.name : ''}}</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>性别</text>
				</view>
				<view class="more-content">
					<text class="content">{{userInfo.data.gender ? userInfo.data.gender : ''}}</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>出生日期</text>
				</view>
				<view class="more-content">
					<text class="content">{{userInfo.data.datebirth ? userInfo.data.datebirth : ''}}</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>邮箱</text>
				</view>
				<view class="more-content">
					<text class="content">{{userInfo.data.email ? userInfo.data.email : ''}}</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>简介</text>
				</view>
				<view class="more-content">
					<text class="content">{{userInfo.data.synopsis ? userInfo.data.synopsis : ''}}</text>
				</view>
			</view>
			<view class="outLogin">
				<button class="logoutLogin">退出登录</button>
			</view>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				userInfo: null
			};
		},
		onShow() {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success(res) {
					that.userInfo = res.data;
				}
			})
		},
		methods:{
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
						year = year - 60;
				} else if (type === 'end') {
						year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			userSet() {
				uni.navigateTo({
					url: '../setUser/setUser'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './userDetail.scss';
</style>
