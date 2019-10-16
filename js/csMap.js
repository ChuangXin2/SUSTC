var center_arrList = [];
var center_pointsObj = {};
var cityObj = {
    'beijing': {
        center: [116.387175, 39.876405],
        left_lng: 115.366776,
        left_lat: 41.086731,
        right_lng: 117.542069,
        right_lat: 39.452238,
        center_left_lng: 116.081887,
        center_left_lat: 40.278241,
        center_right_lng: 116.797011,
        center_right_lat: 39.739227,
    },
    'shanghai': {
        center: [121.473658, 31.230378],
        left_lng: 120.836038,
        left_lat: 31.863975,
        right_lng: 121.973123,
        right_lat: 30.728088,
        center_left_lng: 121.080483,
        center_left_lat: 31.480623,
        center_right_lng: 121.912698,
        center_right_lat: 30.855496,
    },
    'ningbo': {
        center: [121.537022, 29.862141],
        left_lng: 120.88089,
        left_lat: 30.340795,
        right_lng: 122.138824,
        right_lat: 29.018862,
        center_left_lng: 121.183014,
        center_left_lat: 29.970316,
        center_right_lng: 121.930084,
        center_right_lat: 29.225208,
    },
    'guangzhou': {
        center: [113.254143, 23.148238],
        left_lng: 112.957169,
        left_lat: 23.961769,
        right_lng: 114.066788,
        right_lat: 22.467498,
        center_left_lng: 112.990814,
        center_left_lat: 23.649542,
        center_right_lng: 113.836761,
        center_right_lat: 22.907789,
    },
    'nanjing': {
        center: [118.802518, 32.056623],
        left_lng: 118.28616,
        left_lat: 32.595072,
        right_lng: 119.236477,
        right_lat: 31.238284,
        center_left_lng: 118.361691,
        center_left_lat: 32.267045,
        center_right_lng: 119.130734,
        center_right_lat: 31.60041,
    },
    'hangzhou': {
        center: [120.192619, 30.234224],
        left_lng: 118.313957,
        left_lat: 30.528031,
        right_lng: 120.714469,
        right_lat: 29.1942,
        center_left_lng: 119.363151,
        center_left_lat: 30.494904,
        center_right_lng: 120.692497,
        center_right_lat: 29.648745,
    },
    'all': {
        center: [121.537022, 29.862141],
        center_left_lng: 121.183014,
        center_left_lat: 29.970316,
        center_right_lng: 121.930084,
        center_right_lat: 29.225208,
    }
};
//需要拆分网格的城市
var grad_city, left_lng, left_lat, right_lng, right_lat, center_left_lng, center_left_lat, center_right_lng,
    center_right_lat,
    southWest, northEast, center_southWest, center_northEast, map;

var km = 5000;//拆分的公里数
var center_km = 1000;//内部拆分的公里数
var centerkm = 1 / 111;

function init(city) {
    grad_city = city;
    center_left_lng = cityObj[grad_city].center_left_lng;
    center_left_lat = cityObj[grad_city].center_left_lat;
    center_right_lng = cityObj[grad_city].center_right_lng;
    center_right_lat = cityObj[grad_city].center_right_lat;

    center_southWest = new AMap.LngLat(center_left_lng, center_left_lat); //左上
    center_northEast = new AMap.LngLat(center_right_lng, center_right_lat); //右下
    map = new AMap.Map('container', {
        center: cityObj[grad_city].center,
        zoom: 8
    });
    map.on('click', function (e) {
        alert(e.lnglat.getLng() + ',' + e.lnglat.getLat())
    });
    var center_x1 = new AMap.LngLat(center_left_lng, center_left_lat);
    var center_x2 = new AMap.LngLat(center_right_lng, center_left_lat);
    var center_y = new AMap.LngLat(center_left_lng, center_right_lat);
    var center_x_distance = center_x1.distance(center_x2);
    var center_y_distance = center_x1.distance(center_y);
    drawCenterGrad(center_left_lng, center_left_lat, center_right_lng, center_right_lat, center_x_distance, center_y_distance);
}

function drawCenterGrad(center_left_lng, center_left_lat, center_right_lng, center_right_lat, center_x, center_y) {
    var center_x_total = Math.floor(center_x / center_km);//首尾，故点多1
    var center_y_total = Math.floor(center_y / center_km);
    for (var i = 0; i < center_x_total + 1; i++) {
        for (var j = 0; j < center_y_total + 1; j++) {
            _left_lng = center_left_lng + j * centerkm;
            _left_lat = center_left_lat - i * centerkm;
            _right_lng = center_left_lng + j * centerkm + centerkm;
            _right_lat = center_left_lat - i * centerkm - centerkm;
            _southWest = new AMap.LngLat(_left_lng, _left_lat); //左上
            _northEast = new AMap.LngLat(_right_lng, _right_lat); //右下
            drawrectangle(_southWest, _northEast)
        }
    }
}

function drawrectangle(southWest, northEast) {
    var bounds = new AMap.Bounds(southWest, northEast);

    var rectangle = new AMap.Rectangle({
        bounds: bounds,
        strokeColor: '#000000',
        strokeWeight: 1,
        strokeStyle: 'dashed',
        fillColor: 'transparent',
        zIndex: 100,
    });

    rectangle.setMap(map);
    // 缩放地图到合适的视野级别
    //map.setFitView([ rectangle ])

    rectangle.on('click', (data) => {//绑定左键事件
        info_vm.info_show_data(rectangle.getBounds());
        var rectangle2 = new AMap.Rectangle({
            bounds: bounds,
            strokeColor: '#000000',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            fillColor: 'blue',
            fillOpacity: 0.35,
            zIndex: 100,
        });
        rectangle2.setMap(map);
        rectangle2.on('click', (data) => {//绑定左键事件
            map.remove(rectangle2);
        });
    });
};

$(function () {
    init('beijing');
});
