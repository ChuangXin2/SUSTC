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
	"info-hour11":"b9580ab1233aa7fc4560bcc4d7260820",
	"info-hour12":"0d7ff34bf9c711dd0b8797a5aa3f3832",
	"info-hour13":"c70a1e55a9a255599dfe9003f06ff720",
	"info-hour14":"a14ce6ad6dc76dde320af540a1e4c26b",
	"info-hour15":"dda23161a7c80bd45095e79f92f03afc",
	"info-hour16":"fbc37f9624a11daf6b3af9ac8fa1918e",
	"info-hour17":"cbbf350d8f94beb0c9f17ae6b92140cb",
	"info-hour18":"4047da50f3d2a224abe6fcadecfd7c99",
	"info-hour19":"b7e48d2982382d5c45177b697b35d8d4",
	"info-hour20":"912b85a9fa16651bc57096db7a58b832",
	"info-hour21":"57c0e2e033ba005979d295567c6fd0c0",
	"info-hour22":"57c0e2e033ba005979d295567c6fd0c0",
	"info-hour23":"57c0e2e033ba005979d295567c6fd0c0",
	"info-hour24":"57c0e2e033ba005979d295567c6fd0c0",
	"info-hour-other":"57c0e2e033ba005979d295567c6fd0c0"
};
function AutoInsert(time) {
	var fix = 1000000;
    var init_x = 116.081887;
    var init_x1 = 116.090896;
    var init_y = 40.278241;
    var init_y1 = 40.269232;
	var dif_x = (fix*init_x1 - fix*init_x)/fix;
	var dif_y = (fix*init_y1 - fix*init_y)/fix;
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
	var uploadData = [];
    var end_date = reg_date.getFullYear()+'-'+month+'-'+date+' '+hour+':'+minutes+':00';
	console.log(end_date);
	var traf_info;
	var evaluation;
	var timeData;
	for(i=time*10;i<time*10+10;i++){
		for(j=0;j<60;j++){
		    var new_x = (init_x*fix+dif_x*j*fix)/fix;
			var new_y = (init_y*fix+dif_y*i*fix)/fix;
			var bound = new_x+','+new_y+';'+((new_x*fix+dif_x*fix)/fix)+','+((new_y*fix+dif_y*fix)/fix);
            var url = 'https://restapi.amap.com/v3/traffic/status/rectangle?rectangle='+bound+'&&key=' + keys["info-hour"+hour];
            $.ajax({
                type: 'GET',
                async: false,
                data: {},
                url: url,
                dataType: 'json',
                success: function (data) {
                    traf_info = data.trafficinfo;
                    if(traf_info == undefined){
                        timeData = {
                            "block_Id":(i*60+j+1),
                            "block_des":'',
                            "description":'',
                            "expedite":'',
                            "congested":'',
                            "blocked":'',
                            "unknown":'',
                            "status":-1,
                            "bound":bound,
                            "reg_date":end_date
                        };
                    }
                    else{
                        evaluation = traf_info.evaluation;
                        if(evaluation.status == "" || evaluation.status == null || evaluation.status == undefined){
                            timeData = {
                                "block_Id":(i*60+j+1),
                                "block_des":'',
                                "description":'',
                                "expedite":'',
                                "congested":'',
                                "blocked":'',
                                "unknown":'',
                                "status":-1,
                                "bound":bound,
                                "reg_date":end_date
                            };
                        }
                        else {
                            timeData = {
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
                        }
                    }
                    if(j==30){
						console.log((i*60+j+1));
						console.log(data);
					}
                    uploadData.push(timeData);
                },
                error: function () {
                    console.log("加载错误");
                }
            });
		}
	}
	var json =JSON.stringify(uploadData);
	$.ajax({
        type: 'POST',
        async: false,
        data: 'info='+json,
        url: 'php/insert.php',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("加载错误");
        }
	});
};

window.onload=function(){
    setInterval(function () {
        console.log("Timing");
        AutoInsert(1);
        AutoInsert(2);
        AutoInsert(3);
        AutoInsert(4);
        AutoInsert(5);
        AutoInsert(6);
    }, 500 * 1000)
};