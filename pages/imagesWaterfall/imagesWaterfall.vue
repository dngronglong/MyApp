<template>
	<view class="wrap">
		<u-waterfall v-model="flowList" ref="uWaterfall" v-if="flag">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
					<!-- #ifndef MP-WEIXIN -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.thumbnailLink" :index="index"></u-lazy-load>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="demo-img-wrap">
						<image class="demo-image" :src="item.thumbnailLink" mode="widthFix"></image>
					</view>
					<!-- #endif -->
					<!-- <view class="demo-title">
						{{item.title}}
					</view> -->
					<!-- <view class="demo-price">
						{{item.name}}
					</view> -->
					<!-- <view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
						<view class="demo-tag-text">
							放心购
						</view>
					</view> -->
					<!-- <view class="demo-shop">
						{{item.shop}}
					</view> -->
					<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
					<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<!-- #ifndef MP-WEIXIN -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.thumbnailLink" :index="index"></u-lazy-load>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="demo-img-wrap">
						<image class="demo-image" :src="item.thumbnailLink" mode="widthFix"></image>
					</view>
					<!-- #endif -->
					<!-- <view class="demo-title">
						{{item.title}}
					</view> -->
					<!-- <view class="demo-price">
						{{item.name}}
					</view> -->
					<!-- <view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
						<view class="demo-tag-text">
							放心购
						</view>
					</view> -->
					<!-- <view class="demo-shop">
						{{item.shop}}
					</view> -->
					<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
					<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
				</view>
			</template>
		</u-waterfall>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				flowList: [],
				path: "",
				flag: false,
				files: [],
				page_index: 0,
				page_token: null,
				q: null,
				isLoad: true,
				flags: 1
			}
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			uni.setNavigationBarTitle({
				title: option.title
			})
			let paths = item.split('/');
			let r = paths.filter(function(s) {
				return s && s.trim();
			});
			console.log(paths)
			let path = "";
			for (let i = 0; i < r.length; i++) {
				path += r[i] + '/'
			}
			this.path = this.$Global.nums + path
			this.getData()
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			if (!this.page_token) {
				this.loadStatus = 'nomore';
			} else {
				this.addRandomData();
			}
		},
		methods: {
			addRandomData() {
				if (!this.isLoad && !this.page_token) {
					for (let i = 0; i < this.files.length; i++) {
						// let index = this.$u.random(0, this.list.length - 1);
						let index = this.$u.random(0, this.files.length - 1);
						// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						// let item = JSON.parse(JSON.stringify(this.list[index]))
						let item = JSON.parse(JSON.stringify(this.files[index]))
						item.id = this.$u.guid();
						this.flowList.push(item);
						this.loadStatus = 'nomore';
					}
				} else {
					console.log(222222222)
				}

			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			},
			getData() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				let data = {
					page_index: this.page_index,
					page_token: this.page_token,
					password: this.$Global.password,
					q: this.q
				}
				this.$http.post(this.path, data).then(res => {
					this.files = res.files
					console.log(this.files)
					//设置page_token
					this.page_token = res.nextPageToken
					if (res.nextPageToken != null) {
						this.page_index++
					} else {
						this.isLoad = false
					}
					for (let i = 0; i < this.files.length; i++) {
						if (this.files[i].mimeType == 'application/vnd.google-apps.folder') {
							// this.files.slice(i)
							delete this.files[i]
						}
					}
					this.flag = true
					uni.hideLoading()
					this.addRandomData();
				}).catch(err => {
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			},
			getList() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				let data = {
					page_index: this.page_index,
					page_token: this.page_token,
					password: this.$Global.password,
					q: this.q
				}
				this.$http.post(this.path, data).then(res => {
					this.files = res.files
					//设置page_token
					this.page_token = res.nextPageToken
					if (res.nextPageToken != null) {
						this.page_index++
					} else {
						this.isLoad = false
					}
					for (let i = 0; i < this.files.length; i++) {
						if (this.files[i].mimeType == 'application/vnd.google-apps.folder') {
							// this.files.slice(i)
							delete this.files[i]
						}
					}
					this.flag = true
					uni.hideLoading()
					this.addRandomData();
				}).catch(err => {
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>
