// 导入导出
$("#ct_setting").addClass("ct_setting");
$("#ct_setting").append("<button class='setting_button'></button>" +
    "<div class='setting_box'><span id='setting_import_button'>导入</span>" +
    "<span id='setting_export_button'>导出</span></div>");

$("#setting_import_button").click(function () {
    $("#ct_body").append("<div class='bg_black'></div>");

    $("#ct_setting_window").attr("class", "ct_setting_window_on");

    $("#ct_setting_window").append("<div class='ct_setting_window_all'><div id='ct_setting_window_top'></div>" +
        "<div id='ct_setting_window_bottom'></div></div><div id='ct_setting_window_x'></div>");

    $("#ct_setting_window_x").click(function () {
        $(".bg_black").remove();
        $("#ct_setting_window").empty();
        $("#ct_setting_window").attr("class", "ct_window_off");
    });

    $("#ct_setting_window_top").append("<div id='setting_import_tower' class='setting_window_top'>导入铁塔</div>" +
        "<div id='setting_import_monitor'  class='setting_window_top'>导入监控模块</div>" +
        "<div id='setting_batch_tower'  class='setting_window_top'>批量导入铁塔</div>" +
        "<div id='setting_batch_monitor'  class='setting_window_top'>批量导入监控模块</div>");

    // 导入铁塔
    $("#setting_import_tower").click(function () {
        $(".setting_window_top_on").attr("class", "setting_window_top");
        $("#setting_import_tower").attr("class", "setting_window_top_on");
        $("#ct_setting_window_bottom").empty();
        $("#ct_setting_window_bottom").append("<div id='setting_import_tower_info'></div>" +
            "<div id='setting_import_tower_map'></div>" +
            "<div id='setting_import_tower_button'></div>");

        var setting_import_tower_map = new AMap.Map('setting_import_tower_map', {
            mapStyle: 'amap://styles/macaron', //设置地图的显示样式
            zoom: 12,
            center: [113.94975, 22.53928],
        });
        $("#setting_import_tower_info").append("<form><div class='setting_import_tower_info_left'>" +
            "</div></form>");
        $("#setting_import_tower_button").append("<button id='setting_import_tower_reset'>重置</button>" +
            "<button id='setting_import_tower_submit'>提交</button>");

        $("#setting_import_tower_reset").click(function () {
            $('#setting_import_tower_info input').val("");
        })
    });


    //　导入监控模块
    $("#setting_import_monitor").click(function () {
        $(".setting_window_top_on").attr("class", "setting_window_top");
        $("#setting_import_monitor").attr("class", "setting_window_top_on");
        $("#ct_setting_window_bottom").empty();
        $("#ct_setting_window_bottom").append("<div id='setting_import_monitor_info'></div>" +
            "<div id='setting_import_monitor_map'></div>" +
            "<div id='setting_import_monitor_image'></div>" +
            "<div id='setting_import_monitor_button'></div>");

        var setting_import_tower_map = new AMap.Map('setting_import_monitor_map', {
            mapStyle: 'amap://styles/macaron', //设置地图的显示样式
            zoom: 12,
            center: [113.94975, 22.53928],
        });

        $("#setting_import_monitor_info").append("<form><div class='setting_import_tower_info_left'>" +
            "设备ID：<input type='text' name=''><br>" +
            "设备卡编号：<input type='text' name=''><br>" +
            "所在铁塔编号：<input type='text' name=''><br>" +
            "类型：<input type='text' name=''><br>" +
            "纬度：<input type='text' name=''><br>" +
            "安装情况：<input type='text' name=''><br>" +
            "状态：<input type='text' name=''><br>" +
            "</div><div  class='setting_import_tower_info_right'>" +
            "省份：<input type='text' name=''><br>" +
            "乡街道：<input type='text' name=''><br>" +
            "地市：<input type='text' name=''><br>" +
            "县区：<input type='text' name=''><br>" +
            "经度：<input type='text' name=''><br>" +
            "激活情况：<input type='text' name=''><br>" +
            "上报周期：<input type='text' name=''><br>" +
            "</div>");
        $("#setting_import_monitor_button").append("<button id='setting_import_monitor_reset'>重置</button>" +
            "<button id='setting_import_monitor_submit'>提交</button>");

        $("#setting_import_monitor_image").append("<input type='file' name='image' class='setting_input_image' " +
            "id='setting_input_image1' accept='image/gif,image/jpeg,image/jpg,image/png,image/svg' 'imgPreview(this)'>" +
            "<input type='file' name='image' class='setting_input_image' " +
            "id='setting_input_image2' accept='image/gif,image/jpeg,image/jpg,image/png,image/svg' 'imgPreview(this)'>" +
            "<input type='file' name='image' class='setting_input_image' " +
            "id='setting_input_image3' accept='image/gif,image/jpeg,image/jpg,image/png,image/svg' 'imgPreview(this)'>");

        $("#setting_import_monitor_reset").click(function () {
            $('#setting_import_monitor_info input').val("");
        })
    });

    //　批量导入铁塔模块
    $("#setting_batch_tower").click(function () {
        $(".setting_window_top_on").attr("class", "setting_window_top");
        $("#setting_batch_tower").attr("class", "setting_window_top_on");

        $("#ct_setting_window_bottom").empty();
        $("#ct_setting_window_bottom").append("<div class='setting_batch_window'>" +
            "<input type='file' name='image' class='setting_input_file' " +
            "id='input_file_tower' accept='.xlsx,.xls' 'imgPreview(this)'> " +
            "<br><b class='input_file_txt'>注：仅能识别xls,xlsx文件<b></div>" +
            "<div id='setting_batch_tower_button' class='setting_bottom_box'></div>");

        $("#setting_batch_tower_button").append("<button class='setting_bottom' id='setting_template_tower'>下载模板" +
            "</button><button class='setting_bottom' id='setting_batch_tower_submit'>提交</button>");
    });

    //　批量导入监控模块
    $("#setting_batch_monitor").click(function () {
        $(".setting_window_top_on").attr("class", "setting_window_top");
        $("#setting_batch_monitor").attr("class", "setting_window_top_on");
        $("#ct_setting_window_bottom").empty();

        $("#ct_setting_window_bottom").append("<div class='setting_batch_window'>" +
            "<input type='file' name='image' class='setting_input_file' " +
            "id='input_file_monitor' accept='.xlsx,.xls' 'imgPreview(this)'> " +
            "<br><b class='input_file_txt'>注：仅能识别xls,xlsx文件<b></div>" +
            "<div id='setting_batch_monitor_button' class='setting_bottom_box'></div>");

        $("#setting_batch_monitor_button").append("<button class='setting_bottom' id='setting_template_monitor'>" +
            "下载模板</button><button class='setting_bottom' id='setting_batch_monitor_submit'>提交</button>");
    });

    $("#setting_import_tower").click()

});

