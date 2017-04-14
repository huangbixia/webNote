$(document).ready(function(){

    //左侧菜单
    $(".topNav").find("li").each(function(){
        hoverChangeImg(this,1,2);
        hoverShowText(this);
    });
    $(".bottomNav").find("li").each(function(){
        hoverChangeImg(this,1,2);
        hoverShowText(this);
    });


    //悬浮改变图片
    function hoverChangeImg(obj,from,to)
    {
        //获取图片路径
        var imgNameReg = /(.*)(\.png)$/;
        var imgName = $(obj).find("img").attr("src").match(imgNameReg);
        imgName[1] = imgName[1].substring(0, imgName[1].length-1);

        $(obj).hover(function(){
            $(this).find("img").attr("src",imgName[1]+to+".png");
           // alert("1");
        },function(){
            $(this).find("img").attr("src",imgName[1]+from+".png");
        });
    }

    //鼠标悬浮出现说明文字
    function hoverShowText(obj)
    {
        var textSpan = $(obj).find("span");
       $(obj).hover(function(){
           textSpan.show("middle");
       },function(){
           textSpan.hide();
       });
    }

    //鼠标悬浮用户图标、“选项”事件
    $(".user").hover(function(){
        $(".userDetail").slideDown("slow");
    },function(){
        $(".userDetail").slideUp("slow");
    });

    $(".chooseItemBtn").toggle(function(){
        $(".chooseItemDl").show();
        $(".settingItem").hide();
        return false;
    },function(){
        $(".settingItem").hide();
        if( $(".chooseItemDl").css("display")=="none")
        {
            $(".chooseItemDl").show();
        }
        else
        {
            $(".chooseItemDl").hide();
        }
        return false;
    });
    $(".chooseItemDl").bind("click",function(event){
        event.stopImmediatePropagation();
    });

    $(".userItem").find("li").each(function()
    {
       hoverChangeImg($(this),1,2);
    });

    //点击选项-->打勾
    function makeTag(obj){
       obj.each(function(i){
            $(this).click(function(){
                $(this).find("span").html("√");
                for(var j=0;j<obj.length;j++){
                    if(j!=i)
                    {
                       obj.eq(j).find("span").html("");
                    }
                }
            });
        });
    }
    makeTag($(".sortSelection"));
    makeTag($(".settingSelection"));

    //“提醒”点击、悬浮图片转换
    hoverChangeImg($(".firstNote"),3,2);

    $(".alarm").toggle(function(){
        $(".firstNote").slideDown();
        $(".setting").show();
    },function(){
        $(".firstNote").slideUp();
        $(".setting").hide();
        $(".settingItem").hide();
    });

    $(".settingBtn").toggle(function(event){
        $(".settingItem").show();
        $(".chooseItemDl").hide();
        event.stopImmediatePropagation();
        return false;
    },function(event){
        $(".chooseItemDl").hide();
        if( $(".settingItem").css("display")=="none")
        {
            $(".settingItem").show();
        }
        else
        {
            $(".settingItem").hide();
        }
        event.stopImmediatePropagation();
        return false;
    });
    $(".settingItem").bind("click",function(event){
        event.stopImmediatePropagation();
    });

    //右边菜单悬浮效果
    hoverChangeImg($(".extend"),1,2);
    $(".RM").each(function(i)
    {
       switch (i) {
           case 0:
               hoverChangeImg($(this),2,1);
               break;
           case 1:
               hoverChangeImg($(this),3,1);
               break;
           case 2:
               hoverChangeImg($(this),1,2);
               break;
           case 3:
               hoverChangeImg($(this),2,1);
               break;
           case 4:
               hoverChangeImg($(this),1,2);
               break;
       }
        hoverShowText($(this));
    });

    hoverShowText($(".extend"));
    hoverShowText($(".share"));

    //点击“第一次笔记”
    $(".firstNoteBtn").toggle(function(){
        $(".firstN").slideDown();
    },function(){
        $(".firstN").slideUp();
    });
//点击笔记目录的笔记
    $(".note").each(function(i){
        $(this).click(function(){
            for(var j=0;j<$(".note").length;j++)
            {
                if(j!=i)
                {
                    $(".note:eq("+j+")").css("border","1px #f2f2f2 solid");
                }
            }
            $(this).css("border","3px solid #d6d6d6");

            //当点击笔记时，笔记的内容显示在编辑框
            $(".editTextBox").text($(this).text());
        });

    });

//点击“扩展”
    $(".extend").toggle(function(){
        $(".leftBox").animate({marginLeft:"-425px"},400);
        $(".rightBox").css("width","100%");
        $(this).find("span").html("收缩");
    },function(){
        $(".leftBox").animate({marginLeft:"0"},400);
        $(".rightBox").css("width","68%");
        $(this).find("span").html("扩展");
    });

//生成取色板
    for(var j=0;j<40;j++)
    {
        var colorDiv = "<div class='color'></div>";
        $(".colorBoard").append(colorDiv);
    }
    var colorNum = $(".colorBoard").find("div").length;
    var color =  $(".colorBoard").find("div");

    //颜色数组
    var allColor = ["#000000","#993303","#303308","#043203","#00335b","#000479","#323594","#323232","#860000","#ff6000","#7e7e0e",
        "#008402","#00838a","#0001fc","#6963a1","#867f79","#fe000e","#fc9e00","#9acc00","#279d6d","#38ccbe",
        "#2f69ff","#84006e","#bdc2bc","#ff00fe","#ffcb00","#faff00","#06fd00","#05fdfd","#06c8fb","#9c2f72",
        "#bdc2bc","#fc98d8","#fbff9c","#fbcba5","#cffeca","#ccfffe","#99cef8","#cf9aea","#ffffff"];

    for(var k=0;k<colorNum;k++)
    {
        color.eq(k).css({background:allColor[k],border:"1px solid "+allColor[k]+""});

    }
    //点击相应的颜色，就显示相应的颜色
    color.each(function(i){
        $(this).click(function(){
            $(".selectedColor").css("background",allColor[i]);
        });
    });

    $(".selectedColor").toggle(function(){
        $(".colorBoard").show();
    },function(){
        if($(".colorBoard").css("display") =="none")
        {
            $(".colorBoard").show();
        }
        else
        {
            $(".colorBoard").hide();
        }

    });


//编辑区菜单选项鼠标悬浮，提示文字
    $(".editMenu").find("li").each(function(){
        hoverShowText($(this));
    });

    //编辑区的内容默认是笔记列表的第一条笔记
    $(".editTextBox").text($(".note:eq(0)").text());

//点击可视区任何地方
    $(document).bind("click",function(){
        $(".chooseItemDl").hide();
        $(".settingItem").hide();
        $(".colorBoard").hide();
    });

});

