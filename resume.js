$(function () {
    var ind = null;
    var logoH=$(window).height();

    Pace.on("done", function () {
        $("#loading").remove();
    });
    $(".logos").css({"height":logoH,"transform-origin":"50% 40%","-webkit-transform-origin":"50% 40%"});
    var mySwiper = new Swiper("#main-body", {
        loop: false,
        speed: 400,
        direction: 'vertical',
        noSwiping: true,
        onInit: function (swiper) {//Swiper2.x的初始化是onFirstInit
            swiper.myactive = 0;
            swiperAnimateCache(swiper);//隐藏动画元素
            swiperAnimate(swiper);//初始化完成开始动画
        },
        onTransitionEnd : function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            ind = swiper.activeIndex;//记录当前页面的index
            $(".arrow").attr("id","").hide();
            clearTimeout(time0);
            if(this.slideActiveClass =="swiper-slide-active"){
                var time0=setTimeout(function () {
                    $(".swiper-slide-active .arrow").show().attr("id","arrow");
                },3000)
            }

            if(ind==2){
                var time=new Date();
                var h=time.getHours();
                var m=time.getMinutes();
                swiper.lockSwipeToPrev(); //阻止滑动到上一页
                timer1=setTimeout(function () {
                    $(".timeBar").text(h+":"+m);
                },800)
            }else{
                clearTimeout(timer1);
                swiper.unlockSwipeToPrev();
                $(".timeBar").empty();
            }
            if (ind == 3) {
                var timer2 = setTimeout(function () {
                    $(".logos").attr("id", "logos");
                }, 1000);
            } else {
                clearTimeout(timer2);
                $(".logos").attr("id", "");

            }
        }
    });
    $(".btn-yes").on("click", function () {
        mySwiper.slideTo(2, 0, true)
    });
    $(".btn-no").on("click", function () {
        mySwiper.slideTo(1, 400, true)
    });
    $(".reject-again").on("click", function () {
        alert("哎呦我去…真不给面儿啊…")
    });
});

