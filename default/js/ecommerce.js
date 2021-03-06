"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;
var siteRoot = '';
$(document).ready(function () {

    //Check Order
    $(".check-order-button").on("click", function (e) {
        var urladd = siteRoot + "/Product/Services/ProductService.aspx";
        if ($(".check-order-input").val().trim() == '') return false;
        var data = { 'method': 'SearchOrder', 'ordercode': $(".check-order-input").val() };

        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                console.log(response);
                if (response.success) {
                    $(".cart-history").html(response.data);
                }
            },
            complete: function complete() {}
        });
        e.preventDefault();
    });

    /*************************************************************************************************************/
    /* BEGIN SEARCH
    /*************************************************************************************************************/
    //Search button
    $("#select-rangeprice").change(function () {
        window.location.href = $(this).val();
    });

    $(".productsearchbox input[type='submit'],.productsearchbox button").click(function () {
        var container = $(this).parent();
        if ($(container).find(".suggestsearch ul li.selected").length) {
            var n = $(container).find(".suggestsearch ul li.selected").eq(0).children("a").attr("href");
            window.location = n;

            return false;
        }

        if ($(container).find("input[type='text']").val() == '') {
            $(container).find("input[type='text']").focus();
            return false;
        }
    });

    //Search textbox
    $(".productsearchbox input[type='text']").keyup(function (n) {
        //        SuggestSearch(this, n);
        if (n.which == 13) {
            $(".productsearchbox input[type='submit'],.productsearchbox button").trigger('click');
            return false;
        }

        CallSuggest(this);
    });

    //    $(".productsearchbox input[type='text']").keydown(function () {
    //        CheckTimer();
    //    });

    var beginTime = 0,
        endTime = 0;

    function CheckTimer() {
        var n = new Date();
        beginTime == 0 && endTime == 0 && (beginTime = n.getTime());
        return;
    }

    function SuggestSearch(obj, n) {
        var i = new Date(),
            t;
        var suggestBoxItems = $(obj).parent().find(".suggestsearch ul");

        if (endTime = i.getTime(), beginTime = endTime, n.which == 40) {
            //$(".productsearchbox .suggestsearch ul li.selected").length == 0 ? $(".productsearchbox .suggestsearch ul li:first").addClass("selected") : (t = $(".productsearchbox .suggestsearch ul li.selected").next(), t.hasClass("li-group") && (t = t.next()), $(".productsearchbox .suggestsearch ul li.selected").removeClass("selected"), t.addClass("selected"));
            $(suggestBoxItems).find(".selected").length == 0 ? $(suggestBoxItems).find("li").first().addClass("selected") : (t = $(suggestBoxItems).find(".selected").next(), t.hasClass("li-group") && (t = t.next()), $(suggestBoxItems).find(".selected").removeClass("selected"), t.addClass("selected"));
            return;
        }
        if (n.which == 38) {
            //$(".productsearchbox .suggestsearch ul li.selected").length == 0 ? $(".productsearchbox .suggestsearch ul li:last").addClass("selected") : (t = $(".productsearchbox .suggestsearch ul li.selected").prev(), t.hasClass("li-group") && (t = t.prev()), $(".productsearchbox .suggestsearch ul li.selected").removeClass("selected"), t.addClass("selected"));
            $(suggestBoxItems).find(".selected").length == 0 ? $(suggestBoxItems).find("li").last().addClass("selected") : (t = $(suggestBoxItems).find(".selected").prev(), t.hasClass("li-group") && (t = t.prev()), $(suggestBoxItems).find(".selected").removeClass("selected"), t.addClass("selected"));
            return;
        }

        SetTimeer(obj, 1);
    }

    function SetTimeer(obj, n) {
        setTimeout(function () {
            var i = new Date(),
                t = i.getTime();
            if (beginTime == endTime) {
                if (t - endTime < 100 && t - endTime >= 0) {
                    SetTimeer(obj, n);
                    return;
                }
                if (t - endTime >= 100) {
                    CallSuggest(obj);
                    return;
                }
            } else return;
        }, n);
    }

    function CallSuggest(obj) {
        var container = $(obj).parent();
        if (!$(container).find(".suggestsearch").length) $(container).append("<div class='suggestsearch'></div>");

        var suggestBox = $(container).find(".suggestsearch");

        var t = $(obj).val().replace(/:|;|!|@@|#|\$|%|\^|&|\*|'|"|>|<|,|\.|\?|\/|`|~|\+|=|_|\(|\)|{|}|\[|\]|\\|\|/gi, ""),
            n = t.trim().toLowerCase();
        if (n.length < 2) {
            $(suggestBox).hide();
            return;
        }
        n.length >= 2 && ($(obj).addClass("loading"), $.ajax({
            url: siteRoot + "/Product/Services/SuggestSearch.ashx",
            type: "GET",
            dataType: "html",
            data: {
                q: n
            },
            cache: !0,
            success: function success(data) {
                $(obj).removeClass("loading");
                data == "" || data == " " ? $(suggestBox).hide() : $(suggestBox).html(data).show();
            }
        }));
    }

    var obp = $(".searchresults .productcount");
    if ($(obp).length) {
        $.get(siteRoot + "/Product/Services/SearchCountResult.ashx?q=" + $(obp).attr("keyword"), function (data) {
            $(obp).text(" (" + data + ")");
        });
    }

    var obn = $(".searchresults .newscount");
    if ($(obn).length) {
        $.get(siteRoot + "/News/Services/SearchCountResult.ashx?q=" + $(obn).attr("keyword"), function (data) {
            $(obn).text(" (" + data + ")");
        });
    }

    /*************************************************************************************************************/
    /* END SEARCH
    /*************************************************************************************************************/

    /*************************************************************************************************************/
    /* BEGIN FILTER
    /*************************************************************************************************************/

    /********Price filter ********/
    // minprice = 0;
    // maxprice = 10000000;
    var minprice = 0;
    var maxprice = 10000000;
    initSlider();

    function initSlider() {
        if ($('#slider-range').length > 0) {
            minValue = 0;
            maxValue = 10000000;
            if ($('.pricemin').text().length) minValue = parseInt($('.pricemin').text());
            if ($('.pricemax').text().length) maxValue = parseInt($('.pricemax').text());

            var options = {
                range: true,
                step: 500000,
                min: 0,
                max: 10000000,
                values: [minValue, maxValue],
                slide: function slide(event, ui) {
                    $(".price-range .min-input").html(addCommas(ui.values[0]));
                    $(".price-range .max-input").html(addCommas(ui.values[1]));
                },
                change: function change(event, ui) {
                    if (minprice == ui.values[0] && maxprice == ui.values[1]) {
                        // do nothing
                    } else {
                        minprice = ui.values[0];
                        maxprice = ui.values[1];
                        priceChange();
                    }
                }
            };

            $("#slider-range").slider(options);

            $(".price-range .min-input").html(addCommas($("#slider-range").slider("values", 0)));
            $(".price-range .max-input").html(addCommas($("#slider-range").slider("values", 1)));
        }
    }

    $("body").on("click", '.ajaxproductlink', function (e) {
        e.preventDefault();

        var obj = $(this);
        obj.parent().parent().find('.ajaxproductlink').removeClass('active');
        obj.addClass('active');

        var zoneId = obj.attr('data-zoneid');
        var urladd = siteRoot + "/Product/Services/ProductService.aspx";
        var data = { 'method': 'SearchProducts', 'position': obj.attr('data-id'), 'template': 'ProductsSpecical.xslt' };
        if (zoneId != null) data = { 'method': 'SearchProducts', 'position': obj.attr('data-id'), 'template': 'ProductsSpecical.xslt', 'zoneid': zoneId };

        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success) {
                    console.log($(response.data));
                    obj.parent().parent().parent().find('.ajaxproductresponse').html($(response.data).find('.ajaxproductresponse').html());
                    //CarouselInit.InitProductsHomePage();                    
                }
            },
            complete: function complete() {}
        });

        return false;
    });

    if ($(".tv-sale").length > 0) {
        if ($(".tv-sale .nav-tabs .nav-link.active").length > 0 && $(".tv-sale .nav-tabs .nav-link.active").data("id") == '-1') {

            var obj = $(".tv-sale .nav-tabs .nav-link.active").eq(0);
            obj.parent().parent().find('.ajaxzoneproductlink').removeClass('active');
            obj.addClass('active');

            var zoneId = obj.attr('data-id');
            var urladd = siteRoot + "/Product/Services/ProductService.aspx";
            var data = { 'method': 'ZoneProducts', 'position': '-1', 'template': 'ZoneProduct.xslt', 'mid': 246 };
            if (zoneId != null) data = { 'method': 'ZoneProducts', 'position': '-1', 'template': 'ZoneProduct.xslt', 'zoneid': zoneId, 'mid': 246 };

            $.ajax({
                cache: false,
                url: urladd,
                data: data,
                type: 'post',
                success: function success(response) {
                    if (response.success) {
                        obj.parent().parent().parent().find('.ajaxproductresponse').html($(response.data).find('.ajaxproductresponse').html());
                        //CarouselInit.InitProductsHomePage();

                        $("body").on("click", '.ajaxzoneproductlink', function (e) {
                            e.preventDefault();

                            //var target = $(e.target).attr("href") // activated tab          
                            var obj = $(this);

                            obj.parent().parent().find('.ajaxzoneproductlink').removeClass('active');
                            obj.addClass('active');

                            var zoneId = obj.attr('data-id');
                            var urladd = siteRoot + "/Product/Services/ProductService.aspx";
                            var data = { 'method': 'ZoneProducts', 'position': '-1', 'template': 'ZoneProduct.xslt', 'mid': 246 };
                            if (zoneId != null) data = { 'method': 'ZoneProducts', 'position': '-1', 'template': 'ZoneProduct.xslt', 'zoneid': zoneId, 'mid': 246 };

                            $.ajax({
                                cache: false,
                                url: urladd,
                                data: data,
                                type: 'post',
                                success: function success(response) {
                                    if (response.success) {
                                        obj.parent().parent().parent().find('.ajaxproductresponse').html($(response.data).find('.ajaxproductresponse').html());
                                        //CarouselInit.InitProductsHomePage();
                                    }
                                },
                                complete: function complete() {}
                            });

                            return false;
                        });
                    }
                },
                complete: function complete() {}
            });

            return false;
        }
    }

    $("body").on("click", '.tv-onair .ajaxzoneproductlink', function (e) {

        //var target = $(e.target).attr("href") // activated tab          
        var obj = $(this);

        obj.parent().parent().find('.ajaxzoneproductlink').removeClass('active');
        obj.addClass('active');

        var _zoneId = obj.attr('data-id');

        var urladd = siteRoot + "/Product/Services/ProductService.aspx";
        var data = { 'method': 'TvOnAirProducts', 'position': '-1', 'template': 'TvProduct.xslt' };
        if (_zoneId != null) data = { 'method': 'TvOnAirProducts', 'position': '-1', 'template': 'TvProduct.xslt', 'zoneid': _zoneId };

        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success) {
                    $('.tv-onair .ajaxproductresponse').html('');
                    $('.tv-onair .ajaxproductresponse').html($(response.data).find('.ajaxproductresponse').html());
                    // lazyloadAjax();
                    //CarouselInit.InitProductsHomePage();
                }
            },
            complete: function complete() {}
        });

        return false;
    });

    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    }

    function priceChange() {
        pageurl = $('.urlwithoutprice').attr('href');
        $.ajax({
            url: pageurl,
            data: { isajax: true, price: minprice + '-' + maxprice },
            success: function success(data) {
                $('.ajaxresponse').html($(data).find('.ajaxresponse').html());
                $('.ajaxfilterresponse').html($(data).find('.ajaxfilterresponse').html());
                $('.productpager').remove();
                $(data).find('.productpager').insertAfter($('.ajaxresponse'));

                pageurl = $(data).find('.urlwithprice').attr('href');
                //to change the browser URL to 'pageurl'
                if (pageurl != window.location) {
                    window.history.pushState({ path: pageurl }, '', pageurl);
                }

                lazyloadAjax();
            }

        });
    }
    /********End Price filter ********/

    /********Reward points ********/
    initPointSlider();

    function initPointSlider() {
        var pointSlider = $('#pointSlider');
        if (pointSlider.length > 0) {
            var options = {
                range: false,
                step: pointSlider.data('step'),
                min: pointSlider.data('min'),
                max: pointSlider.data('max'),
                value: pointSlider.data('value'),
                slide: function slide(event, ui) {
                    $("#spendingPointsLabel").text(ui.value);
                    $("#spendingPoints").val(ui.value);
                },
                change: function change(event, ui) {
                    var data = { 'method': 'SpendingPoint', 'point': $("#spendingPoints").val() };
                    $.ajax({
                        cache: false,
                        url: siteRoot + "/Product/Services/CheckoutService.aspx",
                        data: data,
                        type: 'post',
                        success: function success(result) {
                            if (result.success) {
                                $('.discount-total').html(result.discountTotal);
                                $('.order-total').html(result.total);
                            } else alert(result.message);
                        }
                    });
                }
            };

            pointSlider.slider(options);
        }
    }
    /********End Reward points ********/

    /****************/
    /* Ajax process */
    /****************/
    $("body").on("change", '.ajaxsort', function () {
        ProcessAjax($(this).val());
    });

    $("body").on("click", 'a.ajaxlink', function (e) {
        e.preventDefault();

        ProcessAjax($(this).attr('href'));

        //window.scrollTo(0, 0);
        if ($(this).parent().hasClass('reset_wrap')) initSlider();

        return false;
    });

    function ProcessAjax(pageurl) {
        //to get the ajax content and display in div with id 'content'
        $.ajax({
            url: pageurl,
            data: { isajax: true },
            success: function success(data) {
                $('.productpage  .ajaxresponse').html($(data).find('.ajaxresponse').html());
                $('.productpage  .ajaxfilterresponse').html($(data).find('.ajaxfilterresponse').html());
                $('.productpage .ajaxbrandresponse').html($(data).find('.ajaxbrandresponse').html());
                $('.productpage .productpager').remove();
                $(data).find('.productpager').insertAfter($('.productpage .ajaxresponse'));
                var nextPage = $(data).filter(".viewmoreurl").text();
                $('.ajaxpagerlink').attr('href', nextPage);
                if (nextPage) {
                    $('.ajaxpagerlink').show();
                } else {
                    $('.ajaxpagerlink').hide();
                }
            }
        });

        //to change the browser URL to 'pageurl'
        if (pageurl != window.location) {
            window.history.pushState({ path: pageurl }, '', pageurl);
        }
    }

    var isLoading = false;
    if ($('a.ajaxpagerlink').length) {
        var height = $('footer').height();
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - height) {
                if (isLoading == false) {
                    isLoading = true;
                    $('a.ajaxpagerlink').trigger('click');
                }
            }
        });
    }

    $("body").on("click", "a.ajaxpagerlink", function (e) {
        e.preventDefault();
        /*  
        if uncomment the above line, html5 nonsupported browers won't change the url but will display the ajax content;
        if commented, html5 nonsupported browers will reload the page to the specified link. 
        */

        //get the link location that was clicked
        obj = $(this);
        pageurl = $(this).attr('href');
        if (!pageurl.length) return;

        //to get the ajax content and display in div with id 'content'
        $.ajax({
            url: pageurl,
            data: { isajax: true },
            success: function success(data) {
                $('.ajaxresponse .ajaxresponsewrap').append($(data).find('.ajaxresponsewrap').html());
                obj.remove();
                isLoading = false;
            }
        });
        //to change the browser URL to 'pageurl'
        if (pageurl != window.location) {
            window.history.pushState({ path: pageurl }, '', pageurl);
        }
        //window.scrollTo(0, 0);

        return false;
    });

    /* the below code is to override back button to get the ajax content without reload*/
    $(window).bind('popstate', function () {
        $.ajax({
            url: location.pathname,
            data: { isajax: true },
            success: function success(data) {
                $('.ajaxresponse').html($(data).filter('.ajaxresponse').html());
                $('.ajaxfilterresponse').html($(data).find('.ajaxfilterresponse').html());
                $('.ajaxbrandresponse').html($(data).find('.ajaxbrandresponse').html());
            }
        });
    });

    /*************************************************************************************************************/
    /* END FILTER
    /*************************************************************************************************************/

    if ($('input[name="ShippingMethod"]').length) {
        $('input[name="ShippingMethod"]').trigger('change');
    }

    $("body").on("click", '.ajaxproductlink', function (e) {
        e.preventDefault();

        var obj = $(this);
        obj.parent().parent().find('.ajaxproductlink').removeClass('active');
        obj.addClass('active');

        var zoneId = obj.attr('data-zoneid');
        var urladd = siteRoot + "/Product/Services/ProductService.aspx";
        var data = { 'method': 'SearchProducts', 'position': obj.attr('data-id'), 'template': 'ProductsSpecical.xslt' };
        if (zoneId != null) data = { 'method': 'SearchProducts', 'position': obj.attr('data-id'), 'template': 'ProductsSpecical.xslt', 'zoneid': zoneId };

        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success) {
                    obj.parent().parent().parent().find('.ajaxproductresponse').html($(response.data).find('.ajaxproductresponse').html());
                    //CarouselInit.InitProductsHomePage();
                }
            },
            complete: function complete() {}
        });

        return false;
    });

    $("body").on("click", '.ajaxbrandviewmore', function (e) {
        e.preventDefault();

        var obj = $(this);
        var pageNumber = parseInt(obj.attr('data-next'));
        var totalPages = parseInt(obj.attr('data-totalpages'));
        var urladd = siteRoot + "/Product/Services/ProductService.aspx";
        var data = { 'method': 'SearchProducts', 'manufacturerid': $(this).attr('data-manufacturerid'), 'zoneid': $(this).attr('data-zoneid'), 'pagenumber': pageNumber, 'template': 'ManufacturerDetailViewMore.xslt' };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success) {
                    $(response.data).appendTo(obj.parent().find('.brand-product'));
                    obj.attr('data-next', pageNumber + 1);

                    if (pageNumber >= totalPages) obj.remove();
                }
            },
            complete: function complete() {}
        });

        return false;
    });

    $("body").on("click", '.ajaxsearchviewmore', function (e) {
        e.preventDefault();

        var obj = $(this);
        var pageNumber = parseInt(obj.attr('data-next'));
        var totalPages = parseInt(obj.attr('data-totalpages'));
        var urladd = siteRoot + "/Product/Services/ProductService.aspx";
        var data = { 'method': 'SearchByKeyword', 'keyword': $(this).attr('data-keyword'), 'zoneid': $(this).attr('data-zoneid'), 'pagenumber': pageNumber };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success) {
                    $(response.data).appendTo(obj.parent().find('.itemlist'));
                    obj.attr('data-next', pageNumber + 1);

                    if (pageNumber >= totalPages) obj.remove();
                }
            },
            complete: function complete() {}
        });

        return false;
    });

    $("body").on("change", ".product-cart-option select", function (e) {
        e.preventDefault();
        $.each($(".color-cart .color.active"), function (i, u) {
            $(u).find('input[type=hidden]').val($(u).data('id'));
        });
        AjaxCart.updatecart();
        return false;
    });

    $("body").on("click", ".product-cart-option a.color", function (e) {
        e.preventDefault();
        $(this).parent().find('input[type=hidden]').val($(this).data('id'));
        AjaxCart.updatecart();
        return false;
    });

    if ($('.product-shipping #ddlProvince').length) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Product/Services/GeoZoneService.asmx/LoadProvince",
            data: "{'languageId': '" + $("#hdnLanguageId").val() + "'}",
            dataType: "json",
            success: function success(result) {
                var obj = $(".product-shipping #ddlProvince");
                $(obj).empty();
                $(obj).append($("<option></option>").val("").html($("#hdfSelectProvince").val()));
                $.each(result.d, function (key, value) {
                    $(obj).append($("<option></option>").val(value.Key).html(value.Name));
                });
            },
            error: function error(result) {}
        });

        if ($('.product-shipping #ddlProvince').length) {
            $('.product-shipping #ddlProvince').change(function () {
                $(".radio-button label strong").html('');

                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "/Product/Services/GeoZoneService.asmx/LoadDistrict",
                    data: "{'languageId': '" + $("#hdnLanguageId").val() + "', 'provinceGuid': '" + $('.product-shipping #ddlProvince').val() + "'}",
                    dataType: "json",
                    success: function success(result) {
                        var obj = $(".product-shipping #ddlDistrict");
                        $(obj).empty();
                        $(obj).append($("<option></option>").val("").html($("#hdfSelectDistrict").val()));
                        var ishave = false;
                        $.each(result.d, function (key, value) {
                            $(obj).append($("<option></option>").val(value.Key).html(value.Name));
                            ishave = true;
                        });

                        if (ishave) {

                            $(".shipping-group").hide();
                            $.each($(".shipping-group input[type=radio]"), function (i, e) {
                                var urladd2 = "/Product/Services/CheckoutService.aspx";
                                var radio = $(e);
                                var data2 = { 'method': 'GetShippingFee', 'shippingMethodId': $(e).data("shippingid"), 'provinceGuid': $(".product-shipping #ddlProvince").val(), 'districtGuid': $(".product-shipping #ddlDistrict").val(), 'qty': $(".input-number input").val() };
                                $.ajax({
                                    cache: false,
                                    url: urladd2,
                                    data: data2,
                                    type: 'post',
                                    success: function success(response) {
                                        if (response.success == true) {
                                            $(radio).parent().find("strong").html(response.shippingtotalsectionhtml);

                                            if ($(radio).data("shippingid") == response.fastId) {
                                                if (response.showFastShipping == false) {
                                                    $(radio).closest(".shipping-group").hide();
                                                } else {
                                                    $(radio).closest(".shipping-group").find(".shipping-des").html(response.fastMsg);
                                                    $(radio).closest(".shipping-group").show();
                                                }
                                            } else {
                                                $(radio).closest(".shipping-group").find(".shipping-des").html(response.standardMsg);
                                                $(radio).closest(".shipping-group").show();
                                            }
                                        }
                                    }
                                });
                            });
                        }
                    },
                    error: function error(result) {}
                });
            });

            $('.product-shipping #ddlDistrict').change(function () {
                $(".radio-button label strong").html('');
                var urladd2 = "/Product/Services/CheckoutService.aspx";
                var radio = $(".radio-button input[type=radio]:checked");
                var data2 = { 'method': 'GetShippingFee', 'shippingMethodId': radio.data("shippingid"), 'provinceGuid': $(".product-shipping #ddlProvince").val(), 'districtGuid': $(".product-shipping #ddlDistrict").val(), 'qty': $(".input-number input").val() };
                $.ajax({
                    cache: false,
                    url: urladd2,
                    data: data2,
                    type: 'post',
                    success: function success(response) {
                        if (response.success == true) {
                            $(radio).parent().find("strong").html(response.shippingtotalsectionhtml);
                            $(radio).closest(".shipping-group").find(".shipping-des").html(response.shippingTime);
                        }
                    }
                });
            });
        }
    }
});

/*************************************************************************************************************/
/* BEGIN CART
/*************************************************************************************************************/

var AjaxCart = {
    loadWaiting: false,
    usepopupnotifications: false,
    effecttocart: false,
    topcartselector: '.cart .amount',
    topwishlistselector: '',
    flyoutcartselector: '.cart-panel',

    init: function init(usepopupnotifications, topcartselector, topwishlistselector, flyoutcartselector) {
        this.loadWaiting = false;
        this.usepopupnotifications = usepopupnotifications;
        this.topcartselector = topcartselector;
        this.topwishlistselector = topwishlistselector;
        this.flyoutcartselector = flyoutcartselector;
    },

    setLoadWaiting: function setLoadWaiting(display) {
        displayAjaxLoading(display);
        this.loadWaiting = display;
    },

    //add a product to the cart/wishlist from the catalog pages
    addproducttocart_catalog: function addproducttocart_catalog(button) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        if (this.effecttocart == true && this.topcartselector) {
            var img = $(button).parent().parent().find('.product-img img');
            flyToCart($(img), this.topcartselector);
        }

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'AddProductToCart_Catalog', 'productid': $(button).attr('data-productid') };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: this.success_desktop,
            // complete: this.resetLoadWaiting,
            complete: function complete() {
                AjaxCart.setLoadWaiting(false);
                $('.cart-toggle').trigger('click');
            },
            error: this.ajaxFailure
        });
    },

    selectproductoption: function selectproductoption(button) {

        //        var productImage = $(button).attr('data-image');
        //        if (productImage != null)
        //            $('.product-slide .slick-active a img').attr('src', productImage);

        if ($(button).hasClass('product-option-color')) {
            $('.product-option-input').val('');
            $('.product-option').removeClass('active').removeClass('disable');
            $(button).parent().find('.product-option-input').val($(button).attr('data-id'));
            $(button).addClass('active');

            return;
        }

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = $('#aspnetForm').serializeArray();
        data.push({ name: 'method', value: 'SelectProductOption' });
        data.push({ name: 'productid', value: $('.btn-buy').attr('data-productid') });
        data.push({ name: 'optionid', value: $(button).attr('data-id') });
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success == true) {
                    $('.product-option-input').val('');
                    //$(button).parent().find('.product-option').removeClass('active').removeClass('disable');                   
                    $('.product-option-input').val($(button).attr('data-id'));
                    $(button).addClass('active');
                    var objcolor = $(".color-slide .slick-current.slick-active .color");
                    objcolor.closest(".product-color").find(".col-name").html(objcolor.attr("title"));
                    //                    if(response.optionIds)
                    //                    {
                    //                        $(".product-options").each(function(index) {
                    //                            var option = $(this).find('.product-option');
                    //                            if(!option.hasClass('active'))
                    //                            {
                    //                                var optionId = option.attr('data-id');
                    //                                console.log(optionId);
                    //                                console.log($.inArray(optionId, response.optionIds));
                    //                                if($.inArray(optionId, response.optionIds) == -1)
                    //                                    option.addClass('disable');
                    //                            }
                    //                        });
                    //                    }
                } else if (response.message) {
                    alertify.error(response.message);
                }
            },
            error: this.ajaxFailure
        });
    },

    //add a product to the cart/wishlist from the product details page (desktop version)
    addproducttocart_details: function addproducttocart_details(button) {

        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var action = $(button).data("action");

        var checkoutaction = $(button).data("url");

        if (this.effecttocart == true && this.topcartselector && action.length == 0) {
            var img = $(button).parent().parent().parent().find('.product-slide-wrap').find('.product-img img');
            flyToCart($(img), this.topcartselector);
        }
        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = $('#aspnetForm').serializeArray();
        data.push({ name: 'method', value: 'AddProductToCart_Details' });
        data.push({ name: 'productid', value: $(button).attr('data-productid') });
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            //success: this.success_desktop,
            success: function success(response) {
                if (response.success == true) {

                    if (checkoutaction != 'undefined' && checkoutaction.length > 0) {
                        setLocation(checkoutaction);
                        return true;
                    }

                    if (action.length > 0) {
                        if (action == 'addcart') {
                            AjaxCart.usepopupnotifications = true;
                            AjaxCart.success_desktop(response);
                        }
                    } else {
                        if (response.updatetopcartsectionhtml) {
                            $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
                        }
                        if (response.updatetopwishlistsectionhtml) {
                            $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
                        }
                        if (response.updateflyoutcartsectionhtml) {
                            var checkoutUrl = $('.checkout-url').data('checkouturl');
                            $(AjaxCart.flyoutcartselector).replaceWith($(response.updateflyoutcartsectionhtml).filter(AjaxCart.flyoutcartselector));
                            if (checkoutUrl != null) $(AjaxCart.flyoutcartselector).find('.btn-checkout').attr('href', checkoutUrl);
                        }
                        //success
                        if (AjaxCart.usepopupnotifications == true) {
                            displayPopupNotification(response.message, 'success', true);
                        } else {
                            //specify timeout for success messages
                            displayBarNotification(response.message, 'success', 3500);
                        }
                    }
                    $('.cart-toggle').trigger('click');
                } else {
                    alertify.error(response.message);
                    //                        //error
                    //                        if (AjaxCart.usepopupnotifications == true) {
                    //                            displayPopupNotification(response.message, 'error', true);
                    //                        }
                    //                        else {
                    //                            //no timeout for errors
                    //                            displayBarNotification(response.message, 'error', 0);
                    //                        }
                }
            },
            complete: this.resetLoadWaiting,
            // complete: function() { AjaxCart.setLoadWaiting(false); },
            error: this.ajaxFailure
        });
    },

    //add a product to the cart/wishlist from the catalog pages
    addproducttowishlist: function addproducttowishlist(button) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        if (this.effecttocart == true && this.topcartselector) {
            var img = $(button).parent().parent().find('.product-img img');
            flyToCart($(img), this.topcartselector);
        }

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'AddProductToWishlist', 'productid': $(button).attr('data-productid'), 'inwishlist': $(button).attr('data-inwishlist') };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(data) {
                AjaxCart.setLoadWaiting(false);
                //lazyloadAjax();
                if (!data.success) {
                    var loginUrl = data.loginlink;
                    $("<div>" + data.message + "</div>").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Đăng nhập": function ngNhP() {
                                location.href = loginUrl;
                            },
                            Cancel: function Cancel() {
                                $(this).dialog("close");
                            }
                        }
                    }).closest('.ui-dialog').addClass("ui-dialog-wishlist");;
                } else {
                    if (data.isremove) {
                        $(button).attr('data-inwishlist', null);
                        $(button).children('img').attr('src', '/Data/Sites/1/media/icon/wishlist.png');
                    } else {
                        $(button).attr('data-inwishlist', 'true');
                        $(button).children('img').attr('src', '/Data/Sites/1/media/icon/inwishlist.png');
                    }
                }
            },
            error: this.ajaxFailure
        });
    },

    //update cart
    updatecart: function updatecart() {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = $('#aspnetForm').serializeArray();
        data.push({ name: 'method', value: 'UpdateCart' });
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: this.success_desktop,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },
    //    //update cart
    //    updatecartattributes: function() {
    //        if (this.loadWaiting != false) {
    //            return;
    //        }
    //        this.setLoadWaiting(true);
    //       
    //        var urladd = siteRoot + "/Product/Services/CartService.aspx";
    //        var data = $('#aspnetForm').serializeArray();
    //        data.push({ name: 'method', value: 'UpdateCartAttributes' });
    //        $.ajax({
    //            cache: false,
    //            url: urladd,
    //            data: data,
    //            type: 'post',
    //            success: this.success_desktop,
    //            complete: this.resetLoadWaiting,
    //            error: this.ajaxFailure
    //        });
    //    },  

    //remove from cart
    removefromcart: function removefromcart(button) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'RemoveFromCart', 'itemguid': $(button).data('itemguid') };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            //success: this.success_desktop,
            success: function success(response) {
                if (response.updatetopcartsectionhtml) {
                    $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
                }
                if (response.updatetopwishlistsectionhtml) {
                    $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
                }
                if (response.updateflyoutcartsectionhtml) {
                    var checkoutUrl = $('.checkout-url').data('checkouturl');
                    $(AjaxCart.flyoutcartselector).replaceWith($(response.updateflyoutcartsectionhtml).filter(AjaxCart.flyoutcartselector));
                    if (checkoutUrl != null) $(AjaxCart.flyoutcartselector).find('.btn-checkout').attr('href', checkoutUrl);
                }
                if (response.existItem) {
                    $('.cart-toggle').trigger('click');
                }
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //remove from cart
    removefromwishlist: function removefromwishlist(button) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'RemoveFromWishlist', 'itemguid': $(button).data('itemguid') };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success() {
                location.reload();
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //cart to wishlist
    carttowishlist: function carttowishlist(button) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'CartToWishlist', 'itemguid': $(button).data('itemguid') };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success() {
                location.reload();
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    // wishlist to cart
    wishlisttocart: function wishlisttocart(button) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'WishlistToCart', 'itemguid': $(button).data('itemguid') };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success() {
                location.reload();
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //apply coupon
    applycoupon: function applycoupon() {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'ApplyCoupon', 'couponcode': $('#couponCode').val() };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success == false) $('.coupon-apply-error').text(response.message);else location.reload();
                //setLocation(response.redirect);
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //remove coupon
    removecoupon: function removecoupon() {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CartService.aspx";
        var data = { 'method': 'RemoveCoupon' };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                location.reload();
                //setLocation(response.redirect);
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    success_desktop: function success_desktop(response) {
        $(AjaxCart.flyoutcartselector).addClass("show");
        if (response.updatetopcartsectionhtml) {
            $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
        }
        if (response.updatetopwishlistsectionhtml) {
            $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
        }
        if (response.updateflyoutcartsectionhtml) {
            // var checkoutUrl = $('.checkout-url').data('checkouturl');
            //$(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
            $(AjaxCart.flyoutcartselector).replaceWith($(response.updateflyoutcartsectionhtml).filter(AjaxCart.flyoutcartselector));
            //            if (checkoutUrl != null)
            //                $(AjaxCart.flyoutcartselector).find('.btn-checkout').attr('href', checkoutUrl);
        }

        if (response.message) {
            //display notification
            if (response.success == true) {
                //success

                if (AjaxCart.usepopupnotifications == true) {
                    //displayPopupNotification(response.message, 'success', true);
                    var productAddedToCart = "<div class='productAddedToCartWindow'>" + $(response.updateflyoutcartsectionhtml).filter('.productAddedToCartWindow').html() + "</div>";

                    //                    if(response.productid != null)
                    //                    {
                    //                        var ids = new Array(response.productid);
                    //                        nfbq('track', 'AddToCart', {
                    //                      ncontent_type: 'product',
                    //                        content_ids: ids,
                    //                        value: response.price,
                    //                      currency: 'VND'
                    //                      });
                    //                    }

                    displayPopupNotification(productAddedToCart, 'success', true);
                } else {
                    //specify timeout for success messages
                    displayBarNotification(response.message, 'success', 0);
                }
                //                if (AjaxCart.usepopupnotifications == true) {
                //                    displayPopupNotification(response.message, 'success', true);
                //                } else {
                //                    //specify timeout for success messages
                //                    displayBarNotification(response.message, 'success', 3500);
                //                }
            } else {
                //error
                if (AjaxCart.usepopupnotifications == true) {
                    displayPopupNotification(response.message, 'error', true);
                } else {
                    //no timeout for errors
                    displayBarNotification(response.message, 'error', 0);
                }
            }
            return false;
        }
        if (response.redirect) {
            setLocation(response.redirect);
            return true;
        }
        return false;
    },

    resetLoadWaiting: function resetLoadWaiting() {
        AjaxCart.setLoadWaiting(false);
    },

    ajaxFailure: function ajaxFailure() {
        alertify.error('Failed to add the product to the cart. Please refresh the page and try one more time.');
    }
};

function OpenWindow(n, t, i, r) {
    var u = (screen.width - t) / 2,
        f = (screen.height - i) / 2,
        e;
    winprops = "resizable=0, height=" + i + ",width=" + t + ",top=" + f + ",left=" + u + "w";
    r && (winprops += ",scrollbars=1");
    e = window.open(n, "_blank", winprops);
}

function setLocation(n) {
    window.location.href = n;
}

function displayAjaxLoading(n) {
    n ? $(".ajax-loading-block-window").show() : $(".ajax-loading-block-window").hide("slow");
}

function displayPopupNotification(n, t, i) {
    var f, r, u, e;
    if (f = t == "success" ? $("#dialog-notifications-success") : t == "error" ? $("#dialog-notifications-error") : $("#dialog-notifications-success"), r = "", typeof n == "string") r = "<p>" + n + "<\/p>";else for (u = 0; u < n.length; u++) {
        r = r + "<p>" + n[u] + "<\/p>";
    }f.html(r);
    e = i ? !0 : !1;
    f.dialog({
        modal: e
    });
}

function closePopupNotification() {
    $(".ui-dialog-titlebar-close").trigger("click");
    return false;
}

function displayBarNotification(n, t, i) {
    var u, r, f;
    if (clearTimeout(barNotificationTimeout), u = "success", t == "success" ? u = "success" : t == "error" && (u = "error"), $("#bar-notification").removeClass("success").removeClass("error"), $("#bar-notification .content").remove(), r = "", typeof n == "string") r = '<p class="content">' + n + "<\/p>";else for (f = 0; f < n.length; f++) {
        r = r + '<p class="content">' + n[f] + "<\/p>";
    }$("#bar-notification").append(r).addClass(u).fadeIn("slow").mouseenter(function () {
        clearTimeout(barNotificationTimeout);
    });
    $("#bar-notification .close").unbind("click").click(function () {
        $("#bar-notification").fadeOut("slow");
    });
    i > 0 && (barNotificationTimeout = setTimeout(function () {
        $("#bar-notification").fadeOut("slow");
    }, i));
}

// fly to basket  
function flyToCart(flyer, flyingTo, callBack) {
    try {
        var $jqfunc = $(this);
        var divider = 3;
        var flyerClone = $(flyer).clone();
        $(flyerClone).css({
            position: 'absolute',
            top: $(flyer).offset().top + "px",
            left: $(flyer).offset().left + "px",
            opacity: 1,
            'z-index': 1000
        });
        $('body').append($(flyerClone));
        if ($(flyingTo)) {
            var gotoX = $(flyingTo).offset().left + $(flyingTo).width() / 2 - $(flyer).width() / divider / 2;
            var gotoY = $(flyingTo).offset().top + $(flyingTo).height() / 2 - $(flyer).height() / divider / 2;
            $(flyerClone).animate({
                opacity: 0.7,
                left: gotoX,
                top: gotoY,
                width: 135,
                height: 135
            }, 1000, function () {
                $(flyingTo).fadeOut('slowly', function () {
                    $(flyingTo).fadeIn('slowly', function () {
                        $(flyerClone).fadeOut('slowly', function () {
                            $(flyerClone).remove();
                            if (callBack != null) {
                                callBack.apply($jqfunc);
                            }
                        });
                    });
                });
            });
        }
    } catch (exception) {}
}

function htmlEncode(n) {
    return $("<div/>").text(n).html();
}

function htmlDecode(n) {
    return $("<div/>").html(n).text();
}
var barNotificationTimeout, AjaxCart;

/*************************************************************************************************************/
/* END CART
/*************************************************************************************************************/

/*************************************************************************************************************/
/* BEGIN CHECKOUT
/*************************************************************************************************************/
/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
}(function (a) {
    a.extend(a.fn, {
        validate: function validate(b) {
            if (!this.length) return void (b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function (b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0);
            }), this.on("submit.validate", function (b) {
                function d() {
                    var d, e;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0;
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1);
            })), c);
        },
        valid: function valid() {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function () {
                b = c.element(this) && b, d = d.concat(c.errorList);
            }), c.errorList = d), b;
        },
        rules: function rules(b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j = this[0];
            if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                case "add":
                    a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                    break;
                case "remove":
                    return c ? (i = {}, a.each(c.split(/\s/), function (b, c) {
                        i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required");
                    }), i) : (delete e[j.name], f);
            }
            return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g;
        }
    }), a.extend(a.expr[":"], {
        blank: function blank(b) {
            return !a.trim("" + a(b).val());
        },
        filled: function filled(b) {
            return !!a.trim("" + a(b).val());
        },
        unchecked: function unchecked(b) {
            return !a(b).prop("checked");
        }
    }), a.validator = function (b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init();
    }, a.validator.format = function (b, c) {
        return 1 === arguments.length ? function () {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c);
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
                return c;
            });
        }), b);
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function onfocusin(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)));
            },
            onfocusout: function onfocusout(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a);
            },
            onkeyup: function onkeyup(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b === this.lastElement) && this.element(b);
            },
            onclick: function onclick(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode);
            },
            highlight: function highlight(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d);
            },
            unhighlight: function unhighlight(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d);
            }
        },
        setDefaults: function setDefaults(b) {
            a.extend(a.validator.defaults, b);
        },
        messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date ( ISO ).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}.") },
        autoCreateRanges: !1,
        prototype: {
            init: function init() {
                function b(b) {
                    var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b);
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c,
                    d = this.groups = {};
                a.each(this.settings.groups, function (b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
                        d[c] = b;
                    });
                }), c = this.settings.rules, a.each(c, function (b, d) {
                    c[b] = a.validator.normalizeRule(d);
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },
            form: function form() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
            },
            checkForm: function checkForm() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) {
                    this.check(b[a]);
                }return this.valid();
            },
            element: function element(b) {
                var c = this.clean(b),
                    d = this.validationTargetFor(c),
                    e = !0;
                return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e;
            },
            showErrors: function showErrors(b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];
                    for (var c in b) {
                        this.errorList.push({ message: b[c], element: this.findByName(c)[0] });
                    }this.successList = a.grep(this.successList, function (a) {
                        return !(a.name in b);
                    });
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
            },
            resetForm: function resetForm() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors();
                var b,
                    c = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight) for (b = 0; c[b]; b++) {
                    this.settings.unhighlight.call(this, c[b], this.settings.errorClass, "");
                } else c.removeClass(this.settings.errorClass);
            },
            numberOfInvalids: function numberOfInvalids() {
                return this.objectLength(this.invalid);
            },
            objectLength: function objectLength(a) {
                var b,
                    c = 0;
                for (b in a) {
                    c++;
                }return c;
            },
            hideErrors: function hideErrors() {
                this.hideThese(this.toHide);
            },
            hideThese: function hideThese(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide();
            },
            valid: function valid() {
                return 0 === this.size();
            },
            size: function size() {
                return this.errorList.length;
            },
            focusInvalid: function focusInvalid() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                } catch (b) {}
            },
            findLastActive: function findLastActive() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function (a) {
                    return a.element.name === b.name;
                }).length && b;
            },
            elements: function elements() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0);
                });
            },
            clean: function clean(b) {
                return a(b)[0];
            },
            errors: function errors() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext);
            },
            reset: function reset() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([]);
            },
            prepareForm: function prepareForm() {
                this.reset(), this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function prepareElement(a) {
                this.reset(), this.toHide = this.errorsFor(a);
            },
            elementValue: function elementValue(b) {
                var c,
                    d = a(b),
                    e = b.type;
                return "radio" === e || "checkbox" === e ? this.findByName(b.name).filter(":checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c);
            },
            check: function check(b) {
                b = this.validationTargetFor(this.clean(b));
                var c,
                    d,
                    e,
                    f = a(b).rules(),
                    g = a.map(f, function (a, b) {
                    return b;
                }).length,
                    h = !1,
                    i = this.elementValue(b);
                for (d in f) {
                    e = { method: d, parameters: f[d] };
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue;
                        }
                        if (h = !1, "pending" === c) return void (this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1;
                    } catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j;
                    }
                }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0;
            },
            customDataMessage: function customDataMessage(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg");
            },
            customMessage: function customMessage(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b]);
            },
            findDefined: function findDefined() {
                for (var a = 0; a < arguments.length; a++) {
                    if (void 0 !== arguments[a]) return arguments[a];
                }return void 0;
            },
            defaultMessage: function defaultMessage(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>");
            },
            formatAndAdd: function formatAndAdd(b, c) {
                var d = this.defaultMessage(b, c.method),
                    e = /\$?\{(\d+)\}/g;
                "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({ message: d, element: b, method: c.method }), this.errorMap[b.name] = d, this.submitted[b.name] = d;
            },
            addWrapper: function addWrapper(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a;
            },
            defaultShowErrors: function defaultShowErrors() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) {
                    c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                }if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) {
                    this.showLabel(this.successList[a]);
                }if (this.settings.unhighlight) for (a = 0, b = this.validElements(); b[a]; a++) {
                    this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                }this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
            },
            validElements: function validElements() {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function invalidElements() {
                return a(this.errorList).map(function () {
                    return this.element;
                });
            },
            showLabel: function showLabel(b, c) {
                var d,
                    e,
                    f,
                    g = this.errorsFor(b),
                    h = this.idOrName(b),
                    i = a(b).attr("aria-describedby");
                g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"), i ? i.match(new RegExp("\\b" + f + "\\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), e = this.groups[b.name], e && a.each(this.groups, function (b, c) {
                    c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"));
                }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), this.toShow = this.toShow.add(g);
            },
            errorsFor: function errorsFor(b) {
                var c = this.idOrName(b),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e);
            },
            idOrName: function idOrName(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name);
            },
            validationTargetFor: function validationTargetFor(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0];
            },
            checkable: function checkable(a) {
                return (/radio|checkbox/i.test(a.type)
                );
            },
            findByName: function findByName(b) {
                return a(this.currentForm).find("[name='" + b + "']");
            },
            getLength: function getLength(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length;
                }
                return b.length;
            },
            depend: function depend(a, b) {
                return this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)] ? this.dependTypes[typeof a === "undefined" ? "undefined" : _typeof(a)](a, b) : !0;
            },
            dependTypes: {
                "boolean": function boolean(a) {
                    return a;
                },
                string: function string(b, c) {
                    return !!a(b, c.form).length;
                },
                "function": function _function(a, b) {
                    return a(b);
                }
            },
            optional: function optional(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch";
            },
            startRequest: function startRequest(a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0);
            },
            stopRequest: function stopRequest(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
            },
            previousValue: function previousValue(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, "remote") });
            },
            destroy: function destroy() {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator");
            }
        },
        classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } },
        addClassRules: function addClassRules(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b);
        },
        classRules: function classRules(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function () {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]);
            }), c;
        },
        normalizeAttributeRule: function normalizeAttributeRule(a, b, c, d) {
            /min|max/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0);
        },
        attributeRules: function attributeRules(b) {
            var c,
                d,
                e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) {
                "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            }return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e;
        },
        dataRules: function dataRules(b) {
            var c,
                d,
                e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) {
                d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            }return e;
        },
        staticRules: function staticRules(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c;
        },
        normalizeRules: function normalizeRules(b, c) {
            return a.each(b, function (d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (_typeof(e.depends)) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c);
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d];
                }
            }), a.each(b, function (d, e) {
                b[d] = a.isFunction(e) ? e(c) : e;
            }), a.each(["minlength", "maxlength"], function () {
                b[this] && (b[this] = Number(b[this]));
            }), a.each(["rangelength", "range"], function () {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]));
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b;
        },
        normalizeRule: function normalizeRule(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function () {
                    c[this] = !0;
                }), b = c;
            }
            return b;
        },
        addMethod: function addMethod(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b));
        },
        methods: {
            required: function required(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0;
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0;
            },
            email: function email(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a);
            },
            url: function url(a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a);
            },
            date: function date(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString());
            },
            dateISO: function dateISO(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a);
            },
            number: function number(a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a);
            },
            digits: function digits(a, b) {
                return this.optional(b) || /^\d+$/.test(a);
            },
            creditcard: function creditcard(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c,
                    d,
                    e = 0,
                    f = 0,
                    g = !1;
                if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;
                for (c = a.length - 1; c >= 0; c--) {
                    d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                }return e % 10 === 0;
            },
            minlength: function minlength(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d;
            },
            maxlength: function maxlength(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || d >= e;
            },
            rangelength: function rangelength(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1];
            },
            min: function min(a, b, c) {
                return this.optional(b) || a >= c;
            },
            max: function max(a, b, c) {
                return this.optional(b) || c >= a;
            },
            range: function range(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1];
            },
            equalTo: function equalTo(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                    a(c).valid();
                }), b === e.val();
            },
            remote: function remote(b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";
                var e,
                    f,
                    g = this.previousValue(c);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && { url: d } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: f,
                    context: e.currentForm,
                    success: function success(d) {
                        var f,
                            h,
                            i,
                            j = d === !0 || "true" === d;
                        e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j);
                    }
                }, d)), "pending");
            }
        }
    });
    var b,
        c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d);
    }) : (b = a.ajax, a.ajax = function (d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments);
    });
});

var AjaxCheckout = {
    loadWaiting: false,
    usepopupnotifications: false,
    shippingtotalselector: '.shipping-total',
    vattotalselector: '.vat-total',
    totalselector: '.order-total',

    init: function init(usepopupnotifications) {
        this.loadWaiting = false;
        this.usepopupnotifications = usepopupnotifications;
    },

    setLoadWaiting: function setLoadWaiting(display) {
        displayAjaxLoading(display);
        this.loadWaiting = display;
    },

    getdistrictsbyprovinceguid: function getdistrictsbyprovinceguid(select, districtElementName) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        var urladd = siteRoot + "/Product/Services/CheckoutService.aspx";
        var data = { 'method': 'GetDistrictsByProvinceGuid', 'provinceGuid': $(select).val() };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(result) {
                var district = $("select[name='" + districtElementName + "']");
                $(district).empty();
                $.each(result, function (index, value) {
                    $(district).append($("<option></option>").val(value.guid).html(value.name));
                });
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    getshippingtotal: function getshippingtotal(radio) {
        if ($(radio).is(':checked')) {
            var urladd = siteRoot + "/Product/Services/CheckoutService.aspx";
            var data = { 'method': 'GetShippingTotal', 'shippingMethodId': $(radio).val() };
            $.ajax({
                cache: false,
                url: urladd,
                data: data,
                type: 'post',
                success: function success(response) {
                    if (response.success == true) {
                        if (AjaxCheckout.shippingtotalselector) $(AjaxCheckout.shippingtotalselector).html(response.shippingtotalsectionhtml);
                        if (AjaxCheckout.totalselector) $(AjaxCheckout.totalselector).html(response.totalsectionhtml);
                    }
                }
            });
        }
    },
    getPaymentMethod: function getPaymentMethod(radio) {
        if ($(radio).is(':checked')) {
            var id = $(radio).val();
            $(".payment-method .boxContent").hide();
            if (id == 2) {
                $(radio).parent().find(".boxContent").show();
            }
        }
    },
    getshippingfee: function getshippingfee(radio) {
        if ($(radio).is(':checked')) {
            $(".product-shipping .radio-button label strong").html('');
            var urladd = siteRoot + "/Product/Services/CheckoutService.aspx";
            var data = { 'method': 'GetShippingFee', 'shippingMethodId': $(radio).data("shippingid"), 'provinceGuid': $(".product-shipping #ddlProvince").val(), 'districtGuid': $(".product-shipping #ddlDistrict").val(), 'qty': $(".input-number input").val() };
            $.ajax({
                cache: false,
                url: urladd,
                data: data,
                type: 'post',
                success: function success(response) {
                    if (response.success == true) {
                        $(radio).parent().find("strong").html(response.shippingtotalsectionhtml);
                        $(radio).closest(".shipping-group").find(".shipping-des").html(response.shippingTime);
                    }
                }
            });
        }
    },

    getvattotal: function getvattotal(radio) {
        var urladd = siteRoot + "/Product/Services/CheckoutService.aspx";
        var data = { 'method': 'GetVATTotal', 'Invoice_Required': $(radio).is(':checked') };
        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success == true) {
                    if (AjaxCheckout.vattotalselector) $(AjaxCheckout.vattotalselector).html(response.vattotalsectionhtml);
                    if (AjaxCheckout.totalselector) $(AjaxCheckout.totalselector).html(response.totalsectionhtml);
                }
            }
        });
    },

    saveorder: function saveorder(savetodb, redirect) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $("#aspnetForm").validate({
            onsubmit: false,
            rules: {
                Address_FirstName: "required",
                Address_LastName: "required",
                Address_Email: {
                    required: true,
                    email: true
                },
                Address_Address: "required",
                /*Address_Phone: "required",*/
                Address_Phone: {
                    required: true,
                    number: true
                },
                Address_Province: "required",
                Address_District: "required",
                ShippingMethod: "required",
                Invoice_CompanyTaxCode: { required: "#Invoice_Required:checked" },
                Invoice_CompanyName: { required: "#Invoice_Required:checked" },
                Invoice_CompanyAddress: { required: "#Invoice_Required:checked" }
            },
            messages: {
                Address_FirstName: "Vui lòng nhập Tên",
                Address_LastName: "Vui lòng nhập Họ",
                Address_Email: {
                    required: "Vui lòng nhập Email",
                    email: "Email không hợp lệ"
                },
                Address_Address: "Vui lòng nhập Địa chỉ",
                /*Address_Phone: "Vui lòng nhập Điện thoại",*/
                Address_Phone: {
                    required: "Vui lòng nhập Điện thoại",
                    email: "Điện thoại không hợp lệ"
                },
                Address_Province: "Vui lòng nhập Tỉnh/Thành",
                Address_District: "Vui lòng nhập Quận/Huyện",
                ShippingMethod: "Vui lòng nhập Phương thức vận chuyển",
                Invoice_CompanyTaxCode: "Vui lòng nhập Mã số thuế",
                Invoice_CompanyName: "Vui lòng nhập Tên công ty",
                Invoice_CompanyAddress: "Vui lòng nhập Địa chỉ công ty"
            }
        });

        if (!$("#aspnetForm").valid()) {
            this.setLoadWaiting(false);
            return;
        }

        var urladd = siteRoot + "/Product/Services/CheckoutService.aspx";
        var data = $('#aspnetForm').serializeArray();
        data.push({ name: 'method', value: 'SaveOrder' });
        data.push({ name: 'savetodb', value: savetodb });
        data.push({ name: 'redirect', value: redirect });

        //        $("input[type=text][required],select[required]").each(function(){
        //            data.push({ name: $(this).attr("name") + ".Required", value: true });
        //        });

        $.ajax({
            cache: false,
            url: urladd,
            data: data,
            type: 'post',
            success: function success(response) {
                if (response.success == true) {
                    if (response.redirect) {
                        setLocation(response.redirect);
                    }
                } else {
                    //error
                    if (response.error == 'PaymentAgree') {
                        var htmlerorrcheckout = '<span class="error">' + response.message + '</span>';
                        $(".payment-info").append(htmlerorrcheckout);
                    }
                    displayBarNotification(response.message, 'error', 0);
                }
            },
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    resetLoadWaiting: function resetLoadWaiting() {
        AjaxCheckout.setLoadWaiting(false);
    },

    ajaxFailure: function ajaxFailure() {
        alertify.error('Failed to process checkout. Please refresh the page and try one more time.');
    }

    /*************************************************************************************************************/
    /* END CHECKOUT
    /*************************************************************************************************************/

};
//# sourceMappingURL=ecommerce.js.map
