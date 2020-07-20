function whell(banner, obj, arr) {
    //初始化
    this.init(banner,obj, arr);
    //设置banner
    this.setBanner();
    //创建图片列表
    this.creatImglist();
    //放入图片
    this.pustimg();
    //创建轮播按钮
    this.creatBtnlist();
    //自动轮播
    this.run();
    //点击按钮；
    this.click();
}




whell.prototype = {
    init(banner, obj, arr) {
        var banner = document.querySelector(banner);
        if (!(banner && banner.nodeType == 1)) {
            console.log("未找到")
            return;
        }
        this.banner=banner;
        this.obj=obj;
        this.arr=arr;
        this.imgLength = obj.img.length + 1;
        if (this.imgLength == 0) {
            return;
        }
        this.imgSize = obj.imgSize;
        this.btnColor = obj.btnColor || "rgba(255,255,255,1)";
        this.btnActive = obj.btnActive || "#007aff";
        this.btnPos = obj.btnPos;
        obj.img.push(obj.img[0]);
        obj.link.push(obj.link[0]);
        obj.imgColor.push(obj.imgColor[0]);
        this.time = arr.time;
        this.Styled = null;
        if (arr.style == "linner" || arr.style) {
            this.Styled = Tween.Linear;
        }
        if (arr.style == "in") {
            this.Styled = Tween.Quad.easeIn;
        }
    },

    setBanner(){
        this.banner.style.cssText = "width:100%;height:" + this.imgSize[1] + "px;position:relative; overflow:hidden";
    },
    creatImglist(){
        this.imglist = document.createElement("div");
        this.imglist.style.cssText = "width:" + this.imgLength * 100 + "%;height:100%;"
    
        this.banner.appendChild(this.imglist);
    },
    pustimg(){
        for (var i = 0; i < this.obj.img.length; i++) {
            //图片的背景 实现背景颜色的改变
            this.shopimg = document.createElement("div");
            this.shopimg.style.cssText = "float:left;width:" + 100 / this.obj.img.length + "%;height:100%;background:" + this.obj.imgColor[i];
            //a链接实现图片的放置
            this.links = document.createElement("a");
            this.links.href = this.obj.link[i]
            this.links.style.cssText = "width:" + this.imgSize[0] + "px;height:" + this.imgSize[1] + "px;display:block;margin:auto;background:url(" + this.obj.img[i] + ") no-repeat 0 0";
    
            this.shopimg.appendChild(this.links);
            this.imglist.appendChild(this.shopimg);
        }
    },
    creatBtnlist(){
        this.btnlist=document.createElement("div");
        this.btnlist.style.cssText=` width: 100%;
    height: 15px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    bottom:`+ this.obj.btnPos[1] +`px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;`

    this.btns=[];

    for(var i=0;i<this.obj.img.length-1;i++){
        if(i==0){
            this.color=this.btnActive;
        }else{
            this.color=this.btnColor;
        }
        this.btn=document.createElement("div");
        this.btn.style.cssText=`width: 60px;
        height: 5px;
        background: `+this.color+`;
        opacity: .5;
        margin: 0 5px;`;
        this.btnlist.appendChild(this.btn);
        this.btns.push(this.btn);
    }
    console.log(this.btns);

    this.banner.appendChild(this.btnlist);
    },
    run(){      
          this.Winw = parseInt(getComputedStyle(this.banner, null).width)  
        var num=0;
        var that=this;
        function lunbo(){   
                    
            ++num;
            if (num > that.btns.length-1) {
                animate(that.imglist, {
                    marginLeft: -num * (that.Winw)
                }, 500,that.Styled,function(){
                    that.imglist.style.marginLeft = 0;
                });
                num = 0;
                
                console.log(that.imglist.style.marginLeft);
                for (var j = 0; j < that.btns.length; j++) {
                    that.btns[j].style.background = "rgba(255,255,255,1)";
                }
                that.btns[num].style.background = "#007aff";
            } else {
                animate(that.imglist, {
                    marginLeft: -num * that.Winw
                }, 500,that.Styled);
                for (var j = 0; j <that.btns.length; j++) {
                    that.btns[j].style.background = "rgba(255,255,255,1)";
                }
                that.btns[num].style.background = "#007aff";
            }
        }
        setInterval(lunbo, 3000);
    
    
    }, 
    click(){
        var that=this;
        
        for (let i = 0; i < that.btns.length ; i++) {
    
            that.btns[i].onclick = function () {
                num = i;
                animate(that.imglist, {
                    marginLeft: -num * that.Winw
                }, 500,that.Styled)
                for (var y = 0; y < that.btns.length - 1; y++) {
                    that.btns[y].style.background = "rgba(255,255,255,1)";
                }
                that.btns[num].style.background = "#007aff";
            }
        }
    }
}