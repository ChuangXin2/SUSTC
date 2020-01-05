var map = new AMap.Map("container", {
	resizeEnable: true
});

map.on('click', function(e) {
	openInfo();
});
function openInfo(){
	closeInfo2();
	closeInfo3();
	document.getElementById('info').style.display='block';
	document.getElementById('bingPic').style.display='block';
}
function closeInfo() {
	document.getElementById('info').style.display='none';
	document.getElementById('bingPic').style.display='none';
}
function openInfo2(){
	closeInfo();
	closeInfo3();
	getYMD();
	document.getElementById('download').style.display='block';
}
function closeInfo2() {
	document.getElementById('download').style.display='none';
}
function openInfo3(){
	closeInfo();
	closeInfo2();
	document.getElementById('choose').style.display='block';
}
function closeInfo3() {
	document.getElementById('choose').style.display='none';
}
function getYMD() {
	var date = new Date();
	var Y = date.getFullYear();
    var M = date.getMonth()+1;
	var D = date.getDate();
	document.getElementById('ymd').value=Y+'-'+M+'-'+D;
	document.getElementById('ymd2').value=Y+'-'+M+'-'+D;
}
document.getElementById("clickOn").onclick = openInfo;
document.getElementById("clickOff").onclick = closeInfo;
document.getElementById("clickOn2").onclick = openInfo2;
document.getElementById("clickOn3").onclick = openInfo3;
