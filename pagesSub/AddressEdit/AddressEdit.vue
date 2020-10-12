<template>
	<view class="page">
		<view class="address-input">
			<view class="list-input">
				<view class="title">
					<text>收货人</text>
				</view>
				<view class="content">
					<input type="text" :value="addressObj.recipients" placeholder="请填写收货人姓名" @input="recipientsHandel($event)"/>
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>手机号</text>
				</view>
				<view class="content">
					<input type="tel" :value="addressObj.tel" placeholder="请填写收货人手机号" @input="telHandel($event)"/>
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>所在地区</text>
				</view>
				<picker mode="region" :range="years" @change="yearChange">
					<view style="color:#555;font-size:26rpx;">{{ timetext }}</view>
				</picker>
			</view>
			<view class="list-textarea">
				<view class="title">
					<text>详细地址</text>
				</view>
				<view class="content">
					<textarea type="tel" placeholder="街道/楼牌号等" :value="addressObj.address" @input="addressHandel($event)"/>
				</view>
			</view>
		</view>
		<view class="tag-default">
			<view class="deleteAddress" @tap="deleteAddress()" v-show="addressType === '1'">
				<text>删除地址</text>
			</view>
		</view>
		<view class="footer-btn">
			<view class="btn" @tap="save">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { reviseAddress, deleteAddress, addAddress } from '../../api/users/address.js';
	export default {
		data() {
			return {
				addressType: '', // 判断是否是编辑地址或新增地址
				addIndex: null, // 地址列表的index
				timetext: '请选择地区', 
				province: '', // 省
				city: '', // 市
				area: '', // 区
				address: '', // 详细地址
				recipients: '', // 收件人
				tel: '', // 手机号
				token: '', //用户token
				addressObj: {}
			}
		},
		methods: {
			// 详情地址的
			addressHandel(e) {
				this.address = e.target.value;
			},
			// 手机号
			telHandel(e) {
				this.tel = e.target.value;
			},
			// 收货人姓名
			recipientsHandel(e) {
				this.recipients = e.target.value;
			},
			// 新建地址或者编辑地址
			save() {
				// this.addressType == 1 时是编辑地址
				if (this.addressType === '1') {
					reviseAddress({
						province: this.province || this.addressObj.province,
						city: this.city || this.addressObj.city,
						area: this.area || this.addressObj.area,
						address: this.address || this.addressObj.address,
						recipients: this.recipients || this.addressObj.recipients,
						tel: this.tel || this.addressObj.tel,
						index: this.addIndex
					},this.token).then((res)=>{
						let resData = res[1];
						let { data } = resData;
						if (data.code == 204) {
							this.Toast('修改成功')
							uni.navigateBack();
						}
					})
				}
				// this.addressType == 2 时是新增地址
				if (this.addressType === '2') {
					addAddress({
						province: this.province,
						city: this.city,
						area: this.area,
						address: this.address,
						recipients: this.recipients,
						tel: this.tel
					},this.token).then((res)=>{
						let resData = res[1];
						let { data } = resData;
						if (data.code == 204) {
							this.Toast('添加成功')
							uni.navigateBack();
						}
					})
				}
			},
			// 获取地区
			yearChange (e){
				this.timetext = e.detail.value.join('/');
				this.province = e.detail.value[0];
				this.city = e.detail.value[1];
				this.area = e.detail.value[2];
			},
			// 删除地址
			deleteAddress() {
				deleteAddress({
					index: this.addIndex
				},this.token).then((res)=>{
					let resData = res[1];
					let { data } = resData;
					if (data.code == 204) {
						this.Toast('删除成功');
						uni.navigateBack();
					}
				})
			},
			// 对弹框的封装
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
		onLoad(params) {
			if (params.address) {
				this.addressObj = JSON.parse(params.address);
				this.timetext = this.addressObj.province + '/' + this.addressObj.city + '/' + this.addressObj.area;
			}
			this.addressType = params.type || '2';
			this.addIndex = params.index;
			uni.setNavigationBarTitle({
				title: this.addressType === '1' ? '编辑收货地址':'新建收货地址'
			})
		},
		onShow() {
			let that = this;
			uni.getStorage({
				key: 'token',
				success(res) {
					that.token = res.data;
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.page{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	
	.address-input{
		width: 100%;
		background-color: #FFFFFF;
		.list-input{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 100rpx;
			border-bottom: 2rpx solid #f6f6f6;
			.title{
				display: flex;
				align-items: center;
				width: 20%;
				height: 100%;
				text{
					color: #222222;
					font-size: 26rpx;
				}
			}
			.content{
				display: flex;
				align-items: center;
				width: 70%;
				height: 100%;
				input{
					width: 100%;
					height: 100%;
					font-size: 26rpx;
					color: #222222;
				}
			}
		}
		.list-textarea{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 200rpx;
			border-bottom: 2rpx solid #f6f6f6;
			.title{
				display: flex;
				width: 20%;
				height: 80%;
				text{
					color: #222222;
					font-size: 26rpx;
				}
			}
			.content{
				display: flex;
				align-items: center;
				width: 70%;
				height: 100%;
				textarea{
					width: 100%;
					height: 80%;
					font-size: 26rpx;
					color: #222222;
				}
			}
		}
	}
	
	.tag-default{
		width: 100%;
		border-top: 20rpx solid #f6f6f6;
		.deleteAddress{
			padding:0 4%;
			margin:20rpx 0rpx;
			color:#f40;
		}
	}
	
	.footer-btn{
		position: fixed;
		left: 0;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80%;
			height: 70rpx;
			background: linear-gradient(to right,$base,$change-clor);
			border-radius: 70rpx;
			box-shadow: 0 10rpx 10rpx $base;
			text{
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
