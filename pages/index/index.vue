<template>
	<view>
		<u-tabs v-if="flag" :list="drives" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-cell-group v-for="(item,i) in files" :key="item.id">
			<!-- <u-cell-item icon="setting-fill" title="个人设置" @click="test"></u-cell-item> -->
			<u-cell-item v-if="item.mimeType=='application/vnd.google-apps.folder'" icon="coupon" :title="item.name" @tap="open(item)"
			 :value="item.modifiedTime"></u-cell-item>
			<u-cell-item v-else-if="item.mimeType=='image/jpeg'" icon="photo" :title="item.name" @tap="open(item)" :value="item.modifiedTime"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drives: [{
						name: "妹子",
						current: 0
					},
					{
						name: "绝对领域",
						current: 1
					},
					{
						name: "群资源",
						current: 2
					}
				],
				files: [],
				current: 0,
				flag: true,
				path: ''
			}
		},
		onLoad() {
			//获取首页数据列表
			// this.$Global.driveList()

			this.getData(this.current)
			// console.log(this.drives)
		},
		methods: {
			async getData(current) {
				uni.showLoading({
					title: '加载中！',
					mask: true
				})
				this.files = []
				let driveList = await this.$http.post(this.$Global.path[current]).then(res => {
					this.flag = true
					this.files = res.files
					console.log(this.files)
					for(let i=0;i<this.files.length;i++){
						// console.log(this.files[i].modifiedTime)
						// console.log(this.$Global.formatDate(this.files[i].modifiedTime))
						this.files[i].modifiedTime=this.$Global.formatDate(this.files[i].modifiedTime)
					}
					uni.hideLoading()
				}).catch(err => {
				})
			},
			change(index) {
				this.current = index;
				this.$Global.current=index
				this.path=''
				this.$Global.nums=this.$Global.path[index]
				this.getData(index)
			},
			open(item) {
				let path = encodeURI(item.name) + '/';
				if(item.mimeType == 'image/jpeg'){
					
				}else{
					this.path += path
					console.log(item.name)
					uni.navigateTo({
					    url: '../page/page?item='+encodeURIComponent(JSON.stringify(this.path))+'&title='+item.name
					});
				}

			}
		}
	}
</script>

<style>
</style>
