var map = new AMap.Map("container", {
	resizeEnable: true
});

map.on('click', function(e) {
	openInfo();
});
function openInfo(){
	document.getElementById('info').style.display='block';
}
function closeInfo() {
	document.getElementById('info').style.display='none';
}

document.getElementById("clickOn").onclick = openInfo;
document.getElementById("clickOff").onclick = closeInfo;