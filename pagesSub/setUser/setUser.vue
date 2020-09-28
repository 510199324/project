<template>
	<view class="page">
		<!-- 用户信息列表 -->
		<view class="user-list">
			<view class="list" style="height: 160rpx;">
				<view class="title">
					<text>头像</text>
				</view>
				<view class="more-content">
					<image src="../../static/imags/cpersonil.png" mode=""></image>
				</view>
			</view>
			<view class="list" @click="onNickname">
				<view class="title">
					<text>昵称</text>
				</view>
				<view class="more-content">
					<input type="text" class="content" :value="userInfo.data.name">
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>性别</text>
				</view>
				<view class="more-content">
					<text class="content">{{sexText}}</text>
				</view>
				<view class="picker">
					<picker @change="sexPickerChange" :value="sexIndex" :range="sexArray">
						<view class="uni-input" style="height: 100rpx;">{{sexText}}</view>
					</picker>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>出生日期</text>
				</view>
				<view class="more-content">
					<text class="content">{{birthday}}</text>
				</view>
				<view class="picker">
					<picker @change="birthdayPickerChange" mode="date" :value="birthdayDate" :start="startDate" :end="endDate">
						<view class="uni-input" style="height: 100rpx;">{{birthdayDate}}</view>
					</picker>
				</view>
			</view>
			<view class="list" @click="onNickname">
				<view class="title">
					<text>邮箱</text>
				</view>
				<view class="more-content">
					<input type="text" class="content" :value="userInfo.data.email">
				</view>
			</view>
			<view class="list" @click="onNickname">
				<view class="title">
					<text>个人简介</text>
				</view>
				<view class="more-content">
					<textarea class="content" style="height:100rpx;" :value="userInfo.data.synopsis ? userInfo.data.synopsis : ''" />
				</view>
			</view>
			<view class="outLogin">
				<button class="logoutLogin">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				// 性别
				sexArray: ['男','女'],
				sexIndex: 0,
				sexText: '保密',
				// 生日
				birthdayDate: currentDate,
				startDate: this.getDate('start'),
				endDate: this.getDate('end'),
				birthday: '2020-02-02',
				// 昵称
				nickname: '爱跳舞的汤姆猫',
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
			/**
			 * 性别
			 * @param {Object} e
			 */
			sexPickerChange(e){
				this.sexIndex = e.detail.value;
				this.sexText = this.sexArray[this.sexIndex];
			},
			/**
			 * 生日
			 * @param {Object} e
			 */
			birthdayPickerChange(e){
				this.birthday = e.detail.value;
			},
			/**
			 * 获取日期
			 * @param {Object} type
			 */
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
			/**
			 * 昵称点击
			 */
			onNickname(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './setUser.scss';
</style>
