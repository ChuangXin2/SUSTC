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
	"info-hour10":"57c0e2e033ba005979d295567c6fd0c0",
};
function AutoInsert() {
    var init_x = 116.081887;
    var init_x1 = 116.090896;
    var init_y = 40.278241;
    var init_y1 = 40.269232;
	var dif_x = init_x1 - init_x;
	var dif_y = init_y1 - init_y;
	var reg_date = new Date();
	var month = reg_date.getMonth()+1;
	if(month<10){
	    month = '0'+month;
	}
	var date = reg_date.getDate();
	if(date<10){
	    date = '0'+date;
	}
	var hour = reg_date.getHours();
	if(hour<10){
	    hour = '0'+hour;
	}
	var minutes = reg_date.getMinutes();
	minutes = minutes - minutes%5;
	if(minutes<10) {
	    minutes = '0' + minutes;
	}
    var end_date = reg_date.getFullYear()+'-'+month+'-'+date+' '+hour+':'+minutes+':00';
	console.log(end_date);
	for(i=0;i<5;i++){
		for(j=0;j<5;j++){
			var new_x = init_x+dif_x*i;
			var new_y = init_y+dif_y*j;
			var bound = new_x+','+new_y+';'+(new_x+dif_x)+','+(new_y+dif_y);
            var uploadData;
            var url = 'https://restapi.amap.com/v3/traffic/status/rectangle?rectangle='+bound+'&&key=' + keys["info-hour1"];
                $.ajax({
                    type: 'GET',
                    async: false,
                    data: {},
                    url: url,
                    dataType: 'json',
                    success: function (data) {
	                    // console.log((i*60+j+1),data);
                        var traf_info = data.trafficinfo;
                        var evaluation = traf_info.evaluation;
                        uploadData = {
                            "block_Id":(i*60+j+1),
                            "block_des":traf_info.description,
                            "description":evaluation.description,
                            "expedite":evaluation.expedite,
                            "congested":evaluation.congested,
                            "blocked":evaluation.blocked,
                            "unknown":evaluation.unknown,
                            "status":evaluation.status,
                            "bound":bound,
                            "reg_date":end_date
                        };
                        var json =JSON.stringify(uploadData);
                        var xhr = new XMLHttpRequest;
                        xhr.open('post', 'php/insert.php');
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhr.send("info=" + json);
                        xhr.onreadystatechange = function() {
                            // if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status ==304))  //响应完成并且响应码为200或304
                            //     alert(xhr.responseText);
                        };
                        return data;
                    },
                    error: function () {
                        console.log("加载错误");
                    }
                });
		}
	}
};

window.onload=function(){
    setInterval(function () {
        AutoInsert();
        console.log("Timing");
    }, 300 * 1000)
};