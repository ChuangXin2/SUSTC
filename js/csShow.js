var map = new AMap.Map("container", {
	resizeEnable: true
});
    //为地图注册click事件获取鼠标点击出的经纬度坐标
map.on('click', function(e) {
	var a=document.getElementById('t1');
	var a0=a.insertRow(-1);
	var a1=a0.insertCell(0);
	var a2=a0.insertCell(1);
	a1.innerHTML = e.lnglat.getLng();
	a2.innerHTML = e.lnglat.getLat();
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