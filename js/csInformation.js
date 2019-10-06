var keys = {
	"info-hour1":"55b5c532f41cda833338735982e156a0",
	"info-hour2":"4bf675666ef3716cf0c78eafb22c172c",
	"info-hour3":"b8b5a0ea842e01800f4d41b2ea5264e6",
	"info-hour4":"9dc43fbd8fe2d77a2be5c839bb8b0d63",
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
	left_info_button:function() {
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


$(function () {
    info_vm.cs_info_init();
});