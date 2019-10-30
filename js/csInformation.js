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
				console.log(data);
				info_vm.table_info(bound,data);
				return data;
			},
			error: function () {
				console.log("加载错误");
			}
		});
	},
	table_info:function(bound,data){
		// var device_state_info = '<tr>\n' +
		// 	'\t\t\t<th>区域</th>\n' +
		// 	'\t\t\t<th>描述</th>\n' +
		// 	'\t\t\t<th>畅通占比</th>\n' +
		// 	'\t\t\t<th>缓行占比</th>\n' +
		// 	'\t\t\t<th>拥堵占比</th>\n' +
		// 	'\t\t\t<th>未知占比</th>\n' +
		// 	'\t\t</tr>';
		// device_state_info += '<tr></tr>>';
		var traf_info = data.trafficinfo;
		var evaluation = traf_info.evaluation;
		var ex = data;
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
		a4.innerHTML = evaluation.congested;
		a5.innerHTML = evaluation.blocked;
		a6.innerHTML = evaluation.unknown;
	}
};

$(function () {
    info_vm.cs_info_init();
});