<template>
	<view>
		<u-tabs v-if="flag" :list="drives" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-cell-group v-for="(item,i) in list" :key="item.id">
			<!-- <u-cell-item icon="setting-fill" title="个人设置" @click="test"></u-cell-item> -->
			<u-cell-item v-if="item.mimeType=='application/vnd.google-apps.folder'" icon="coupon" :title="item.name" @tap="open(item)"
			 :value="item.modifiedTime"></u-cell-item>
			<u-cell-item v-else-if="item.mimeType=='image/jpeg'" icon="photo" :title="item.name" @tap="open(item)" :value="item.modifiedTime"></u-cell-item>
			<u-cell-item v-else-if="item.mimeType=='video/mp4'" icon="play-circle-fill" :title="item.name" @tap="open(item)" :value="item.modifiedTime"></u-cell-item>
			<u-cell-item v-else icon="order" :title="item.name" @tap="open(item)" :value="item.modifiedTime"></u-cell-item>
		</u-cell-group>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				files: [],
				current: this.$Global.current,
				flag: true,
				path: '',
				page_index: 0,
				page_token: null,
				list: [],
				isLoad: true,
				q: ''
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.title
			})
			let item = JSON.parse(decodeURIComponent(this.$Global.globalPath));
			if(!option.path){
				this.path=item
			}else{
				this.path=item+option.path
			}
			this.getData(this.current)
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			if (!this.page_token) {
				this.loadStatus = 'nomore';
			} else {
				this.getData(this.current);
			}
		},
		methods: {
			//上滑加载更多数据
			loadData(){
				if (this.isLoad) {
					for (let i = 0; i < this.files.length; i++) {
						this.list.push(this.files[i])
					}
				}else {
					this.loadStatus = 'nomore'
				}
			},
			async getData(current) {
				uni.showLoading({
					title: '加载中！',
					mask: true
				})
				this.files = []
				let data = {
					page_index: this.page_index,
					page_token: this.page_token,
					password: this.$Global.password,
					q: this.q
				}
				let driveList = await this.$http.post(this.$Global.path[current]+this.path,data).then(res => {
					this.flag = true
					this.files = res.files
					for(let i=0;i<this.files.length;i++){
						this.files[i].modifiedTime=this.$Global.formatDate(this.files[i].modifiedTime)
					}
					uni.hideLoading()
					this.loadData()
					//设置page_token
					this.page_token = res.nextPageToken
					if (this.page_token) {
						console.log("page_token不为空")
						this.page_index++
					} else {
						this.isLoad = false
					}
				}).catch(err => {
					//TODO
					uni.showToast({
						title: '网络错误，请重试！',
						duration: 2000
					});
				})
			},
			open(item) {
				console.log("文件类型："+item.mimeType)
				console.log(encodeURIComponent(JSON.stringify(this.path)))
				let path = encodeURI(item.name) + '/';
				if(item.mimeType == 'image/jpeg'){
					this.$Global.globalPath=encodeURIComponent(JSON.stringify(this.path))
						uni.navigateTo({
						    url: '../imagesWaterfall/imagesWaterfall?title='+item.name+'&path='+path
						});
					
				}else if(item.mimeType=='application/vnd.google-apps.folder'){
					console.log("文件夹类型")
					this.$Global.globalPath=encodeURIComponent(JSON.stringify(this.path))
					uni.navigateTo({
					    url: '../page/page?title='+item.name+'&path='+path
					});
				}else if(item.mimeType=='video/mp4'){
					uni.showToast({
						title: '视频！',
						duration: 3000
					});
				}
				else{
					uni.showToast({
						title: '暂不支持！',
						duration: 3000
					});
				}
			}
		}
	}
</script>

<style>
</style>
