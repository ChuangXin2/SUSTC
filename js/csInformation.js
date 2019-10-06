var info_vm = {
    GLOBALIP: '',
	findUrl: '',
	baiduAk: '',
	flagEcharts: true,
	timers: {},
	callbackAutoShow: function() {},
	listingsData: {},
	ct_left_init: function() {
    },
    sc_info_load_data: function (uploadType, url, uploadData) {
        $.ajax({
            type: uploadType,
            async: false,
            data: uploadData,
            url: url,
            dataType: 'json',
            success: function (data) {
                dot_data = data.data;
                if (data.status == 0) {
                    dot_data = data.data;
                    console.log(dot_data);
                } else {
                    console.log("加载错误");
                }
                return dot_data;
            },
            error: function () {
                console.log("加载错误");
            }
        });
	},
	left_info_button:function() {
		$.ajax({
			type: 'GET',
			async: false,
			data: {},
			url: 'https://restapi.amap.com/v3/traffic/status/rectangle?' +
				'rectangle=116.351147,39.966309;116.357134,39.968727&&key=55b5c532f41cda833338735982e156a0',
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
    info_vm.sc_info_load_data();
});