<template>
	<view class="login">
		<view class="logo">
			<image src="../../static/imags/logo2.jpg" class="logoImg margin"></image>
		</view>
		<view class="mailbox">
			<input type="text" class="maliboxInput margin" placeholder="请输入新密码" v-model="newPassword" @input="newPassHandel($event)">
			<text class="error margin" v-if="newPassFlag">长度为8-16位字母+特殊符号</text>
			<input type="text" class="maliboxInput margin" placeholder="请确认密码" v-model="confirmPassword" @input="confirmPassHandel($event)">
			<text class="error margin" v-if="confirmPassFlag">密码不对应</text>
		</view>
		<view class="send">
			<button class="sendEali" @tap="login">去登陆</button>
		</view>
	</view>
</template>

<script>
	import { modifyPass } from '../../api/users/user.js';
	export default {
		data() {
			return {
				newPassFlag: false, // 新密码错误的显示和隐藏
				passFlag: false, // 密码不正确的显示和隐藏
				confirmPassFlag: false, // 邮箱不正确的显示和隐藏
				passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,  // 密码的正则
				newPassword: '', // 新密码的双向绑定
				confirmPassword: '', // 确认密码的双向绑定
				flag: true, // 登录按钮的防抖
				res: null
			}
		},
		methods: {
			// 新密码的事件处理函数
			newPassHandel(e) {
				if (!(this.passReg.test(e.target.value))) {
					this.newPassFlag = true;
				} else {
					this.newPassFlag = false;
				}
			},
			// 确认密码的事件处理函数
			confirmPassHandel(e) {
				if (this.newPassword != e.target.value) {
					this.confirmPassFlag = true;
				} else {
					this.confirmPassFlag = false;
				}
			},
			// 登录函数
			login () {
				if (this.passReg.test(this.newPassword) && this.passReg.test(this.confirmPassword) && this.newPassword != '' && this.confirmPassword != '') {
					if (this.flag) {
						this.flag = false;
						modifyPass({
							newpass: this.newPassword,
							uuid: this.res.data,
							email: this.res.email
						}).then((res)=>{
							let resData = res[1];
							let { data } = resData;
							if (data.code == 204) {
								this.Toast('修改成功');
								setTimeout(()=>{
									uni.redirectTo({
										url: '../login/login'
									})
								},2000)
							} else if (data.code == 414) {
								this.Toast('服务器有问题请稍后重试','none')
							}
						})
						setTimeout(()=>{
							this.flag = true;
						},5000);
					}
				} else {
					console.log('出问题了')
				}
			},
			// 对弹窗进行封装
			Toast(title, icon) {
				uni.showToast({
					title: title,
					icon: icon
				})
				setTimeout(()=>{
					uni.hideToast()
				},2000)
			}
		},
		onLoad(data) {
			console.log(data)
			this.res = data;
		}
	}
</script>

<style>
	.logoImg{
		height:100rpx;
		margin:30rpx auto;
		display:block;
		width:75%;
	}
	.maliboxInput{
		width:75%;
		height:100rpx;
		border:none;
		font-size:32rpx;
		border-bottom:1px solid #EBEEF7;
	}
	.error{
		color:#f00;
		font-size:28rpx;
		width:75%;
		margin-top:20rpx;
		display:block;
	}
	.send{
		width:100%;
	}
	.sendEali{
		width:75%;
		height:80rpx;
		text-align:center;
		border-radius:10rpx;
		color:#999;
		background:#A6DBFB;
		margin:20rpx auto;
	}
	.login{
		font-size:28rpx;
	}
	.mailbox>view{
		margin-top:20rpx;
		margin-bottom:20rpx;
	}
</style>

