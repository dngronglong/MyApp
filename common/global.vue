<script>
	const url="https://mm.sharegd.xyz/";
	const path=["/0:/","/1:/","/2:/"];
	const nums="/0:/";
	const current=0;
	const password=null;
	//获取网盘列表
	function driveList(){
		let list=[];
		uni.request({
		        url: url+path[0],
				method: "POST",
				header: {
					origin: 'https://mm.sharegd.xyz'
				}
		    })
		    .then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
		        var [error, res]  = data;
		        console.log(res.data);
		    })
	}
	//格式化时间
	function format(fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "h+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	export default{
		url,
		path,
		driveList,
		format,
		nums,
		password,
		current
	}
</script>
