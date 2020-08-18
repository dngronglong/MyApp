<template>
	<view>
		<u-tabs v-if="flag" :list="drives" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-cell-group v-for="(item,i) in files" :key="item.id">
			<!-- <u-cell-item icon="setting-fill" title="个人设置" @click="test"></u-cell-item> -->
			<u-cell-item v-if="item.mimeType=='application/vnd.google-apps.folder'" icon="coupon" :title="item.name" @tap="open(item)"
			 :value="item.modifiedTime"></u-cell-item>
			<u-cell-item v-else-if="item.mimeType=='image/jpeg'" icon="photo" :title="item.name" @tap="open(item)" :value="item.modifiedTime"></u-cell-item>
		</u-cell-group>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
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
				path: '',
				page_index: 0,
				page_token: null,
				list: [],
				isLoad: true,
				q: ''
			}
		},
		onLoad() {
			//获取首页数据列表
			// this.$Global.driveList()

			this.getData(this.current)
			// console.log(this.drives)
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
				let driveList = await this.$http.post(this.$Global.path[current],data).then(res => {
					this.flag = true
					this.files = res.files
					for(let i=0;i<this.files.length;i++){
						// console.log(this.files[i].modifiedTime)
						// console.log(this.$Global.formatDate(this.files[i].modifiedTime))
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
					this.path=''
					this.path += path
					this.$Global.globalPath=encodeURIComponent(JSON.stringify(this.path))
					uni.navigateTo({
					    url: '../page/page?title='+item.name+'&index=1'
					});
				}

			}
		}
	}
</script>

<style>
</style>
