
function whell(banner, obj,arr) {
    var banner = document.querySelector(banner);
    if (!(banner && banner.nodeType == 1)) {
        console.log("未找到")
        return;
    }
    var imgLength = obj.img.length + 1;
    if (imgLength == 0) {
        return;
    }
    var imgSize = obj.imgSize;
    var btnColor = obj.btnColor || "rgba(255,255,255,1)";
    var btnActive = obj.btnActive || "#007aff";
    var btnPos = obj.btnPos;
    var time=arr.time;
    var Styled=null;
    if(arr.style=="linner"||arr.style){
        Styled=Tween.Linear;
    }
    if(arr.style=="in"){
        Styled=Tween.Quad.easeIn;
    }
    //设置banner样式
   
    banner.style.cssText = "width:100%;height:" + imgSize[1] + "px;position:relative; overflow:hidden";
    //创建图片列表
    var imglist = document.createElement("div");
    imglist.style.cssText = "width:" + imgLength * 100 + "%;height:100%;"

    banner.appendChild(imglist);
    //图片的处理 
    //将第一个图片放入最后一个,包括链接、颜色
    obj.img.push(obj.img[0]);
    obj.link.push(obj.link[0].push);
    obj.imgColor.push(obj.imgColor[0])
    //图片的放入
    for (var i = 0; i < obj.img.length; i++) {
        //图片的背景 实现背景颜色的改变
        var shopimg = document.createElement("div");
        shopimg.style.cssText = "float:left;width:" + 100 / obj.img.length + "%;height:100%;background:" + obj.imgColor[i];
        //a链接实现图片的放置
        var links = document.createElement("a");
        links.href = obj.link[i]
        links.style.cssText = "width:" + imgSize[0] + "px;height:" + imgSize[1] + "px;display:block;margin:auto;background:url(" + obj.img[i] + ") no-repeat 0 0";

        shopimg.appendChild(links);
        imglist.appendChild(shopimg);
    }
    //按钮的创建 

    var btnlist=document.createElement("div");
    btnlist.style.cssText=` width: 100%;
    height: 15px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    bottom:`+ obj.btnPos[1] +`px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;`

    var btns=[];

    for(var i=0;i<obj.img.length-1;i++){
        if(i==0){
            var color=btnActive;
        }else{
            var color=btnColor;
        }
        var btn=document.createElement("div");
        btn.style.cssText=`width: 60px;
        height: 5px;
        background: `+color+`;
        opacity: .5;
        margin: 0 5px;`;
        btnlist.appendChild(btn);
        btns.push(btn);
    }
    banner.appendChild(btnlist);


    //轮播功能
    function animate(obj, attrObj, duration, fn, callback) {
        clearInterval(obj.t);

        if (obj.nodeType != 1) {
            console.log("类型不对");
            return;
        }
        var start = {};
        var change = {};
        var time = 0;
        var fn = fn || Tween.Linear;
        console.log(fn);
        for (var i in attrObj) {
            start[i] = css(obj,i);

            change[i] = attrObj[i] - start[i];

        }
        obj.t = setInterval(() => {
            time = time + 50;
            for (var i in attrObj) {
                css(obj,i,fn(time, start[i], change[i], duration));
            }
            if (time >= duration) {
                for (var i in attrObj) {
                    obj.style[i] = attrObj[i] + "px";
                    css(obj,i,attrObj[i])
                }
                clearInterval(obj.t);
                if (callback) {
                    callback();
                }
            }
        }, 50);
    }

    function css(obj,attr,val){
        if(arguments.length==2){
            switch(attr){
                case "background":
                case "color":
                    return getComputedStyle(obj,null)[attr];
                    break;
                default:
                    return parseInt(getComputedStyle(obj,null)[attr]);
            }
        }else if(arguments.length==3){
            switch(attr){
                case "background":
                case "color":
                    obj.style[attr]=val
                default:
                   obj.style[attr]=val+"px";
            }

        }
      }  

      
      
    //   var but = btns;
      console.log(btns);
    //   var imglist = imglist;
      console.log(banner.width);
      var Winw = parseInt(getComputedStyle(banner, null).width)
    
    
    var num=0;
    function lunbo(){
        ++num;
        console.log(-num * Winw);
        if (num > btns.length-1) {
            animate(imglist, {
                marginLeft: -num * Winw
            }, 500,Styled,function(){
                imglist.style.marginLeft = 0;
            });
            num = 0;
            
            console.log(imglist.style.marginLeft);
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.background = "rgba(255,255,255,1)";
            }
            btns[num].style.background = "#007aff";
        } else {
            animate(imglist, {
                marginLeft: -num * Winw
            }, 500,Styled);
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.background = "rgba(255,255,255,1)";
            }
            btns[num].style.background = "#007aff";
        }
    }
    setInterval(lunbo, 3000);


    for (let i = 0; i < btns.length ; i++) {

        btns[i].onclick = function () {
            num = i;
            animate(imglist, {
                marginLeft: -num * Winw
            }, 500,Styled)
            for (var y = 0; y < btns.length - 1; y++) {
                btns[y].style.background = "rgba(255,255,255,1)";
            }
            btns[num].style.background = "#007aff";
        }
    }

    

}