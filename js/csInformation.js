var keys = {
	"info-hour1":"55b5c532f41cda833338735982e156a0",
	"info-hour2":"4bf675666ef3716cf0c78eafb22c172c",
	"info-hour3":"b8b5a0ea842e01800f4d41b2ea5264e6",
	"info-hour4":"9dc43fbd8fe2d77a2be5c839bb8b0d63",
	"info-hour5":"cd16da37bc74816e7481de803a46d148",
	"info-hour6":"5989c44a7ad03e66e4ab9112af7c9206",
	"info-hour7":"8a490c31be45559b4c880f9ac9996145",
	"info-hour8":"b8ab9ef8c8b80bf784754196b27a0bec",
	"info-hour9":"c0ac36cf13fc327203e18939dd859fb9",
	"info-hour14":"57c0e2e033ba005979d295567c6fd0c0",
};
const jsonData = [];
var downloadData = [];
var arr_info = ['block_Id','bound','block_des','description','expedite','congested','blocked','unknown','status'];
var arr_info1 = ['expedite','congested','blocked','unknown'];

var info_vm = {
    GLOBALIP: '',
	findUrl: '',
	baiduAk: '',
	flagEcharts: true,
	timers: {},
	callbackAutoShow: function() {},
	listingsData: {},
	cs_info_init: function() {
        // $('.window').append(`<div class="pop_close" id="rc_pop_device_state_close"></div>`);
    },
	info_show_data:function(bound) {
		var nowDate = new Date();
		var hour = nowDate.getHours().toString();
		var key = keys['info-hour'+1];
		var url = 'https://restapi.amap.com/v3/traffic/status/rectangle?rectangle='+bound+'&&key=' + key;
		$.ajax({
			type: 'GET',
			async: false,
			data: {},
			url: url,
			dataType: 'json',
			success: function (data) {
				info_vm.table_info(bound,data);
				new_bound = '（' + bound.northeast.P + '，' + bound.northeast.R + '）；（' +
							bound.southwest.P + '，' + bound.southwest.R + '）';
				var traf_info = data.trafficinfo;
				var evaluation = traf_info.evaluation;
				var info = {
					new_bound:new_bound,
					area_description:traf_info.description,
					description:evaluation.description,
					expedite:evaluation.expedite,
					congested:evaluation.congested,
					blocked:evaluation.blocked,
					unknown:evaluation.unknown,
					status:evaluation.status
				};
				jsonData.push(info);
				// console.log(jsonData);
				// console.log(new_bound);
				return data;
			},
			error: function () {
				console.log("加载错误");
			}
		});
	},
	table_info:function(bound,data){
		var traf_info = data.trafficinfo;
		var evaluation = traf_info.evaluation;
		var a=document.getElementById('t1');
		var a0=a.insertRow(-1);
		var a1=a0.insertCell(0);
		var a2=a0.insertCell(1);
		var a3=a0.insertCell(2);
		var a4=a0.insertCell(3);
		var a5=a0.insertCell(4);
		var a6=a0.insertCell(5);
		boundstr = ""+bound;
		boundspl = boundstr.split(';');
		a1.innerHTML = boundspl[0]+"<br />"+boundspl[1]+"<br />";
		a2.innerHTML = traf_info.description;
		a3.innerHTML = evaluation.expedite;
		expedite_str = ""+evaluation.expedite;
		expedite_f = parseFloat(expedite_str)/100;
		if(expedite_f >= 0.75){
			addbing1();
		}			
		else {
			addbing2();
		}
		a4.innerHTML = evaluation.congested;
		a5.innerHTML = evaluation.blocked;
		a6.innerHTML = evaluation.unknown;
	},
	row_delete:function(bound){
		boundstr = ""+bound;
		boundspl = boundstr.split(';');
		a_bounds = boundspl[0]+""+boundspl[1];
		var t_size = $("#t1").find("tr").length;
		var f_row = 0;
		for(i = 0; i < t_size-1; i++){
			var f_bounds = $("#t1 tr:gt(0):eq("+i+") td:eq(0)").text();
			if(f_bounds == a_bounds){
				f_row = i;
				break;
			}
		}
		expedite_str = $("#t1 tr:gt(0):eq("+f_row+") td:eq(2)").text();
		expedite_f = parseFloat(expedite_str)/100;
		if(expedite_f >= 0.75){
			minbing1();
		}			
		else {
			minbing2();
		}
		$("#t1 tr:gt(0):eq("+f_row+")").remove();
		jsonData.pop(f_row);
		blocks.pop(f_row);
		// console.log(jsonData);
	},
	choose_row_col: function (){
		var r_left = $('#rLeft').val();
		var r_right = $('#rRight').val();
		var c_up = $('#cUp').val();
		var c_down = $('#cDown').val();
		if (parseInt(r_left) > parseInt(r_right)){
			var r_temp = r_right;
			r_right = r_left;
			r_left = r_temp;
		}
		if (parseInt(c_up) > parseInt(c_down)){
			var c_temp = c_up;
			c_up = c_down;
			c_down = c_temp;
		}
		if(parseInt(c_up) > 60 || parseInt(r_left) > 60){
			alert("选择失败")
		}else{
			if(parseInt(c_down) > 60) c_down = 60;
			if(parseInt(r_right) > 60) r_right = 60;
			//alert(r_left+" "+r_right+" "+c_up+" "+c_down);
			quickchoose(r_left, r_right, c_up, c_down);
 		}
	},
    table_info_download1: function () {
    	info_vm.get_data();
		var len = downloadData[0].length;
		var len_info = arr_info.length;
		for(var l=0;l<len;l++){
			var Str = `block id,bound,area description,description,expedite,congested,blocked,unknown,status\n`;
			for(var i=0;i<downloadData.length;i++ ){
				for(var j=0;j<len_info;j++){
					Str += `${downloadData[i][l][arr_info[j]] + '\t'},`;
				}
				Str += '\n';
			}
			var url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(Str);
			var download = document.createElement('a'); // 转换完成，创建一个a标签用于下载
			var date = downloadData[0][l]['reg_date'];
			download.download = '车流信息_' + date + '.xls';
			download.href = url; // 转成本地连接到blob文本
			document.body.appendChild(download);
			download.click();
			// 然后移除
			document.body.removeChild(download);
		}
	},
    table_info_download2: function () {
    	info_vm.get_data();
		// console.log(downloadData);
    	var block_size = blocks.length;
    	var len = arr_info1.length;
    	for(var l=0;l<len;l++) {
    		var Str = 'block id';
			// var Str = `block id,bound,area description,description,expedite,congested,blocked,unknown,status\n`;
    		for(s=0;s<block_size;s++){
    			Str += ','+blocks[s];
			}
    		Str += '\n';
			for(var i = 0 ; i < downloadData[0].length ; i++ ){
				Str += downloadData[0][i]['reg_date']+',';
				for(var j=0;j<block_size;j++){
					Str += `${downloadData[j][i][arr_info1[l]] + '\t'},`;
				}
				Str += '\n';
			}
			var url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(Str);
			// var blob = new Blob([this.response],{type: 'application/vnd.ms-excel'});
			// var href = window.URL.createObjectURL(blob); // 创建下载的链接
			var download = document.createElement('a'); // 转换完成，创建一个a标签用于下载
			var nowDate = new Date();
			var date = '' + nowDate.getFullYear() + (nowDate.getMonth()+1) + nowDate.getDate();
			date += '_' + nowDate.getHours() + nowDate.getMinutes() + nowDate.getSeconds();
			download.download = '车流信息_' + arr_info1[l] + '.xls';
			download.href = url; // 转成本地连接到blob文本
			document.body.appendChild(download);
			download.click();
			// 然后移除
			document.body.removeChild(download);
		}
	},
	get_data: function(){
    	downloadData = [];
    	var time1 = info_vm.get_time1();
    	var time2 = info_vm.get_time2();
		for(i=0;i<blocks.length;i++){
			var uploadData = {
				"block_Id":blocks[i],
				"time1":time1,
				"time2":time2
			};
			var json =JSON.stringify(uploadData);
			$.ajax({
				type: 'POST',
				async: false,
				data: 'info='+json,
				url: 'php/getinfo.php',
				dataType: 'json',
				success: function (data) {
					downloadData.push(data);
					// console.log(data);
					return data;
				},
				error: function () {
					console.log("加载错误");
				}
			});
		}
		// console.log(downloadData);
	},
	get_time1: function(){
		var ymd1 = $('#ymd').val();
		var hour1 = document.getElementById("hour1").value;
		var minute1 = document.getElementById("minute1").value;
		var time1 = ymd1+' '+hour1+':'+minute1+":00";
		return time1;
	},
	get_time2: function(){
		var ymd2 = $('#ymd2').val();
		var hour2 = document.getElementById("hour2").value;
		var minute2 = document.getElementById("minute2").value;
		var time2 = ymd2+' '+hour2+':'+minute2+":00";
		return time2;
	}
};

$(function () {
    info_vm.cs_info_init();
});