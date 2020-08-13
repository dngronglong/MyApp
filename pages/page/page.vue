<template>
	<view>
		<u-tabs v-if="flag" :list="drives" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-cell-group v-for="(item,i) in files" :key="item.id">
			<!-- <u-cell-item icon="setting-fill" title="个人设置" @click="test"></u-cell-item> -->
			<u-cell-item v-if="item.mimeType=='application/vnd.google-apps.folder'" icon="coupon" :title="item.name" @click="open(item)"
			 :value="item.modifiedTime"></u-cell-item>
			<u-cell-item v-else-if="item.mimeType=='image/jpeg'" icon="photo" :title="item.name" @click="open(item)" :value="item.modifiedTime"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				files: [],
				current: 0,
				flag: true,
				path: ''
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.title
			})
			let item = JSON.parse(decodeURIComponent(option.item));
			this.path=item
			console.log(item)
			this.getData(this.current)
		},
		methods: {
			async getData(current) {
				uni.showLoading({
					title: '加载中！',
					mask: true
				})
				this.files = []
				let driveList = await this.$http.post(this.$Global.path[current]+this.path).then(res => {
					this.flag = true
					this.files = res.files
					uni.hideLoading()
				}).catch(err => {
					//TODO
					uni.showToast({
						title: '网络错误，请重试！',
						duration: 2000
					});
				})
			},
			open(item) {
				let path = encodeURI(item.name) + '/';
				if(item.mimeType == 'image/jpeg'){
					
				}else{
					this.path += path
					uni.navigateTo({
					    url: '../page/page?item='+encodeURIComponent(JSON.stringify(this.path))+'&title='+item.name
					});
				}
				console.log(this.path)
				//console.log('../imagesWaterfall/imagesWaterfall?item='+encodeURIComponent(JSON.stringify(this.path)+'&title='+item.name))
				//如果是图片
				// if (item.mimeType == 'image/jpeg') {
				// 	uni.navigateTo({
				// 	    url: '../imagesWaterfall/imagesWaterfall?item='+encodeURIComponent(JSON.stringify(this.path))+'&title='+item.name
				// 	});
				// } else if (item.mimeType == 'application/vnd.google-apps.folder') {
				// 	uni.showLoading({
				// 		title: '加载中！',
				// 		mask: true
				// 	})
				// 	this.files = []
				// 	this.$http.post(this.$Global.path[this.$Global.current] + this.path).then(res => {
				// 		this.flag = true
				// 		this.files = res.files
				// 		uni.hideLoading()
				// 	}).catch(err => {
				// 		uni.showToast({
				// 			title: '网络错误，请重试！',
				// 			duration: 2000
				// 		});
				// 	})
				// }
			}
		}
	}
</script>

<style>
</style>
