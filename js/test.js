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
var descrip = ['整体畅通','轻度拥堵','整体拥堵',''];


function TestInsert() {
		var time1 = '2020-01-06 10:40:00';
		var time2 = '2020-01-06 11:10:00';
		var uploadData = {
			"block_Id":1,
			"time1":time1,
			"time2":time2
		};
		var json =JSON.stringify(uploadData);
			console.log(time1);
		console.log(time2);
		$.ajax({
			type: 'POST',
			async: false,
			data: 'info='+json,
			url: 'php/getinfo.php',
			dataType: 'json',
			success: function (data) {
				console.log(data);
				return data;
			},
			error: function () {
				console.log("加载错误");
			}
		});
				// var uploadData = {
				// 	"block_Id":1,
				// };
				// var json =JSON.stringify(uploadData);
				// var xhr = new XMLHttpRequest;
				// xhr.open('post', 'php/newinsert.php');
				// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				// xhr.send("info=" + json);
				// xhr.onreadystatechange = function() {
				// 	if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status ==304))  //响应完成并且响应码为200或304
				// 		console.log(xhr.responseText);
				// };
}

function TestGet() {
    var init_x = 116.081887;
    var init_x1 = 116.090896;
    var init_y = 40.278241;
    var init_y1 = 40.269232;
	var dif_x = init_x1 - init_x;
	var dif_y = init_y1 - init_y;
	var x_start = init_x;
	var y_start = init_y;

	var reg_date = new Date();
	reg_date.setDate(1);
	reg_date.setHours(0);
	reg_date.setMinutes(0);
	reg_date.setSeconds(0);
	var month,date,hour,minutes;
	reg_date.setHours(reg_date.getHours()+0);
	var time_lim = 6*12*24;
	for(t=0;t<time_lim;t++) {
		month = reg_date.getMonth()+1;
		if(month<10){
			month = '0'+month;
		}
		date = reg_date.getDate();
		if(date<10){
			date = '0'+date;
		}
		hour = reg_date.getHours();
		if(hour<10){
			hour = '0'+hour;
		}
		minutes = reg_date.getMinutes();
		if(minutes<10){
			minutes = '0'+minutes;
		}
		var date = reg_date.getFullYear()+'-'+month+'-'+date+' '+hour+':'+minutes+':00';
		console.log(date);
		var arr = func_random();
		var block_des = descrip[arr[5]];
		var description = descrip[arr[5]];
		var expedite = arr[0];
		var congested = arr[1];
		var blocked = arr[2];
		var unknown = arr[3];
		var status = arr[4];
		for(i=0;i<3;i++) {
			for(j=0;j<3;j++) {
				// console.log("block_Id:",i*60+j+1);
				var new_x = init_x+dif_x*i;
				var new_y = init_y+dif_y*j;
				var bound = new_x+','+new_y+';'+(new_x+dif_x)+','+(new_y+dif_y);
				var uploadData = {
					"block_Id":i*60+j+1,
                    "block_des":block_des,
					"description":block_des,
					"expedite":expedite,
					"congested":congested,
					"blocked":blocked,
					"unknown":unknown,
					"status":status,
					"bound":bound,
					"reg_date":date
				};
				var json =JSON.stringify(uploadData);
				var xhr = new XMLHttpRequest;
				xhr.open('post', 'php/insert.php');
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send("info=" + json);
				xhr.onreadystatechange = function() {
					// if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status ==304))  //响应完成并且响应码为200或304
					// 	console.log(xhr.responseText);
				};
			}
		}
		reg_date.setMinutes(reg_date.getMinutes()+5);
	}
}

function func_random() {
	var arr=new Array(6);
	var limit = 100;
	Math.random();
	arr[0] = Math.floor((Math.random()*100)+1);
	arr[1] = Math.floor((Math.random()*100)+1);
	arr[2] = Math.floor((Math.random()*100)+1);
	arr[3] = Math.floor((Math.random()*100)+1);
	var total = arr[0] + arr[1] + arr[2] + arr[3];
	arr[0] = arr[0]/total*100;
	arr[1] = arr[1]/total*100;
	arr[2] = arr[2]/total*100;
	arr[3] = arr[3]/total*100;
	arr[0] = arr[0].toFixed(2)+"%";
	arr[1] = arr[1].toFixed(2)+"%";
	arr[2] = arr[2].toFixed(2)+"%";
	arr[3] = arr[3].toFixed(2)+"%";
	arr[4] = Math.floor((Math.random()*3)+1);
	arr[5] = Math.floor((Math.random()*4));
	return arr;
}