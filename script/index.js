$(document).ready(function () {
    var sTop,
        NavItem = $(".nav-item"),
        NavHeight = 80,
        idx = 0,
        Body = $("html, body"),
        winWidth = $(window).width(),
        winHeight = $(window).height();
    var scrollArr = [];
    if (winWidth > 640) {
        scrollArr = [
            $(".ticket-group").offset().top - NavHeight - 55,
            $(".activity").offset().top,
            $(".copyright").offset().top - NavHeight,
            // $(".favorable").offset().top
        ];
    } else {
        $(".coupon-item-title").each(function (i) {
            scrollArr[i] = $(this).offset().top - 50;
            if (i == 2) {
                scrollArr[i] = $(".copyright").offset().top;
            }
            if (i == 3) {
                scrollArr[i] = $(this).offset().top - 40;
            }
        });
    }
    $(window).scroll(function () {
        sTop = $(window).scrollTop();
        if (sTop >= scrollArr[0]) {
            $("nav").css("border-color", "#999999");
        } else {
            $("nav").css("border-color", "transparent");
        }
    });
    // 导航点击
    NavItem.click(function () {
        idx = $(this).index();
        $(".hamburger").removeClass("hamburger-close");
        $(".nav_mask").removeClass("mask_active");
        windowScroll(idx);
    });
    // 窗口滚动的函数
    function windowScroll (idx) {
        switch (idx) {
            case 0:
                Body.stop().animate({
                    scrollTop: scrollArr[0]
                }, 500);
                break;
            case 1:
                Body.stop().animate({
                    scrollTop: scrollArr[1]
                }, 500);
                break;
            case 2:
                Body.stop().animate({
                    scrollTop: scrollArr[2]
                }, 500);
                break;
            case 3:
                Body.stop().animate({
                    scrollTop: scrollArr[0]
                }, 500);
                break;
        }
    }
	
	$(".apply-btn").on("click", function (event) {
		event.preventDefault();
		idx = 0;
		windowScroll(idx);
	});
    $(".arrow img").on("click", function () {
        idx = 0;
        windowScroll(idx);
    });
	
    // 评价部分
    var prevComment = $(".prev-comment"),           // 左箭头
        nextComment = $(".next-comment"),           // 右箭头
        photoItems = $(".photo-item"),              // 头像
        commentItems = $(".comment-item"),          // 评论列表
        index = 0,
        zIndexArr = [];
    prevComment.click(function () {
        index--;
        if (index < 0) {
            index = 2;
        }
        zIndexArr = [3, 2, 1];
        commentSwitch(index);
    }).on("selectstart", function () {
        return false;
    });
    nextComment.click(function () {
        index++;
        if (index > 2) {
            index = 0;
        }
        zIndexArr = [3, 1, 2];
        commentSwitch(index);
    }).on("selectstart", function () {
        return false;
    });
    var arrT = [],
        arrL = [],
        arrW = [],
        arrH = [];
    photoItems.each(function (i) {
        arrW[i] = $(this).css("width");
        arrH[i] = $(this).css("height");
        arrT[i] = $(this).css("top");
        arrL[i] = $(this).css("left");
    });
    // 评论切换和头像切换的函数
    function commentSwitch (index) {
        // index 的下标 0 1 2

        photoItems.eq(index).addClass("active").siblings().removeClass("active");
        commentItems.eq(index).addClass("active").siblings().removeClass("active");

        // 第一张头像
        photoItems.eq(index).css("z-index", zIndexArr[0]);
        photoItems.eq(index).stop().animate({
            width: arrW[0],
            height: arrH[0],
            top: arrT[0],
            left: arrL[0]
        }, 500);

        // 第二张头像
        var nextIndex = index + 1 > 2 ? 0 : index + 1;
        photoItems.eq(nextIndex).css("z-index", zIndexArr[1]);
        photoItems.eq(nextIndex).stop().animate({
            width: arrW[1],
            height: arrH[1],
            top: arrT[1],
            left: arrL[1]
        }, 500);

        // 第三张头像
        var thirdIndex = index + 2 > 2 ? index - 1 : index + 2;
        photoItems.eq(thirdIndex).css("z-index", zIndexArr[2]);
        photoItems.eq(thirdIndex).stop().animate({
            width: arrW[2],
            height: arrH[2],
            top: arrT[2],
            left: arrL[2]
        }, 500);
    }

	// 更多参会感言
	$(".more-comment-btn").click(function (event) {
		event.preventDefault();
		$(".feel-dialog-wrapper").css("display", "block");
	});
	$(".feel-container .close").click(function () {
		$(".feel-dialog-wrapper").css("display", "none");
	});
    // 搭配购买部分展示小箭头的动作
    var dropDownArrow = $(".dropdown-arrow");
    dropDownArrow.click(function (e) {
    	e.stopPropagation();
    	e.cancelBubble = true;
        var activityIntro, otherDropDownArrows, otherActivityIntros;
        if (winWidth > 640) {
            activityIntro = $(this).parents(".favorable-item").find(".activity-intro");
            otherDropDownArrows = $(this).parents(".favorable-item").siblings().find(".dropdown-arrow");
            otherActivityIntros = $(this).parents(".favorable-item").siblings().find(".activity-intro");
        } else {
            activityIntro = $(this).parent().next();
            otherDropDownArrows = $(this).parents(".favorable-item-mob").siblings().find(".dropdown-arrow");
            otherActivityIntros = $(this).parents(".favorable-item-mob").siblings().find(".activity-text-mob");
        }
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            activityIntro.slideDown("fast");
            otherDropDownArrows.removeClass("active");
            otherActivityIntros.slideUp("fast");
        } else {
            $(this).removeClass("active");
            activityIntro.slideUp("fast");
        }
    }).on("selectstart", function () {
    	return false;
    });
    
    if (winWidth < 640) {
    	$(".favorable-item-mob").bind({
    		"click": function () {
    			$(this).find(".activity-text-mob").slideDown("fast").end().siblings().find(".activity-text-mob").slideUp("fast");
    			$(this).find(".dropdown-arrow").addClass("active").end().siblings().find(".dropdown-arrow").removeClass("active");
    		}
    	});

        $(".tips-mob-wrapper").on("click", function () {
            var tipsMobContainer = $(".tips-mob-container");
            $(this).addClass("tips-show");
            tipsMobContainer.css("display", "block");
        });

        $(".tips-close").on("click", function () {
            $(this).parents(".tips-mob-container").css("display", "none");
            $(".tips-mob-wrapper").removeClass("tips-show");
        });
    }

    // 汉堡菜单
    $(".hamburger").click(function () {
        if (!$(this).hasClass("hamburger-close")) {
            $(this).addClass("hamburger-close");
            $(".nav_mask").addClass("mask_active");
        } else {
            $(this).removeClass("hamburger-close");
            $(".nav_mask").removeClass("mask_active");
        }
    });
});
