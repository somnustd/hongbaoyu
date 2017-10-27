/**
 * Created by dingliwen on 2017/10/9.
 */
(function(){
    var Body = function(option){
        var defaultOption = {
            countTime:5
        };
        Utils.extend(defaultOption,option);
        this.options = defaultOption;

        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        this.app = new PIXI.Application(width, height, { antialias: false, transparent: true, resolution: 1 });
        document.body.appendChild(this.app.view);

        this.countTime = this.options.countTime;
        this.aliens = [];
        this.clickCount = 0;
    };
    Body.prototype.init = function(){
        this.bunnyWorld = new PIXI.Container();
        this.app.stage.addChild(this.bunnyWorld);
        this.bunnyTexture = PIXI.Texture.fromImage("../images/load-gold.png");
        this.bombTexture = PIXI.Texture.fromImage("../images/bomb1.png");

        this.drawCloud();
        this.drawFloor();
        this.drawClock();
        this.drawJoy();

        this.CountDown();
    };
    Body.prototype.drawCloud = function(){
        var that = this;
        // create a cloud...
        var cloud1 = PIXI.Sprite.fromImage('../images/cloud-topleft.png');
        cloud1.width = 176;
        cloud1.height = 77;
        this.app.stage.addChild(cloud1);

        var cloud2 = PIXI.Sprite.fromImage('../images/cloud-top.png');
        cloud2.width = 230;
        cloud2.height = 112;
        cloud2.anchor.x = 1;
        cloud2.x = this.app.renderer.width;
        this.app.stage.addChild(cloud2);

        var cloud3 = PIXI.Sprite.fromImage('../images/cloud-topright.png');
        cloud3.width = 134;
        cloud3.height = 90;
        cloud3.anchor.x = 1;
        cloud3.x = this.app.renderer.width;
        this.app.stage.addChild(cloud3);
    };
    Body.prototype.drawFloor = function(){
        var that = this;

        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        // create a floor...
        var floor = PIXI.Sprite.fromImage('../images/floor-bg.png');
        floor.width = this.app.renderer.width;
        floor.height = 126;
        floor.anchor.y = 1;
        floor.x = 0;
        floor.y = this.app.renderer.height;
        floor.zIndex = 100;
        this.app.stage.addChild(floor);
    };
    Body.prototype.drawClock = function(){
        var that = this;
        // create a clock...
        var clock = PIXI.Sprite.fromImage('../images/click-bg.png');
        clock.width = 83;
        clock.height = 40;
        //clock.anchor.set(0.5);
        clock.x = 135;
        clock.y = this.app.renderer.height-53;
        this.app.stage.addChild(clock);

        var style = new PIXI.TextStyle({
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#ffffff'
        });
        var clickNum = PIXI.Sprite.fromImage('../images/clock-bg.png');
        clickNum.width = 89;
        clickNum.height = 38;
        //clock.anchor.set(0.5);
        clickNum.x = 25;
        clickNum.y = this.app.renderer.height-53;
        this.app.stage.addChild(clickNum);

        this.countText = new PIXI.Text(that.countTime+'S',style);
        this.countText.x = 70;
        this.countText.y = this.app.renderer.height-42;
        this.countText.zIndex = 99;
        this.app.stage.addChild(this.countText);

        this.clickText = new PIXI.Text(that.clickCount+'个',style);
        this.clickText.x = 170;
        this.clickText.y = this.app.renderer.height-42;
        this.clickText.zIndex = 99;
        this.app.stage.addChild(this.clickText);
    };
    Body.prototype.drawJoy = function(){
        var that = this;
        // create a joy...
        this.joy = PIXI.Sprite.fromImage('../images/joy.png');
        this.joy.width = 88;
        this.joy.height = 92;
        this.joy.anchor.set(0.5);
        this.joy.x = this.app.renderer.width/2;
        this.joy.y = this.app.renderer.height-128;
        this.joy.interactive = true;
        //joy
        //    .on('pointerdown', onDragStart)
        //    .on('pointerup', onDragEnd)
        //    .on('pointerupoutside', onDragEnd)
        //    .on('pointermove', onDragMove);
        //joy
        //    .on('touchstart', that.onDragStart)
        //    .on('touchend', that.onDragEnd)
        //    .on('touchendoutside', that.onDragEnd)
        //    .on('touchmove', that.onDragMove);

        this.app.stage.addChild(this.joy);
    };
    Body.prototype.bindJoy = function(){
        //var that = this;
        var width = this.app.renderer.width;
        this.joy
            .on('touchstart', onDragStart)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('touchmove', onDragMove);

        function onDragStart(event) {
            this.data = event.data;
            this.dragging = true;
        }
        function onDragEnd() {
            this.dragging = false;
            this.data = null;
        }
        function onDragMove() {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);

                if(newPosition.x<=0){
                    this.x = 0;
                }else if(newPosition.x>= width){
                    this.x = width;
                }else {
                    this.x = newPosition.x;
                }
                //this.y = newPosition.y;
            }
        }
    };
    Body.prototype.playMethod = function(){
        var that = this;
        // create a floor...
        this.circle = PIXI.Sprite.fromImage('../images/circle.png');
        this.circle.width = 148;
        this.circle.height = 148;
        this.circle.anchor.set(0.5);
        this.circle.x = this.joy.x;
        this.circle.y = this.joy.y;
        this.app.stage.addChild(this.circle);

        var Rightexture = PIXI.Texture.fromImage('../images/arrowRight.png');
        this.arrowRight =new PIXI.Sprite(Rightexture);
        this.arrowRight.width = 54;
        this.arrowRight.height = 42;
        this.arrowRight.anchor.set(0.5);
        this.arrowRight.x = this.joy.x+100;
        this.arrowRight.y = this.joy.y;
        this.app.stage.addChild(this.arrowRight);

        var Lefttexture = PIXI.Texture.fromImage('../images/arrowLeft.png');
        this.arrowLeft =new PIXI.Sprite(Lefttexture);
        this.arrowLeft.width = 54;
        this.arrowLeft.height = 42;
        this.arrowLeft.anchor.set(0.5);
        this.arrowLeft.x = this.joy.x-100;
        this.arrowLeft.y = this.joy.y;
        this.app.stage.addChild(this.arrowLeft);

        var Tiptexture = PIXI.Texture.fromImage('../images/tip.png');
        this.tip =new PIXI.Sprite(Tiptexture);
        this.tip.width = 131;
        this.tip.height = 120;
        this.tip.anchor.x = 0.5;
        this.tip.anchor.y = 1;
        this.tip.x = this.joy.x;
        this.tip.y = this.joy.y-66;
        this.app.stage.addChild(this.tip);
    };
    Body.prototype.removeTip = function(){
        this.app.stage.removeChild(this.circle);
        this.app.stage.removeChild(this.arrowRight);
        this.app.stage.removeChild(this.arrowLeft);
        this.app.stage.removeChild(this.tip);
    };
    Body.prototype.CountDown = function(){
        this.playMethod();
        this.start();
    };
    Body.prototype.createBunny = function(){
        var that = this;
        var bunny = null;
        if(Math.random()>0.2){
            bunny = new PIXI.Sprite(that.bunnyTexture);
            bunny.width = 35;
            bunny.height = 66;
            bunny.isClick = true;
        }else {
            bunny = new PIXI.Sprite(that.bombTexture);
            bunny.width = 60;
            bunny.height = 75;
            bunny.isClick = false;
        }
        bunny.speed = Math.random() * 5 + 5;
        bunny.scale.set(Math.random()*0.2+0.3);
        bunny.position.set(Math.random() * that.app.renderer.width, -100);
        bunny.anchor.set(0.5, 0.5);
        return bunny;
    };
    Body.prototype.updateBunny = function(bunny,index){
        var that = this;
        bunny.y += bunny.speed;
        this.isAdd = false;

        if(bunny.isClick){
            //金条
            if(bunny.y+33>that.joy.y-40 && bunny.y-33<=that.joy.y+40){
                //在joy 所在高度区域中，对比joy的x位置即可
                //console.log(that.app.renderer.height-173);
                if((bunny.x+17) >= (that.joy.x-44) && (bunny.x-17) <= (that.joy.x+44)){
                    //that.bunnyWorld.removeChild(bunny);

                    /*if(bunny){
                        that.clickCount++;
                    }
                    that.isAdd = true;*/
                    that.clickCount++;

                    that.container.removeChild(bunny);
                    //console.log("before"+that.aliens.length);
                    that.aliens.splice(index,1);
                    //console.log("end"+that.aliens.length);
                    that.clickText.text = Math.floor(that.clickCount)+"个";
                }
            }
        }else {
            //炸弹
            if(bunny.y+37>that.joy.y-40 && bunny.y-37<=that.joy.y){
                //在joy 所在高度区域中，对不joy的x位置即可
                if((bunny.x+15) >= (that.joy.x-30) && (bunny.x-15) <= (that.joy.x+30)){
                    //bunnyWorld.removeChild(bunny);
                    //that.app.stage.removeChild(bunny);
                    //that.aliens.slice(index,1);
                    //that.app.stage.removeChild(that.bunnyWorld);
                    that.app.ticker.stop();
                    that.options.error && that.options.error();
                }
            }
        }

        if(bunny.y>=that.app.renderer.height-120){
            //超出范围移除
            that.container.removeChild(bunny);
            that.aliens.slice(index,1);
        }

    };
    Body.prototype.addCount = function(){

        this.count1 = PIXI.Texture.fromImage('../images/num1.png');
        this.count2 = PIXI.Texture.fromImage('../images/num2.png');
        this.count3 = PIXI.Texture.fromImage('../images/num3.png');
        this.count4 = PIXI.Texture.fromImage('../images/num4.png');

        this.countDwon = new PIXI.Sprite(this.count1);
        this.countDwon.anchor.set(0.5);
        this.countDwon.scale.set(0.5);
        this.countDwon.x = this.app.renderer.width/2;
        this.countDwon.y = 250;
        this.app.stage.addChild(this.countDwon);
    };
    Body.prototype.start = function(){
        var that = this;
        this.addCount();

        this.count = 0;
        var countImg = [that.count1,that.count2,that.count3,that.count4];
        this.index = 0;
        var num = 0;
        this.app.ticker.add(function () {
            that.count += 0.01;
            if(that.count>=0.5){
                if(that.index>=3){
                    //倒计时结束
                    that.app.stage.removeChild(that.countDwon);
                    that.removeTip();
                    that.bindJoy();
                    for (var i = 0; i < that.aliens.length; i++) {
                        var dude = that.aliens[i];
                        dude.zIndex = 3;
                        that.updateBunny(dude,i);
                    }

                    if(that.countTime<=1){
                        //10s倒计时结束显示弹层
                        that.app.ticker.stop();

                        that.options.success && that.options.success(that.clickCount);//成功回调
                    }else {
                        that.countTime -= 0.02;
                        that.countText.text = Math.floor(that.countTime)+"S";

                        num++;
                        if(num%18 == 0){
                            var dude = that.createBunny();

                            that.aliens.push(dude);
                            that.container.addChild(dude);
                        }
                    }
                    return;
                }else {
                    that.count=0;
                    that.index++;
                    that.countDwon.texture = countImg[that.index];
                }
            }
            that.countDwon.scale.set(that.count);
        });
    };

    Body.prototype.restart = function(){
        var that = this;

        //倒计时
        this.countTime = this.options.countTime;
        that.countText.text = Math.floor(that.countTime)+"S";

        //点击个数
        this.clickCount = 0;
        that.clickText.text = Math.floor(that.clickCount)+"个";


        //清空所有坠落物
        for (var i = 0; i < that.aliens.length; i++) {
            var dude = that.aliens[i];
            that.container.removeChild(dude);
        }
        that.aliens = [];

        //倒计时
        this.index = 0;
        this.count = 0;
        that.countDwon.texture = this.count1;
        that.app.stage.addChild(this.countDwon);

        that.app.ticker.start();
    };
    window.Body = Body;
})();



//工具类
var Utils = (function(){
    var _utils = {};
    _utils.extend = function (target, obj) {
        for ( var i in obj ) {
            target[i] = obj[i];
        }
        return target;
    };
    _utils.hasTouch= 'ontouchstart' in window;
    _utils.loadImage = function(url,callback){
        var resource;
        var extPosition = url.lastIndexOf(".");
        var extName =url.substr(extPosition+1,url.length-extPosition-1);

        if(["jpg","png","jpeg"].indexOf(extName)>-1){
            resource = new Image();
            resource.src = url;
            resource.onload = function(){
                //image  has been loaded
                if(callback){
                    callback(resource);
                }
            };
        }else if(["mp3"].indexOf(extName)>-1){
            resource = new Audio(url);
            if(callback){
                callback(resource);
            }
        }
    };
    _utils.loadAllResource = function(resourceList,callback){
        var keys = Object.keys(resourceList);
        var keysCount = keys.length;
        var index = 0;

        this.loadImage(resourceList[keys[index]],loadImageCallback);
        function loadImageCallback(img){
            resourceList[keys[index]] = img;
            index++;
            if(index == keysCount){
                if(callback){
                    callback(resourceList);
                }
            }else{
                _utils.loadImage(resourceList[keys[index]],loadImageCallback);
            }
        }
    }
    return _utils;
})();


