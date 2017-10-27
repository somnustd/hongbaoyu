/**
 * Created by dingliwen on 2017/7/10.
 */
var domain = "//10.13.24.28";
window.ProHub = {
    //  抽奖接口
    getPrize: function (param, callback) { //index数据
        var url = domain+"/activity/getPize";
        $.ajax({
            url: url,
            type: "get",
            dataType: "jsonp",
            data: param,
            jsonp:"callback",
            jsonpCallback: "callback",
            success: function (data) {
                callback && callback(data);
            }
        });
    },
    // 查询接口
    goLogin: function (param, callback) { //index数据
        var url = domain+"/activity/isLogin";
        $.ajax({
            url: url,
            type: "get",
            dataType: "jsonp",
            data: param,
            jsonp:"callback",
            jsonpCallback: "callback",
            success: function (data) {
                callback && callback(data);
            }
        });
    }
};