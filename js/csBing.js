var bing1 = 0;
var bing2 = 0;


function drawCircle(canvasId, data_arr, color_arr, text_arr)  
{  
    var c = document.getElementById(canvasId);  
    var bingPic = c.getContext("2d");  
    bingPic.fillStyle="#ffffff";
    bingPic.fillRect(0,0,210,100);
    var radius = c.height / 2 - 20; //半径  
    var ox = radius + 20, oy = radius + 20; //圆心 
  
    var width = 30, height = 10; //图的宽和高
    var posX = ox * 2 + 20, posY = 30;   //  
    var textX = posX + width, textY = posY + 10;  
  
    var startAngle = -Math.PI/2;  
    var endAngle = -Math.PI/2;   
    for (var i = 0; i < data_arr.length; i++)  
    {  
    //设置参数 
        endAngle = endAngle + data_arr[i] * Math.PI * 2; 
        bingPic.fillStyle = color_arr[i];  
        bingPic.beginPath();  
        bingPic.moveTo(ox, oy); //移到圆心 
        bingPic.arc(ox, oy, radius, startAngle, endAngle, false);  
        bingPic.closePath();  
        bingPic.fill();  
        startAngle = endAngle; 
  
        bingPic.fillStyle = color_arr[i];  
        bingPic.fillRect(posX, posY + 20 * i, width, height);  
        bingPic.moveTo(posX, posY + 20 * i); 
		bingPic.font = '20px 微软雅黑';
        bingPic.fillStyle = color_arr[i]; //"#000000";  
        var percent = text_arr[i];  		
        bingPic.fillText(percent, textX, textY + 20 * i);  
    }  
} 
function addbing1(){ bing1 = bing1+1;} 
function addbing2(){ bing2 = bing2+1;} 
function minbing1(){ bing1 = bing1-1;} 
function minbing2(){ bing2 = bing2-1;}

function bing_change() {
	//cav.clearRect(0,0,210,100)
	var bingtotal = bing1 + bing2;
	var red = 0
	var green = 0
	if(bingtotal > 0){
		green = bing1/bingtotal;
		red = 1-green;
	}
	var data_arr = [red,green];  
	var color_arr = ['RED','GREEN'];  
	var text_arr = ["拥堵"+bing2, "通畅"+bing1];
		
	drawCircle("canvas_circle", data_arr, color_arr, text_arr); 
}
function bing_init() {   
    var data_arr = [0,0];  
    var color_arr = ['RED','GREEN'];  
    var text_arr = ["拥堵"+bing2, "通畅"+bing1];  
  
    drawCircle("canvas_circle", data_arr, color_arr, text_arr);  
}

$(function () {
    bing_init();
});