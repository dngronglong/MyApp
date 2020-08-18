<script>
	const url="https://mm.sharegd.xyz/";
	const path=["/0:/","/1:/","/2:/"];
	const nums="/0:/";
	const current=0;
	const password=null;
	const view=["/0:","/1:","/2:"];
	const previewImages=[];
	const globalPath='';
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
	function formatDate(date) {
			  var d = new Date(date),
			    month = '' + (d.getMonth() + 1),
			    day = '' + d.getDate(),
			    year = d.getFullYear();
			 
			  if (month.length < 2) month = '0' + month;
			  if (day.length < 2) day = '0' + day;
			 
			  return [year, month, day].join('-');
			}
	export default{
		url,
		path,
		driveList,
		formatDate,
		nums,
		password,
		current,
		view,
		previewImages,
		globalPath
	}
</script>
