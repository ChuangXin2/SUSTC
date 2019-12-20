function jsondata(){
	var newData = [ 
		{ 
		"id":"1", 
		"name":"机场高速", 
		"rate":"75.00" 
		}, 
		{ 
		"id":"2", 
		"name":"七圣路", 
		"rate":"50.00" 
		}, 
		{ 
		"id":"3", 
		"name":"西土城路", 
		"rate":"55.00" 
		}, 
		{ 
		"id":"4", 
		"name":"安贞路", 
		"rate":"25.00" 
		}
		];
	var obj = {
		type: "POST",
		url: "php\welcome.php",
		data: newData,
		dataType: "json",
		success: function (data) {
			alert('success',data);
			console.log('success',data);
		},
	};
	obj.mimeType = "multipart/form-data";
	obj.contentType = false;
	obj.processData = false;
	$.ajax(obj);
}