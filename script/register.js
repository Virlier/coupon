$(document).ready(function() {
	var url = location.search.substring(1).split("=")[1];
	var winWidth = $(window).width();
	var winHeight = $(window).height();
    var stepList = $(".step-list");
    var _lastIndex = 0;																// 保存上一步的下标
    var index = 0;																	// 保存当前页的下标
	var initIndex = 0;
    var body = $("html, body");
    var navMobItems = $(".nav-mob-item");
    $(".step-wrapper").css("height", stepList.eq(0).outerHeight(true));
    var serviceItemArr = [];														// 保存搭配购买活动门票 和 营销服务的数组

	var combinationPriceArr = [];													// 保存组合价格的数组，顺序不能变，必须 hmc tdc adc

	var combineStandardItems = $(".combine-standard-price"),
		combineFavorableItems = $(".combine-favorable-price");
    
    function pageSwitch (index) {
		for (var i = 0; i < stepList.length; i++) {
            $(stepList[i]).removeClass("active");
        }
        body.stop().animate({
            scrollTop: 0
        }, 10);
        stepList.eq(index).addClass("active");
        $(".step-wrapper").animate({
        	"height": stepList.eq($(".step-list.active").index()).outerHeight(true)
        }, 500);
    }
    
    /* 1 选择联票方案 */
    var industryItems = $(".industry-item"),
        directNextStep = $("#directNextStep"),
        addBtn = $("#step-1 .add"),
        reduceBtn = $("#step-1 .reduce"),
        activityEntrance = $("#activityEntrance"),									// 活动门票入口
        marketingServiceEntrance = $("#marketingServiceEntrance"),					// 营销服务入口
        type = 1,
        industryPrice = 0,															// 保存行业的价格
        industry = 0,																// 保存选择的分类		23 酒店业	1 其他旅游企业	3 非旅游企业
        ticketCount = 1;                                                            // 保存选择的套数
        
    function showIndustryType (url) {  
    	switch (url){
	    	case "23":
	    		$("#industry-type").html("酒店业");
	    		industry = 23;
	    		industryPrice = 3500;
	    		$(".adc-name").hide();
				$(".isShowMoreService").hide();
	    		industryItems.eq(0).addClass("active").siblings().removeClass("active");
				combinationPriceArr = [
					{
						name: "hmc",
						standardPrice: 1880,
						favorablePrice: 1600
					},
					{
						name: "tdc",
						standardPrice: 2180,
						favorablePrice: 1900
					},
					{
						name: "adc",
						standardPrice: 2180,
						favorablePrice: 1900
					}
				];
	    		break;
	    	case "1":
	    		$("#industry-type").html("其他旅游企业");
	    		industry = 1;
	    		industryPrice = 3800;
	    		$(".adc-name").show();
				$(".isShowMoreService").hide();
	    		industryItems.eq(1).addClass("active").siblings().removeClass("active");
				combinationPriceArr = [
					{
						name: "hmc",
						standardPrice: 2180,
						favorablePrice: 1900
					},
					{
						name: "tdc",
						standardPrice: 2180,
						favorablePrice: 1900
					},
					{
						name: "adc",
						standardPrice: 2180,
						favorablePrice: 1900
					}
				];
	    		break;
	    	case "3":
	    		$("#industry-type").html("非旅游企业");
	    		industry = 3;
	    		industryPrice = 5000;
	    		$(".adc-name").show();
				$(".isShowMoreService").show();
	    		industryItems.eq(2).addClass("active").siblings().removeClass("active");
				combinationPriceArr = [
					{
						name: "hmc",
						standardPrice: 2680,
						favorablePrice: 2500
					},
					{
						name: "tdc",
						standardPrice: 2680,
						favorablePrice: 2500
					},
					{
						name: "adc",
						standardPrice: 2680,
						favorablePrice: 2500
					}
				];
	    		break;
	    }
		for (var i = 0 ; i < combinationPriceArr.length; i++) {
			combineStandardItems.eq(i).attr("data-standard-price", combinationPriceArr[i].standardPrice).html(combinationPriceArr[i].standardPrice);
			combineFavorableItems.eq(i).attr("data-favorable-price", combinationPriceArr[i].favorablePrice).html(combinationPriceArr[i].favorablePrice);
		}
    }
	showIndustryType(url);

	addBtn.on("click", function () {
		var count = $(this).prev().find(".ticket-count");
		var vd = parseInt(count.attr("data-value")) + 1;
		count.attr("data-value", vd).html(vd);
		
		ticketCount = count.attr("data-value");
		
	}).on("selectstart", function () {
		return false;
	});

	reduceBtn.on("click", function () {
		var count = $(this).next().find(".ticket-count");
		var vd = parseInt(count.attr("data-value")) - 1;
		if (vd <= 0) {
			vd = 1;
		}
		count.attr("data-value", vd).html(vd);

		ticketCount = count.attr("data-value");
	}).on("selectstart", function () {
		return false;
	});

		// 直接下一步按钮事件
	directNextStep.on("click", function (event) {
		event.preventDefault();	
        index = 3;
        if (index == 3) {
        	if (winWidth > 640) {
	            $(".step-2").addClass("active").siblings().removeClass("active");
        	} else {
        		navMobItems.eq(1).addClass("active").siblings().removeClass("active");
        	}
        }

        pageSwitch(index);

        if (industry == 23) {
        	$("#industry-name").html("酒店业");
        } else if (industry == 1) {
        	$("#industry-name").html("其他旅游企业");
        } else {
        	$("#industry-name").html("非旅游企业");
        }

        $("#ticket-sum, #ticket-count-mob").val(ticketCount);
        $("#price-sum").html(ticketCount * industryPrice);
			// 因为现在没有折扣，所以不需减去折扣的价格
        $("#total-price").html(
//      	Number($("#price-sum").html()) - Number($(".discount-num").html())
        	Number($("#price-sum").html())
        );

		console.log("_lastIndex: " + _lastIndex, " index: " + index);
	});
	if (winWidth < 640) {
		$(".ticket-mob-item:not(:last)").on("click", function () {
			$(this).addClass("active").siblings().removeClass("active");
			ticketCount = $(this).find(".ticket-num-mob").attr("data-value");
			console.log(ticketCount);
		});
		
		
		$(".ticket-choose-mobcontainer").html("更多");
		$(".multiple-choose").on("change", function () {
			$(".ticket-choose-mobcontainer").html(
				'<span class="ticket-choose-mob" data-value="' + $(this).children(":selected").attr("value") + '">' + $(this).children(":selected").attr("value") + '</span>' + '套'
			);
			ticketCount = $(".ticket-choose-mob").attr("data-value");
			$(this).parents(".ticket-mob-item").addClass("active");
			$(".ticket-mob-item:lt(3)").removeClass("active");
		});
	}
	
    	// 其他活动门票和营销服务的入口
    activityEntrance.on("click", function (event) {
    	event.preventDefault();
    	index = 1;	
    	if (winWidth < 640) {
    		$("#toMarketingService").css({
    			"display": "inline-block",
    			"float": "none"
    		});
    		$("#backBtn").css({
    			"width": "50%",
    			"margin-right": "0",
    			"border": "0",
    			"padding": "0",
    			"text-align": "left"
    		});
    	} else {
	    	$("#toMarketingService").css("display", "block");
    	}
    	pageSwitch(index);
    });
    marketingServiceEntrance.on("click", function (event) {
    	event.preventDefault();
    	index = 2;
    	if (winWidth < 640) {
    		$("#toActivity").css({
    			"display": "inline-block",
    			"float": "none"
    		});
    		$("#prevBtn").css({
    			"width": "50%",
    			"margin-right": "0",
    			"border": "0",
    			"padding": "0",
    			"text-align": "left"
    		});
    	} else {
	    	$("#toActivity").css("display", "block");
    	}
    	pageSwitch(index);
    });
	
	/* 搭配购买活动门票 */
	var moreServiceItems = $(".more-service-item"),
		toMarketingService=  $("#toMarketingService"),
		backBtn = $("#backBtn"),
		nextBtn = $("#nextBtn");

	moreServiceItems.find(".service-num").on("click", function (event) {
		event.stopPropagation();
	}).on("selectstart", function () {
		return false;
	});
	
		// 从"活动门票页面入口"（toMarketingService）进入营销服务页面，营销服务页面不需要再有"活动门票入口"（toActivity）
	toMarketingService.on("click", function (event) {
		event.preventDefault();
		$("#toActivity").css("display", "none");
		_lastIndex = 1;
		initIndex = 1;
		index = 2;
		console.log("_lastIndex: " + _lastIndex, " index: " + index + " initIndex: " + initIndex);
		if (winWidth < 640) {
			$("#prevBtn").css({
				"width": "100%",
				"text-align": "center",
				"border": "1px solid #989898"
			});
		}
		pageSwitch(index);
	});
		/*	搭配购买活动门票页面返回上一步按钮
		 *  	1 当从第一步（选择联票方案） -> 搭配购买活动门票页面，此时，相对活动门票页面来说，_lastIndex = 0,调用页面切换函数（pageSwitch），传入_lastIndex;	(_lastIndex开始定义变量时初始化0)
		 * 		2 当从（搭配购买营销服务页面）-> 搭配购买活动门票页面，此时，相对活动门票页面来说，_lastIndex = 2, toActivity 事件时，改变 _lastIndex = 2，调用页面切换函数（pageSwitch），传入_lastIndex，返回上一步
		 * 					|---------------------》--------------------|
		 * 		当页面返回切换完成后，此时需要改变 _lastIndex = 0，因为返回（搭配购买营销服务页面）再点击返回上一步的话就是直接返回第一步
		 */
	backBtn.on("click", function (event) {
		event.preventDefault();

		pageSwitch(_lastIndex);
		if (_lastIndex == 0 && index == 1) {
			index = 0;
		} else if (_lastIndex == 1 && index == 2) {
			index = 1;
		} else if (_lastIndex == 2 && index == 1) {
			index = 2;
		}

		_lastIndex = 0;
		initIndex = 0;		

		console.log("_lastIndex: " + _lastIndex, " index: " + index);
	});

	// 保存其他服务的函数（活动门票 + 营销服务）
	function saveOtherService () {
		serviceItemArr = [];
		type = 1;
		moreServiceItems.each(function () {
			var val = $(this).find(".service-count").attr("data-value");
			var opt = Number($(this).attr("data-option"));
			if ($(this).hasClass("service-active")) {
				if (val != 0) {
					serviceItemArr.push({
                        Option: opt,
						ItemName: $(this).find(".service-item-title").html(),
						Price: $(this).find(".favorable-price-sum").attr("data-favorable-price"),
						Amount : val
					});
					if (opt > 150) {
						type = 2;
					}
				}
			}
		});

		var str = "";
		if (serviceItemArr.length <= 0) {
			$(".collocation").css("display", "none");
		} else {
			for (var i = 0; i < serviceItemArr.length; i++) {
				str += '<div class="check-info rt">' +
							'<div class="check-description" style="margin-bottom: 0;">' +
								'<h2 class="check-title lt">' + serviceItemArr[i].ItemName + '</h2>' +
								'<span class="check-price rt">' + '￥' + '<span class="price-num">' + serviceItemArr[i].Price * serviceItemArr[i].Amount + '</span></span>' +
								'<p class="check-num-mob">' +
									'数量：' +
									'<input type="number" min="0" class="ticket-quantity-mob" data-price="' + serviceItemArr[i].Price + '" value="' + serviceItemArr[i].Amount + '">' +
								'</p>' +
							'</div>' +
							'<div class="contain-list">' +
								'<div class="contain-item" style="margin: 0;">' +
									'<p class="check-num rt">' +
										'数量：' +
										'<input type="number" min="0" class="ticket-quantity" data-price="' + serviceItemArr[i].Price + '" value="' + serviceItemArr[i].Amount + '">' +
									'</p>' +
								'</div>' +
								'<div class="contain-item">' + 
									'<p class="delete-item rt">删除</p>' +
								'</div>' +
							'</div>' +
						'</div>'
			}

			$(".collocation").html(
				'<div class="check-name lt">' + '搭配购买' + '<span class="check-divide-mob"></span>' + '</div>' + str
			).css("display", "block");
		}
		
		console.log(serviceItemArr);

		$(".step-wrapper").stop().animate({
			"height": stepList.eq($(".step-list.active").index()).height()
		}, 500);
		
		var calcMoney = 0;
		for (var j = 0; j < $(".price-num").length; j++) {
			calcMoney += Number($($(".price-num")[j]).html());
		}
			// 因为现在没有折扣，所以不需减去折扣的价格
		$("#total-price").html(
//			calcMoney - Number($(".discount-num").html())
			calcMoney
		);
	}
	// 检查方案及价格页面 搭配购买部分 数量变化价格计算
	$("#step-2").on("change", ".ticket-quantity, .ticket-quantity-mob", function () {
		var calcCost = 0;		
		var index = $(this).parents(".check-info").index();
		var price = $(this).attr("data-price");
		var calcPrice = $(this).parents(".check-info").find(".price-num");

		serviceItemArr[index - 1].Amount = $(this).val();

		calcPrice.html(price * $(this).val());
		$("#step-2 .price-num").each(function () {
			calcCost += parseInt($(this).text());
		});

		$("#total-price").text(calcCost);
	});
	$("#step-2").on("change", "#ticket-sum, #ticket-count-mob", function () {
		var calcCost = 0;		
		var price = industryPrice;
		var calcPrice = $(this).parents(".check-info").find(".price-num");
		ticketCount = $(this).val();
		calcPrice.html(price * $(this).val());
		$("#step-2 .price-num").each(function () {
			calcCost += parseInt($(this).text());
		});

		$("#total-price").text(calcCost);
	});
	// 检查方案及价格页面 搭配购买部分 删除操作
	$("#step-2").on("click", ".delete-item", function () {
		var calcCost = 0;
		var parentsNode = $(this).parents(".check-info");
		var index = parentsNode.index();
		parentsNode.remove();
		serviceItemArr.splice(index - 1, 1);
		console.log(serviceItemArr);
		$("#step-2 .price-num").each(function () {
			calcCost += parseInt($(this).text());
		});

		$("#total-price").text(calcCost);
		$(".step-wrapper").stop().animate({
			"height": stepList.eq($(".step-list.active").index()).height()
		}, 500);

	});

	$(".more-service-item .close").on("click", function (event) {
		event.stopPropagation();
		event.cancelBubble = true;
		$(this).css("display", "none").parent().removeClass("service-active").find(".service-count").attr("data-value", 0).html(0).end().find(".choose-checkbox").prop("checked", false);
	}).on("selectstart", function () {
		return false;
	});
	
	nextBtn.on("click", function (event) {
		event.preventDefault();
		_lastIndex = 1;
		directNextStep.trigger("click");

		saveOtherService();
	});
	
	
	/* 搭配购买营销服务 */
	var serviceAddBtn = $(".more-service-item .add"),
		serviceReduceBtn = $(".more-service-item .reduce"),
		toActivity = $("#toActivity"),
		prevBtn = $("#prevBtn"),
		continueBtn = $("#continueBtn");
	var serviceItemContainer = moreServiceItems.children(".service-item-container");
	

	serviceItemContainer.on("click", function () {
		$(this).parent().addClass("service-active").children(".close").css("display", "block").end().find(".service-count").attr("data-value", 1).html(1).end().find(".choose-checkbox").prop("checked", true);
	});
	$(".service-item-intro a").on("click", function (event) {
		event.stopPropagation();
		event.cancelBubble = true;
	});
	
	if (winWidth < 640) {
		serviceItemContainer.unbind("click");
		// $(".choose-checkbox").on("click", function () {
		// 	var parentsNode = $(this).parents(".more-service-item");
		// 	$(this).prop("checked");
		// 	if ($(this).is(":checked")) {
		// 		parentsNode.addClass("service-active");
		// 		parentsNode.find(".service-count").attr("data-value","1").html(1);
		// 	} else {
		// 		parentsNode.removeClass("service-active");
		// 		parentsNode.find(".service-count").attr("data-value", "0").html(0);
		// 	}
		// });
	}
	$(".choose-checkbox").on("click", function (event) {
		event.stopPropagation();
		event.cancelBubble = true;
		var parentsNode = $(this).parents(".more-service-item");
		if ($(this).prop("checked")) {
			parentsNode.addClass("service-active").children(".close").css("display", "block").end().find(".service-count").attr("data-value", 1).html(1).end().find(".choose-checkbox").prop("checked", true);
		} else {
			parentsNode.find(".close").css("display", "none").end().removeClass("service-active").find(".service-count").attr("data-value", 0).html(0).end().find(".choose-checkbox").prop("checked", false);			
		}
		
	}).on("selectstart", function () {
		return false;
	});
	
	serviceAddBtn.on("click", function (event) {
		event.stopPropagation();
		event.cancelBubble = true;
		if (winWidth > 640) {
			$(this).parents(".more-service-item").addClass("service-active");
		}
    	var vd = parseInt($(this).prev().find(".service-count").attr("data-value")) + 1;
		$(this).prev().find(".service-count").attr("data-value", vd).html(vd);
	}).on("selectstart", function () {
		return false;
	});
	
	serviceReduceBtn.on("click", function (event) {
		event.stopPropagation();
		event.cancelBubble = true;
		var vd = parseInt($(this).next().find(".service-count").attr("data-value")) - 1;
    	if (vd < 0) {
    		vd = 0;
    	}
    	if (vd == 0) {
    		$(this).parents(".more-service-item").removeClass("service-active service-choose").children(".close").css("display", "none");
    		$(".choose-checkbox").prop("checked", false);
    	}
		$(this).next().find(".service-count").attr("data-value", vd).html(vd);
	}).on("selectstart", function () {
		return false;
	});
		/*	搭配购买营销服务页面返回上一步按钮
		 *  	1 当从第一步（选择联票方案） -> 搭配购买营销服务页面，此时，相对营销服务页面来说，_lastIndex = 0,调用页面切换函数（pageSwitch），传入_lastIndex;	(_lastIndex开始定义变量时初始化0)
		 * 		2 当从（搭配购买活动门票页面）-> 搭配购买营销服务页面，此时，相对营销服务页面来说，_lastIndex = 1, toMarketingService 事件时，改变 _lastIndex = 1，调用页面切换函数（pageSwitch），传入_lastIndex，返回上一步
		 * 					|---------------------》--------------------|
		 * 		当页面返回切换完成后，此时需要改变 _lastIndex = 0，因为返回（搭配购买活动门票页面）再点击返回上一步的话就是直接返回第一步
		 */
	prevBtn.on("click", function (event) {
		event.preventDefault();

		pageSwitch(_lastIndex);
		if (_lastIndex == 1 && index == 2) {		
			index = 1;
			_lastIndex = 0;
		}
		if (_lastIndex == 0 && index == 2) {
			index = 0;
			_lastIndex = 0;
			
		}
		initIndex = 0;
		
		console.log("_lastIndex: " + _lastIndex, " index: " + index);
	});
		// 从"营销服务页面入口"（toActivity）进入活动门票页面，活动门票页面不需要再有"营销服务入口"（toMarketingService）
	toActivity.on("click", function (event) {
		event.preventDefault();
		$("#toMarketingService").css("display", "none");
		_lastIndex = 2;
		index = 1;
		initIndex = 2;
		console.log("_lastIndex: " + _lastIndex, " index: " + index + " initIndex" + initIndex);
		if (winWidth < 640) {
			$("#backBtn").css({
				"width": "100%",
				"text-align": "center",
				"border": "1px solid #989898"
			});
		}
		pageSwitch(index);
		
	});

	continueBtn.on("click", function (event) {
		event.preventDefault();
		_lastIndex = 2;
		directNextStep.trigger("click");
		saveOtherService();

		console.log(initIndex);
	});
    /* 2 检查方案及价格 */
   	$("#toStep1").on("click", function (event) {
   		event.preventDefault();

		if (winWidth > 640) {
			$(".step-1").addClass("active").siblings().removeClass("active");
		} else {
			navMobItems.eq(0).addClass("active").siblings().removeClass("active")
		}
		
		$(".more-service-item").each(function () {
			$(this).removeClass("service-active service-choose").find(".service-count").attr("data-value", 0).html(0).end().find(".close").css("display", "none");
			$(this).find(".choose-checkbox").prop("checked", false);
		});

		$(".collocation").empty();
		pageSwitch(_lastIndex);

		if (_lastIndex == 1 && index == 3) {

			if (initIndex == 2) {
				_lastIndex = 2;
				index = 1;
			} else if (initIndex == 0) {
				_lastIndex = 0;
				index = 1;
			}
			console.log("_lastIndex: " + _lastIndex, " index: " + index);
			return;
		} else if (_lastIndex == 2 && index == 3) {
			if (initIndex == 1) {
				_lastIndex = 1;
				index = 2;
			} else if (initIndex == 0) {
				_lastIndex = 0;
				index = 2;
			}
			console.log("_lastIndex: " + _lastIndex, " index: " + index);
			return;
		} else if (_lastIndex == 0 && index == 3) {
			index = 0;
			console.log("_lastIndex: " + _lastIndex, " index: " + index);
		}

   	});

	$("#toStep3").on("click", function (event) {
		event.preventDefault();
		index = 4;
		if (index == 4) {
			if (winWidth > 640) {
				$(".step-3").addClass("active").siblings().removeClass("active");
			} else {
				navMobItems.eq(2).addClass("active").siblings().removeClass("active");
			}
		}
		pageSwitch(index);
		//console.log(serviceItemArr);
	});

    /* 3 填写联系方式及发票信息 */
    var userName = $("#fm_Name"),
    	userMobile = $("#fm_Mobile"),
    	userCompany = $("#fm_Company"),
    	userEmail = $("#fm_Mail"),
		userIndustry = $("#fm_Industry")
    	userJob = $("#fm_JobTitle");

    	// 是不是联票负责人
    var directorId = 1,															// 判断是不是负责人，1 是	0 否
    	principalContainer = $(".principal-container"),							// 负责人容器
    	principalName = $("#fm_DirectorName"),									// 负责人姓名
    	principalMobile = $("#fm_DirectorMobile"),								// 负责人手机
    	principalJob = $("#fm_DirectorJob"),									// 负责人职位
    	principalEmail = $("#fm_DirectorMail");									// 负责人邮箱地址
	
	function changeCopyPos () {
		$(".step-wrapper").stop().animate({"height": $(this).parents(".step-list").height()}, 200);
	}
	
	$(".principal span").on("click", function () {
		$(this).addClass("active").siblings("span").removeClass("active");
		directorId = $(this).attr("data-value");
		if (directorId == 0) {
			principalContainer.slideDown(200, changeCopyPos);
		} else {
			principalContainer.slideUp(200, changeCopyPos);
			principalContainer.find("input").val("");
		}
	});

    	// 发票内容
    var invoiceAddrContainer = $("#invoice-addr-container"),					// 发票邮寄地址容器
    	invoiceCategory = $("#fm_InvoiceType"),									// 发票的类型
    	invoiceCost = $("#fm_InvoiceContent"),									// 发票的费用类型
    	invoiceTitle = $("#fm_InvoiceTitle");									// 发票抬头

    	// 增值税发票
    var specialInvoice = $(".special-invoice"),									// 增值税发票容器
    	invoiceCompanyName = $("#fm_TaxName"),									// 公司注册名称
    	invoiceTaxationCertificate = $("#fm_TaxId"),							// 税务登记证号码
    	invoiceCompanyAddr = $("#fm_TaxAddress"),								// 公司注册地址
    	invoiceCompanyTel = $("#fm_TaxPhone"),									// 公司电话
    	bankName = $("#fm_TaxBank"),											// 开户银行
    	bankAccount = $("#fm_TaxBankAccount");									// 银行账号

		// 发票分类选择
    invoiceCategory.on("change", function () {
    	var val = parseInt($(this).val());
    	if (val == 0) {
    		invoiceCost.css("display", "none");
    		invoiceTitle.css("display", "none");
    		invoiceAddrContainer.slideUp(200, changeCopyPos);
    		specialInvoice.slideUp(200, changeCopyPos);
    	} else if (val == 1) {
    		invoiceCost.css("display", "block");
    		invoiceTitle.css("display", "block");
    		invoiceAddrContainer.slideDown(200, changeCopyPos);
    		specialInvoice.find("input").val("");
    		specialInvoice.slideUp(200, changeCopyPos);
    	} else {
    		invoiceCost.css("display", "block");
    		invoiceTitle.css("display", "block");
    		invoiceAddrContainer.slideDown(200, changeCopyPos);
    		specialInvoice.slideDown(200, changeCopyPos);
    	}	    	
    });
	
    	// 发票邮寄地址
    var invoiceProvince = $("#ddlProvince"),						            // 发票邮寄省份
    	invoiceCity = $("#ddlCity"),								            // 发票邮寄城市
    	invoiceAddress = $("#fm_Address"),							            // 发票邮寄详细地址
    	invoicePostCode = $("#fm_Postcode");						            // 发票邮寄的邮政编码

    invoiceProvince.on("change", function () {
    	var vl = parseInt($(this).val());
    	if (vl == 0) {
    		invoiceCity.find("option").remove().end().append("<option value='0'>城市</option>");
    	} else {
    		$.post("/Api/GetCityList", { parentId: vl }, function (json) {
    			if (json.Code == 0) {
    				var opts = "";
    				for (var i = 0; i < json.Data.length; i++) {
    					opts += '<option value="' + json.Data[i].Id + '"data-zip="' + json.Data[i].PostCode + '">' + json.Data[i].Name + '</option>';
    				}
    				invoiceCity.find("option").remove().end().append(opts);
    				invoicePostCode.val(invoiceCity.children(":selected").attr("data-zip"));
    			}
    		}, "json");
    	}
    });
    invoiceCity.on("change", function () {
    	invoicePostCode.val($(this).children(":selected").attr("data-zip"));
    }).change();

	//	 备注
	var tips = $("#fm_Remark");

	$("#backStep2").on("click", function (event) {
		event.preventDefault();
		index = 3;
		if (index == 3) {
			if (winWidth > 640) {
				$(".step-2").addClass("active").siblings().removeClass("active");
			} else {
				navMobItems.eq(1).addClass("active").siblings().removeClass("active");
			}
		}
		pageSwitch(index);
	});

	$("#step-3 :input:not([type=button])").on("change input", function () {
		layer.closeAll();
	});

	// 提交动作
	var btn = $("#submitForm");
	var hasTip = false;
	btn.on("click", function (event) {
		event.preventDefault();

		var isRepeat = false;

		var tipOption = {
            tips: [1, "#D28D51"],
            time: 1500,
			end: function () { hasTip = false }
       	};
        var mobileArr = [];
        var emailArr = [];

		if (userName.val() == "") {
			body.animate({ scrollTop: userName.offset().top -100 }, 100);
			userName.focus();
			if (hasTip == false) {
				layer.tips("请填写您的姓名", userName, tipOption);
				hasTip = true;
			}
			return false;
		}
		if (userCompany.val() == "") {
			body.animate({ scrollTop: userCompany.offset().top -100 }, 100);
			userCompany.focus();
			if (hasTip == false) {
				layer.tips("请填写公司名称", userCompany, tipOption);
				hasTip = true;
			}
			return false;
		}
		if (userJob.val() == "") {
			body.animate({ scrollTop: userJob.offset().top -100 }, 100);
			userJob.focus();
			if (hasTip == false) {
				layer.tips("请填写您的职位", userJob, tipOption);
				hasTip = true;
			}
			return false;
		}
		if (userMobile.val() == "") {
			body.animate({ scrollTop: userMobile.offset().top -100 }, 100);
			userMobile.focus();
			if (hasTip == false) {
				layer.tips("请填写您的手机号码", userMobile, tipOption);
				hasTip = true;
			}
			return false;
		} else if (!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|([0][9]\d{8}$)|(([6|9])\d{7}$)|([6]([8|6])\d{5}$)/.test(userMobile.val())) {
			body.animate({ scrollTop: userMobile.offset().top -100 }, 100);
			userMobile.focus();
			if (hasTip == false) {
				layer.tips("手机号码格式不正确，请检查", userMobile, tipOption);
				hasTip = true;
			}
			return false;
		}
		if (userEmail.val() == "") {
			body.animate({ scrollTop: userEmail.offset().top -100 }, 100);
			userEmail.focus();
			if (hasTip == false) {
				layer.tips("请填写您的公司邮箱地址", userEmail, tipOption);
				hasTip = true;
			}
			return false;
		} else if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(userEmail.val())) {
			body.animate({ scrollTop: userEmail.offset().top -100 }, 100);
			userEmail.focus();
			if (hasTip == false) {
				layer.tips("邮箱的格式不正确，请检查", userEmail, tipOption);
				hasTip = true;
			}
			return false;
		}
		if (userIndustry.val() == 0) {
			body.animate({ scrollTop: userIndustry.offset().top - 100 }, 100);
			userIndustry.focus();
			if (hasTip == false) {
				layer.tips("请选择您所在的行业类别", userIndustry, tipOption);
				hasTip = true;
			}
			return false;
		}
		

			// 是不是负责人
		if (directorId == 0) {
			if (principalName.val() == "") {
				body.animate({ scrollTop: principalName.offset().top -100 }, 100);
				principalName.focus();
				if (hasTip == false) {
					layer.tips("请填写负责人姓名", principalName, tipOption);
					hasTip = true;
				}
				return false;
			}
			if (principalMobile.val() == "") {
				body.animate({ scrollTop: principalMobile.offset().top -100 }, 100);
				principalMobile.focus();
				if (hasTip == false) {
					layer.tips("请填写负责人的手机号码", principalMobile, tipOption);
					hasTip = true;
				}
				return false;
			} else if (!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|([0][9]\d{8}$)|(([6|9])\d{7}$)|([6]([8|6])\d{5}$)/.test(principalMobile.val())) {
				body.animate({ scrollTop: principalMobile.offset().top -100 }, 100);
				principalMobile.focus();
				if (hasTip == false) {
					layer.tips("手机号码格式不正确，请检查", principalMobile, tipOption);
					hasTip = true;
				}
				return false;
			}
			if (principalJob.val() == "") {
				body.animate({ scrollTop: principalJob.offset().top -100 }, 100);
				principalJob.focus();
				if (hasTip == false) {
					layer.tips("请填写负责人的职位", principalJob, tipOption);
					hasTip = true;
				}
				return false;
			}
			if (principalEmail.val() == "") {
				body.animate({ scrollTop: principalEmail.offset().top -100 }, 100);
				principalEmail.focus();
				if (hasTip == false) {
					layer.tips("请填写负责人的邮箱地址", principalEmail, tipOption);
					hasTip = true;
				}
				return false;
			} else if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(principalEmail.val())) {
				body.animate({ scrollTop: principalEmail.offset().top -100 }, 100);
				principalEmail.focus();
				if (hasTip == false) {
					layer.tips("邮箱的格式不正确，请检查", principalEmail, tipOption);
					hasTip = true;
				}
				return false;
			}
		}

			// 发票选择
		if (invoiceCategory.val() != 0) {
			if (invoiceCost.val() == 0) {
				body.animate({ scrollTop: invoiceCost.offset().top -100 }, 100);
				invoiceCost.focus();
				if (hasTip == false) {
					layer.tips("请选择发票内容", invoiceCost, tipOption);
					hasTip = true;
				}
				return false;
			}
			if (invoiceTitle.val() == "") {
				body.animate({ scrollTop: invoiceTitle.offset().top -100 }, 100);
				invoiceTitle.focus();
				if (hasTip == false) {
					layer.tips("请填写发票抬头", invoiceTitle, tipOption);
					hasTip = true;
				}
				return false;
			}
			if (invoiceProvince.val() == "" || invoiceProvince.val() == 0) {
				body.animate({ scrollTop: invoiceProvince.offset().top -100 }, 100);
				invoiceProvince.focus();
				if (hasTip == false) {
					layer.tips("请选择发票邮寄的省份", invoiceProvince, tipOption);
					hasTip = true;
				}
				return false;
			}
			if (invoiceAddress.val() == "") {
				body.animate({ scrollTop: invoiceAddress.offset().top -100 }, 100);
				invoiceAddress.focus();
				if (hasTip == false) {
					layer.tips("请填写发票邮寄的详细地址", invoiceAddress, tipOption);
					hasTip = true;
				}
				return false;
			}
		}
		if (invoiceCategory.val() == 2) {
			if (invoiceCompanyName.val() == "") {
				body.animate({ scrollTop: invoiceCompanyName.offset().top -100 }, 100);
		  		invoiceCompanyName.focus();
				if (hasTip == false) {
					layer.tips("请填写公司注册名称", invoiceCompanyName, tipOption);
					hasTip = true;
				}
				return false;
		  	}
		  	if (invoiceTaxationCertificate.val() == "") {
				body.animate({ scrollTop: invoiceTaxationCertificate.offset().top -100 }, 100);
		  		invoiceTaxationCertificate.focus();
				if (hasTip == false) {
					layer.tips("请填写税务登记证号码", invoiceTaxationCertificate, tipOption);
					hasTip = true;
				}
				return false;
		  	}
		  	if (invoiceCompanyAddr.val() == "") {
				body.animate({ scrollTop: invoiceCompanyAddr.offset().top -100 }, 100);
		  		invoiceCompanyAddr.focus();
				if (hasTip == false) {
					layer.tips("请填写公司注册地址", invoiceCompanyAddr, tipOption);
					hasTip = true;
				}
				return false;
		  	}
		  	if (invoiceCompanyTel.val() == "") {
				body.animate({ scrollTop: invoiceCompanyTel.offset().top -100 }, 100);
		  		invoiceCompanyTel.focus();
				if (hasTip == false) {
					layer.tips("请填写公司电话", invoiceCompanyTel, tipOption);
					hasTip = true;
				}
				return false;
		  	}
		  	if (bankName.val() == "") {
				body.animate({ scrollTop: bankName.offset().top -100 }, 100);
		  		bankName.focus();
				if (hasTip == false) {
					layer.tips("请填写开户银行", bankName, tipOption);
					hasTip = true;
				}
				return false;
		  	}
		  	if (bankAccount.val() == "") {
				body.animate({ scrollTop: bankAccount.offset().top -100 }, 100);
		  		bankAccount.focus();
				if (hasTip == false) {
					layer.tips("请填写银行账号", bankAccount, tipOption);
					hasTip = true;
				}
				return false;
		  	}
		}

		$(".mobile").each(function () {
			mobileArr.push($(this).val());
		});
		$(".email").each(function () {
			emailArr.push($(this).val());
		});

		// 验证手机和邮箱重复的函数
		function valiRepeat (objArr, elem, type) {
			for (var i = 0; i < objArr.length; i++) {
				var objValue = objArr[i];
				for (var j = 0; j < objArr.length; j++) {
					if (objArr[j] == objValue && j != i) {
						elem.eq(j).focus();
						layer.tips(type + "重复，请检查", elem.eq(j), tipOption);
						isRepeat = true;
						return false;
					}
				}
			}
		}
		valiRepeat(mobileArr, $(".mobile"), "电话号码");
		if (isRepeat) {
			return false;
		}
		valiRepeat(emailArr, $(".email"), "电子邮箱");
		if (isRepeat) {
			return false;
		}

		var str = "";
        $("#step-3").find(":input:not(button)").each(function () {
            var id = $(this).attr("id");
            if (!id || id.length < 4) {
                return true;
            }
            id = id.substring(3);
            str += '\"' + id + '\": \"' + $(this).val() + '\", ';
        });

		str += '\"Type\": \"' + type + '\", ';
        str += '\"DelegateType\": \"' + industry + '\", ';
        str += '\"Amount\": \"' + ticketCount + '\", ';
        str += '\"IsDirector\": \"' + (directorId == 1) + '\"';
        str = str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\\/g, "");

        var json = JSON.parse("{ " + str + " }");
		json = $.extend({}, json, {"OrderServiceList": serviceItemArr});

        btn.val("正在提交...").prop("disabled", true).css({"background-color":"#d1d1d1", "border-color": "#d1d1d1", "color": "#fff"});
        var index = layer.load(1, {
            shade: [0.2, '#000']
        });
		$.ajax({
            url: "/Packaged/OrderSave",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "pt": json }),
            cache: false,
            success: function (js) {
                if (js.Code == 0) {
                    layer.close(index);
                    pageSwitch(5);
                } else {
                    layer.close(index);
                    btn.val("提交").prop("disabled", false);
                    layer.alert("报名失败：" + js.Message);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.close(index);
                btn.val("提交").prop("disabled", false);
                layer.alert("请求出错：" + textStatus + "；" + errorThrown, { icon: 2 });
            }
        });
	});
});
