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

var info_vm = {
    GLOBALIP: '',
	findUrl: '',
	baiduAk: '',
	flagEcharts: true,
	timers: {},
	callbackAutoShow: function() {},
	listingsData: {},
	cs_info_init: function() {
    },
	info_button:function() {
		var nowDate = new Date();
		var hour = nowDate.getHours().toString();
		var key = keys['info-hour'+hour];
		var url = 'https://restapi.amap.com/v3/traffic/status/rectangle?' +
					'rectangle=116.351147,39.966309;116.357134,39.968727&&key=' + key;
		$.ajax({
			type: 'GET',
			async: false,
			data: {},
			url: url,
			dataType: 'json',
			success: function (data) {
				console.log(data);
				return data;
			},
			error: function () {
				console.log("加载错误");
			}
		});
	},
	info_show_data:function(logi,lati) {
		var nowDate = new Date();
		var hour = nowDate.getHours().toString();
		var key = keys['info-hour'+hour];
		var url = 'https://restapi.amap.com/v3/traffic/status/rectangle?' +
					'rectangle=116.351147,39.966309;116.357134,39.968727&&key=' + key;
		$.ajax({
			type: 'GET',
			async: false,
			data: {},
			url: url,
			dataType: 'json',
			success: function (data) {
				console.log(data);
				return data;
			},
			error: function () {
				console.log("加载错误");
			}
		});
	},
};


function info_timing(){

}
$(function () {
    info_vm.cs_info_init();
});