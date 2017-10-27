/**
 * Created by dingliwen on 2017/10/9.
 */
    var sid = getCookie("sid");
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

var pageControl = {
    init:function(){
        this.checkLogin();
        $(".load").addClass("dn");
        $(".start").removeClass("dn");
        this.eventBind();
        this.setShare();
    },
    checkLogin:function(){
        var that = this;

        var loginUrl = "//passport.m.jd.com/user/login.action";
        var curPath = window.location.origin + window.location.pathname;

        if (!sid) {   // 没有sid，可以直接认为没有登录
            notLogin();
            return;
        }else {
            ProHub.goLogin({sid:sid},function(data){
                if(data.code == "200"){
                    if(!data.isLogin){
                        notLogin();
                    }
                }
            })
        }

        function notLogin() {
            window.location.href = loginUrl + "?returnurl=" + curPath;
        }
    },
    eventBind:function(){
        var  targetNum = 3; //目标
        var body = new Body({
            countTime:5, //倒计时时间
            success:function(result){
                //倒计时结束后   （result=点击个数）
                $(".get-gold-num").html(result);
                $(".short-gold-num").html(targetNum-result);
                if(result<targetNum){
                    $(".lose-wrap").removeClass("dn");
                }else {
                    $(".success-wrap").removeClass("dn");
                }
            },
            error:function(){
                //碰到炸弹
                $(".miss-wrap").removeClass("dn");
            }
        });

        $(".btn-start").one("click",function(){
            //开始游戏
            $(".animate-in").addClass("animate-out").removeClass("animate-in");
            setTimeout(function(){
                $(".start").addClass("fadeOut");
                setTimeout(function(){
                    $(".start").addClass("dn");
                    body.init();
                },200);
            },1000);
        });

        $("body").on("click",".rules-btn",function(){
            //活动规则
            $(".rules-wrap").removeClass("dn");
        }).on("click",".btn-close",function(){
            $(".rules-wrap").addClass("dn");
        }).on("click",".btn-again",function(){
            $(".layer").addClass("dn");
            body.restart();//重新开始
        }).on("click",".btn-share",function(){
            $(".share-wrap").removeClass("dn");
        }).on("click",".share-wrap",function(){
            $(this).addClass("dn");
        }).on("click",".btn-lottery",function(){
            //立即抽奖
            ProHub.getPrize({sid:"huangdashuai"},function(data){
                $(".success-wrap").addClass("dn");
                if(data.code == "200"){
                    if(data.isParticipate){
                        //已参加
                        $(".nochance-wrap").removeClass("dn");
                    }else{
                        //第一次参加
                        if(data.prizeTyp == 0){
                            //5折券
                            $(".lottery-name").html("一张金条息费折扣券");
                            $(".lottery-limit").addClass("dn");
                            $(".lottery-fivepersent").removeClass("dn");
                            $(".lottery-wrap").removeClass("dn")
                        }else if(data.prizeTyp == -999){
                            //未中奖
                            $(".fail-wrap").removeClass("dn");
                        }else{
                            // prizeType
                            $(".lottery-name").html("金条提额"+data.prizeType+"大礼包");
                            $(".lottery-wrap").removeClass("dn")
                        }
                    }
                }else{
                    $(".wrong-wrap").removeClass("dn");
                }
            })
        });
    },
    setShare:function(){
        window.share && window.share.setShare({
            "title": "金秋抢好礼，欢乐不停歇",
            "desc": "玩游戏抽大奖，享金条提额大礼包，更有金条借款息费5折券等你来抢哟！",
            "link": window.location.origin+window.location.pathname,
            "imgUrl": "https://img30.360buyimg.com/jr_image/jfs/t7747/156/2635260652/5810/840bc3c/59b27132N7be3580b.jpg"
        });
    }
};

$(function(){
    FastClick && FastClick.attach(document.body);
    var jsFiles = [
        "../images/arrowLeft.png",
        "../images/arrowRight.png",
        "../images/attain.png",
        "../images/body-bg.jpg",
        "../images/bomb-bg.png",
        "../images/bomb-bg2.png",
        "../images/bomb1.png",
        "../images/btn-lottery.png",
        "../images/btn-purple.png",
        "../images/btn-red.png",
        "../images/btn-start.png",
        "../images/btn-yellow.png",
        "../images/circle.png",
        "../images/click-bg.png",
        "../images/clock-bg.png",
        "../images/close.png",
        "../images/cloud-bottom.png",
        "../images/cloud-left.png",
        "../images/cloud-leftbottom.png",
        "../images/cloud-right.png",
        "../images/cloud-top.png",
        "../images/cloud-topleft.png",
        "../images/cloud-topright.png",
        "../images/copyright.png",
        "../images/coupon-tyoe.png",
        "../images/fail-bg.png",
        "../images/floor-bg.png",
        "../images/gold1.png",
        "../images/joy.png",
        "../images/load-cloud.png",
        "../images/load-gold.png",
        "../images/logo.png",
        "../images/lottery-bg.png",
        "../images/miss.png",
        "../images/num1.png",
        "../images/num2.png",
        "../images/num3.png",
        "../images/num4.png",
        "../images/pirze-bg.png",
        "../images/plane.png",
        "../images/rules-bg.png",
        "../images/rules-layer.png",
        "../images/share-layer.png",
        "../images/tip.png",
        "../images/title.png"
    ];
    Utils.loadAllResource(jsFiles,function(){
        pageControl.init();
    });
});