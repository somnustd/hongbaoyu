## html5-progress

draw animated circular progress bar

### html5 canvas 实现渐变进度条 ###


![image](http://g.recordit.co/ATvGXbWb8v.gif)

### 代码实例 ###

    var body = new Body({
        countTime:10, //倒计时时间
        success:function(result){
            //倒计时结束后   （result=点击个数）
            alert("欧耶");
        },
        error:function(){
            //碰到炸弹
            alert("你个loser!!!");
        }
    });

    body.init();   //开始

### 提供的方法 ###
######再来一次   body.restart();



作者：somnustd

