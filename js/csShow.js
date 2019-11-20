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
}
function closeInfo() {
	document.getElementById('info').style.display='none';
}
function openInfo2(){
	closeInfo();
	closeInfo3();
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
document.getElementById("clickOn").onclick = openInfo;
document.getElementById("clickOff").onclick = closeInfo;
document.getElementById("clickOn2").onclick = openInfo2;
document.getElementById("clickOn3").onclick = openInfo3;
