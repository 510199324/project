<template>
	<view class="page">
		<!-- 用户信息列表 -->
		<view class="user-list">
			<view class="list" style="height: 160rpx;">
				<view class="more-content">
					<image :src="userInfo.data.headpoto ? userInfo.data.headpoto : '/static/imags/default.png'" mode=""></image>
				</view>
				<view class="flex-align-center setUp" @tap="userSet">
					<text>编辑</text>
				</view>
			</view>
			<view class="list">
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
					<text class="content">{{userInfo.data.datebirth ? getDate(userInfo.data.datebirth) : ''}}</text>
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
				<button class="logoutLogin" @tap="changePassword" style="bottom:160rpx;">修改密码</button>
				<button class="logoutLogin" @tap="signOut">退出登录</button>
			</view>
		</view>
		<!-- 提示框 -->
		<DialogBox ref="DialogBox"></DialogBox>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	export default {
		data() {
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
			// 推出登录
			signOut() {
				uni.removeStorage({
					key: 'userInfo'
				})
				uni.removeStorage({
					key: 'token'
				})
				uni.switchTab({
					url: '../../pages/home/home'
				})
			},
			// 时间格式化
			getDate(type) {
				return dayjs(type).format('YYYY-MM-DD');
			},
			// 跳转连接
			userSet() {
				uni.navigateTo({
					url: '../setUser/setUser'
				})
			},
			// 修改密码
			changePassword() {
				uni.navigateTo({
					url: '../changePassword/changePassword'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './userDetail.scss';
</style>
