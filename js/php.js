const newData = [

];

function jsondata(){
	var obj = {
		type: "POST",
		url: "php/welcome.php",
		data: newData,
		dataType: "json",
		success: function (data) {
			alert(data);
			console.log('success',data);
		},
	};
	obj.mimeType = "multipart/form-data";
	obj.contentType = false;
	obj.processData = false;
	$.ajax(obj);
}