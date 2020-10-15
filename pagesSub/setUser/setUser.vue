<template>
	<view class="page">
		<!-- 用户信息列表 -->
		<view class="user-list">
			<view class="list" style="height: 160rpx;">
				<view class="title">
					<text>头像</text>
				</view>
				<view class="more-content" @tap="setHead">
					<image :src="userInfo.headpoto ? userInfo.headpoto : '/static/imags/default.png'" mode=""></image>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>昵称</text>
				</view>
				<view class="more-content">
					<input type="text" class="content" :value="userInfo.name" @input="nickName($event)">
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
			<view class="list" @click="emailHandel">
				<view class="title">
					<text>邮箱</text>
				</view>
				<view class="more-content">
					<text class="content">{{userInfo.email}}</text>
				</view>
			</view>
			<view class="list" @click="onNickname">
				<view class="title">
					<text>个人简介</text>
				</view>
				<view class="more-content">
					<textarea class="content" style="height:100rpx;" :value="userInfosynopsis ? userInfosynopsis : ''" @input="synopsisHandel($event)"/>
				</view>
			</view>
			<view class="outLogin" @tap="save()">
				<button class="logoutLogin">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { modifyUser } from '@/api/users/user.js';
	import { getCode } from '@/utlis/getToken.js';
	import dayjs from 'dayjs';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				// 性别
				sexArray: ['男','女'],
				sexIndex: 0,
				sexText: '',
				// 生日
				birthdayDate: currentDate,
				startDate: this.getDate('start'),
				endDate: this.getDate('end'),
				birthday: '',
				// 昵称
				nickname: '',
				userInfo: {},
				userImg: '', // 用户头像地址
				birthDayStr: '', // 用户的时间戳
				token: '', // token
				synopsis: '', // 简介
			};
		},
		onShow() {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success(res) {
					that.userInfo = res.data.data;
					that.sexText = that.userInfo.gender == null ? '' : that.userInfo.gender;
					that.birthday = that.userInfo.datebirth == null ? '' : dayjs(Number(that.userInfo.datebirth)).format('YYYY-MM-DD');
					that.nickname = that.userInfo.name;
				}
			})
			getCode().then(res => {
				this.token = res.token;
			})
		},
		methods:{
			// 修改邮箱
			emailHandel() {
				uni.navigateTo({
					url: '../modifyEmail/modifyEmail'
				})
			},
			// 修改头像
			setHead() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'https://www.sngblog.cn:7147/api/file',
							fileType: 'image',
							name: 'file',
							header: {
								'Content-type': 'multipart/form-data'
							},
							filePath: tempFilePaths[0],
							success(res) {
								that.userImg = JSON.parse(res.data).img_Url;
							}
						})
					}
				})
			},
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
				this.birthDayStr = new Date(this.birthday.replace(/-/g, '/')).getTime();
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
			nickName(e) {
				this.nickname = e.target.value;
			},
			// 简介
			synopsisHandel(e) {
				this.synopsis = e.target.value;
			},
			// 保存
			save() {
				modifyUser({
					name: this.nickname == '' ? this.userInfo.name : this.nickname,
					headpoto: this.userImg == '' ? this.userInfo.headpoto : this.userImg,
					synopsis: this.synopsis == '' ? this.userInfo.synopsis : this.synopsis,
					gender: this.sexText == '' ? this.userInfo.gender : this.sexText, 
					datebirth: this.birthDayStr == '' ? this.userInfo.datebirth : this.birthDayStr
				}, this.token).then(res => {
					if (res[1].data.code == 204) {
						uni.showToast({
							title: '修改成功'
						})
						setTimeout(() => {
							uni.hideToast();
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					}
				})
			}
 		}
	}
</script>

<style scoped lang="scss">
	@import './setUser.scss';
</style>
