<script>
		export default {
			// 全局配置
			common:{
				baseUrl:"https://mm.sharegd.xyz",
				header:{
					'Content-Type':'application/json;charset=UTF-8',
				},
				data:{},
				method:'GET',
				dataType:'json'
			},
			// 请求 返回promise
			request(options = {}){
				// 组织参数
				options.url = this.common.baseUrl + options.url
				options.header = options.header || this.common.header
				options.data = options.data || this.common.data
				options.method = options.method || this.common.method
				options.dataType = options.dataType || this.common.dataType
				
				// token 如果需要携带token
				
				// if (options.token) {
				// // token存哪可自行定义
				// 	options.header.token =  uni.getStorageSync('token')
				// 	// 二次验证  判断是否登录 或者token过期
				// 	if (options.checkToken && !options.header.token) {
				// 		uni.showToast({
				// 			title: '请先登录',
				// 			icon: 'none'
				// 		});
				// 		return uni.navigateTo({
				// 			url: '/pages/login/login',
				// 		});
				// 	}
				// }
				
				// 请求
				return new Promise((res,rej)=>{
					// 请求之前... todo
					// 请求中...
					uni.request({
						...options,
						success: (result) => {
							console.log("请求地址："+options.url)
							console.log("请求参数："+JSON.stringify(options.data))
							// 返回原始数据
							if(options.native){
								return res(result)
							}
							// 服务端失败
							if(result.statusCode !== 200){
								if (options.toast !== false) {
									uni.showToast({
										title: result.data.msg || '服务端失败',
										icon: 'none'
									});
								}
								return rej(result.data) 
							}
							// 成功
							let data = result.data.data
							console.log(result.data)
							res(data)
						},
						fail: (error) => {
							console.log(error)
							uni.showToast({
								title: error.errMsg || '请求失败',
								icon: 'none'
							});
							return rej()
						}
					});
				})
			},
			// get请求
			get(url,data = {},options = {}){
				options.url = url
				options.data = data
				options.method = 'GET'
				return this.request(options)
			},
			// post请求
			post(url,data = {},options = {}){
				options.url = url
				options.data = data
				options.method = 'POST'
				return this.request(options)
			},
			// delete请求
			del(url,data = {},options = {}){
				options.url = url
				options.data = data
				options.method = 'DELETE'
				return this.request(options)
			},
		}
	</script>