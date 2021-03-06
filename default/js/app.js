"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CANHCAM_APP = { "ACTIVE_FIXED_HEADER": true, "HEADER_TRANPARENT": false, "ACTIVE_HEADER_POSITION": 1, "ACTIVE_PADDING_MAIN": true, "ACTIVE_VALIDATOR": true, "ACTIVE_SELECT": true, "ACTIVE_FIXED_FOOTER": true, "ACTIVE_LIST_TO_SELECT": true, "DISPLAY_FOOTER": 600, "ACTIVE_RESPONSIVE": true, "ACTIVE_BACKTOTOP": true, "DISPLAY_BACKTOTOP": 100, "CHANGE_GRID": 991, "CHANGE_GRID_SM": 767, "DEV_MODE": false, "DEV_MODE_GIRD_FULL": false };
function backToTop() {
	if ($('#back-to-top').length) {
		var backToTop = function backToTop() {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > CANHCAM_APP.DISPLAY_BACKTOTOP) {
				$('#back-to-top').addClass('show');
			} else {
				$('#back-to-top').removeClass('show');
			}
		};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_BACKTOTOP) {
		backToTop();
	}
});
function CanhCamResponsive() {
	// Set BG Mask
	$('[bg-mask]').each(function () {
		var bgimg = $(this).attr('bg-mask');
		$(this).css({
			"mask-image": "url(" + bgimg + ")",
			"mask-position": "center center",
			"mask-repeat": "no-repeat",
			"-webkit-mask-image": "url(" + bgimg + ")",
			"-webkit-mask-position": "center center",
			"-webkit-mask-repeat": "no-repeat"
		});
	});
	// Set BG Resposive
	$('[bg-img]').each(function () {
		var bgimg = $(this).attr('bg-img');
		var pos = $(this).attr('bg-pos');
		var size = $(this).attr('bg-size');
		if (pos && pos.length > 0) {
			$(this).css({
				"background-position": pos
			});
		} else {
			$(this).css({
				"background-position": "center center"
			});
		}
		if (size && size.length > 0) {
			$(this).css({
				"background-size": size
			});
		} else {
			$(this).css({
				"background-size": "cover"
			});
		}
		$(this).css({
			"background-image": "url(" + bgimg + ")"
		});
	});

	$('[bg-img-responsive]').each(function () {
		var bgimg = $(this).attr('bg-img-responsive');
		var bgimgsm = $(this).attr('bg-img-responsive-sm');
		var bgimgxs = $(this).attr('bg-img-responsive-xs');
		if ($(window).width() >= CANHCAM_APP.CHANGE_GRID) {
			$(this).css({
				"background-image": "url(" + bgimg + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		} else if ($(window).width() < CANHCAM_APP.CHANGE_GRID && $(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
			$(this).css({
				"background-image": "url(" + bgimgsm + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		} else {
			$(this).css({
				"background-image": "url(" + bgimgxs + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		}
	});

	$('[img-src-responsive]').each(function () {
		var bgimg2 = $(this).attr('img-src-responsive');
		var bgimg2sm = $(this).attr('img-src-responsive-sm');
		var bgimg2xs = $(this).attr('img-src-responsive-xs');
		if ($(window).width() >= CANHCAM_APP.CHANGE_GRID) {
			$(this).attr("src", "" + bgimg2 + "");
		} else if ($(window).width() < CANHCAM_APP.CHANGE_GRID && $(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
			$(this).attr("src", "" + bgimg2sm + "");
		} else {
			$(this).attr("src", "" + bgimg2xs + "");
		}
	});
};

$(function () {
	if (CANHCAM_APP.ACTIVE_RESPONSIVE) {
		CanhCamResponsive();
	}
});

$(window).resize(function () {
	if (CANHCAM_APP.ACTIVE_RESPONSIVE) {
		CanhCamResponsive();
	}
});

// $(function() {
//     $('[data-toggle="tooltip"]').tooltip()
//     $('[data-toggle="popover"]').popover({
//         trigger: 'focus'
//     })
// })
// // Thêm [dropdown-type="hover"] vào thẻ a để bật tính năng hover open dropdown 
// if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
// 	$('.dropdown').on('mouseenter mouseleave', function () {
// 		var ___d = $(this).find('[dropdown-type="hover"]').parents('.dropdown')
// 		if (___d && ___d.length > 0) {
// 			$(this).find('[dropdown-type="hover"]').removeAttr('data-toggle')
// 			setTimeout(function () {
// 				___d[___d.is(':hover') ? 'addClass' : 'removeClass']('show');
// 				___d.is(':hover') ? ___d.find('.dropdown-menu').show() : ___d.find('.dropdown-menu').hide()
// 			}, 10);
// 		}
// 	})
// } else {
// 	$('.dropdown').each(function () {
// 		$(this).addClass('show')
// 		$(this).find('.dropdown-menu').show()
// 	})
// }


$(document).ready(function () {
	checkDev();
});

$(window).resize(function () {
	checkDev();
});

function checkDev() {
	if ($('#devtools').length) {
		if ($(window).width() < 576) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - XS');
		} else if ($(window).width() >= 576 && $(window).width() < 768) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - SM');
		} else if ($(window).width() >= 768 && $(window).width() < 992) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - MD');
		} else if ($(window).width() >= 992 && $(window).width() < 1200) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - LG');
		} else {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - XL');
		}
	}
}

(function ($) {
	$.fn.drags = function (opt) {

		opt = $.extend({ handle: "", cursor: "move" }, opt);

		if (opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.find('.header-devtools').css('cursor', opt.cursor).on("mousedown", function (e) {
			// getSizeDevTo()
			if (opt.handle === "") {
				var $drag = $(this).parent().addClass('draggable');
			} else {
				var $drag = $(this).parent().addClass('active-handle').parent().addClass('draggable');
			}
			var z_idx = $drag.css('z-index'),
			    drg_h = $drag.outerHeight(),
			    drg_w = $drag.outerWidth(),
			    pos_y = $drag.offset().top + drg_h - e.pageY,
			    pos_x = $drag.offset().left + drg_w - e.pageX;
			$drag.css('z-index', 99999).parents().on("mousemove", function (e) {
				getSizeDevTo();
				$('.draggable').offset({
					top: e.pageY + pos_y - drg_h,
					left: e.pageX + pos_x - drg_w
				}).on("mouseup", function () {
					// getSizeDevTo()
					$(this).removeClass('draggable').css('z-index', z_idx);
				});
				$('#devtools .inline').offset({
					top: e.pageY + pos_y - drg_h
				});
				$('#devtools .online').offset({
					left: e.pageX + pos_x - drg_w
				});
			});
			e.preventDefault(); // disable selection
		}).on("mouseup", function () {
			// getSizeDevTo()
			if (opt.handle === "") {
				$(this).removeClass('draggable');
			} else {
				$(this).removeClass('active-handle').parent().removeClass('draggable');
			}
		});
	};
})(jQuery);

if (CANHCAM_APP.DEV_MODE) {

	$('body').append('<div id="devtools"> <div class="online"></div><div class="inline"></div><div class="header-devtools"> <h3>Dev - XL</h3> </div><div class="body-devtools"> <button class="btn btn-block btn-secondary btn-sm" type="button">Toogle Grid</button> </div></div>');

	$('#devtools').drags();
	createDevTo();

	$(document).ready(function () {
		if ($('.canhcam-develop #devtools').length) {
			var devtls = $('.canhcam-develop #devtools').find('.body-devtools button');
			devtls.click(function () {
				if ($(this).attr('data-click-state') == 1) {
					$(this).attr('data-click-state', 0);
					$('body').toggleClass('active');
					$('body').find('.devtool-gird').remove();
				} else {
					$(this).attr('data-click-state', 1);
					$('body').toggleClass('active');
					if (CANHCAM_APP.DEV_MODE_GIRD_FULL) {
						$('body').append('<div class="devtool-gird"><div class="container-fluid d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>');
					} else {
						$('body').append('<div class="devtool-gird"><div class="container d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>');
					}
				}
			});
		}
	});
}

function getSizeDevTo() {
	$('#devtools .body-devtools .size .width').html('W: ' + $(window).width() + '');
	$('#devtools .body-devtools .size .height').html('H: ' + $(window).height() + '');
	$('#devtools .body-devtools .size .top').html('T: ' + $('#devtools').offset().top + '');
	$('#devtools .body-devtools .size .left').html('L: ' + $('#devtools').offset().left + '');
}

$(window).resize(function () {
	if ($('#devtools').length) {
		getSizeDevTo();
	}
});

function createDevTo() {
	$('#devtools .body-devtools').append('<div class="size"><div class="width">W: ' + $(window).width() + '</div><div class="height">H: ' + $(window).height() + '</div><div class="top">T: ' + $('#devtools').offset().top + '</div><div class="left">L: ' + $('#devtools').offset().left + '</div></div>');
}

function countUpCanhCam() {

	$('[data-count]').each(function () {
		var elm = $(this).offset().top;
		var docH = $(window).height();
		var docS = $(window).scrollTop();
		var padingTop = 0;
		if ($(this).attr('data-top') && $(this).attr('data-top').length) {
			padingTop = parseInt($(this).attr('data-top'));
		}
		var result = elm + padingTop - (docH + docS);
		var run = false;

		if (result <= 0 && !run) {
			var $this = $(this),
			    countTo = $this.attr('data-count'),
			    durationTo = parseInt($this.attr('data-duration'));
			$({ countNum: $this.text() }).animate({
				countNum: countTo
			}, {
				duration: durationTo,
				easing: 'linear',
				step: function step() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function complete() {
					$this.text(this.countNum);
					run = true;
				}
			});
		}
	});
}

$(document).ready(function () {
	countUpCanhCam();
});

$(window).scroll(function () {
	countUpCanhCam();
});

$(window).resize(function () {
	countUpCanhCam();
});

function CanhCamChangeDataHoverClick() {
	$('[data-change]').each(function () {
		var newSrc = $(this).attr('data-new');
		var oldSrc = $(this).attr('data-old');
		var typeChange = $(this).attr('data-change');
		if (typeChange && typeChange.length > 0) {
			if (typeChange === 'src') {
				$(this).hover(function () {
					$(this).attr(typeChange, newSrc);
				}, function () {
					$(this).attr(typeChange, oldSrc);
				});
			} else if (typeChange === 'background' || typeChange === 'background-image') {
				$(this).hover(function () {
					$(this).css(typeChange, "url(" + newSrc + ")");
				}, function () {
					$(this).css(typeChange, "url(" + oldSrc + ")");
				});
			} else if (typeChange === 'class') {
				$(this).hover(function () {
					$(this).removeClass(oldSrc).addClass(newSrc);
				}, function () {
					$(this).removeClass(newSrc).addClass(oldSrc);
				});
			}
		}
	});
};

$(function () {
	CanhCamChangeDataHoverClick();
});

function setFooter() {
	var bodyHeight = $("body").outerHeight(),
	    headerHeight = $("header").outerHeight(),
	    footerHeight = $("footer").outerHeight(),
	    mainHeight = $("main").outerHeight(),
	    curentHeight = mainHeight + headerHeight + footerHeight,
	    curentfixedHeight = mainHeight + footerHeight,
	    newHeight = bodyHeight - (headerHeight + footerHeight),
	    newfixedHeight = bodyHeight - footerHeight;
	if ($(window).width() > CANHCAM_APP.DISPLAY_FOOTER) {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
			$("main").css('min-height', newfixedHeight + 'px');
		} else {
			if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
				$("main").css('min-height', newHeight + 'px');
			} else {
				$("main").css('min-height', newfixedHeight + 'px');
			}
		}
	} else {
		$("main").css('min-height', 'initial');
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_FIXED_FOOTER) {
		setFooter();
	}
});

$(window).resize(function () {
	if (CANHCAM_APP.ACTIVE_FIXED_FOOTER) {
		setFooter();
	}
});
// function setHeader(elm) {
//     if (elm >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
//         $("header").addClass('active');
//     } else {
//         $("header").removeClass('active');
//     }
// }

// $(document).ready(function() {
//     if (CANHCAM_APP.ACTIVE_FIXED_HEADER) {
//         $("header").addClass('fixedheader');
//         if ($(window).scrollTop() >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
//             setHeader($(window).scrollTop());
//         }
//     } else {
//         if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
//             $("header").addClass('fixedheader');
//         } else {
//             $("header").removeClass('fixedheader');
//         }
//     }
//     if ($("header").hasClass("fixedheader")) {
//         $("main").addClass('main-fixedheader');
//     }
// });

// // Fixed Header
// $(window).scroll(function() {
//     setHeader($(document).scrollTop());
// });
// // Fixed Header
// $(window).resize(function() {
//     if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
//         if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
//             $("header").addClass('fixedheader');
//         } else {
//             $("header").removeClass('fixedheader');
//         }
//     }
// });
function setMain() {
	var headerHeight = $("header").outerHeight();
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		// $("main").css('padding-top', headerHeight + 'px')
		$("main").css('padding-top', '0px');
	} else {
		if (!CANHCAM_APP.ACTIVE_PADDING_MAIN) {
			$("main").css('padding-top', '0px');
		} else {
			if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
				$("main").css('padding-top', 'initial');
			} else {
				// $("main").css('padding-top', headerHeight + 'px')
				$("main").css('padding-top', '30px');
				$("main").css('padding-bottom', '30px');
			}
		}
	}
}

$(document).ready(function () {
	setMain();
});

$(window).resize(function () {
	setMain();
});
function setHeaderTranparent(elm) {
	if (elm >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
		$("header").removeClass('has-tranparent');
	} else {
		$("header").addClass('has-tranparent');
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.HEADER_TRANPARENT) {
		$("header").addClass('has-tranparent');
		if ($(window).scrollTop() >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
			setHeaderTranparent($(window).scrollTop());
		}
	}
});

// Tranparent Header
$(window).scroll(function () {
	if (CANHCAM_APP.HEADER_TRANPARENT) {
		setHeaderTranparent($(document).scrollTop());
	}
});

function canhcamID(e) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < e; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}return text;
}

function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
		return String.fromCharCode('0x' + p1);
	}));
}

function b64DecodeUnicode(str) {
	return decodeURIComponent(atob(str).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});
function listToSelect() {
	$('[data-select]').each(function () {
		var list = $(this),
		    select = $(document.createElement('select')).insertBefore($(this).hide());
		select.addClass('custom-select').attr('data-select-show', '');
		$('>li a', this).each(function () {
			var option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html());
		});
		list.hide().removeAttr('data-select').attr('data-select-changed', '');
		select.on('change', function () {
			var url = $(this).val();
			if (url) {
				window.location = url;
			}
			return false;
		});
	});
}

function selectChangeToList() {
	if (CANHCAM_APP.ACTIVE_LIST_TO_SELECT) {
		if ($(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
			$('[data-select-changed]').each(function () {
				$(this).show().removeAttr('data-select-changed').attr('data-select', '');
			});
			$('[data-select-show]').remove();
		} else {
			listToSelect();
		}
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_LIST_TO_SELECT) {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
			listToSelect();
		}
	}
});

$(window).resize(function () {
	if (CANHCAM_APP.ACTIVE_LIST_TO_SELECT) {
		selectChangeToList();
	}
});

console.log('%cCANHCAM', 'font-size:100px;color:#ff451a;text-shadow:0 1px 0 #f73936,0 2px 0 #f73936 ,0 3px 0 #f73936 ,0 4px 0 #f73936 ,0 5px 0 #f73936 ,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
console.log('%c CANHCAM ' + '%c - The best Web Solutions Provider', 'border-radius: 2px; padding: 3px; background: #ff451a; color: #FFF', 'color: #ff451a');
console.warn("CANHCAM warning: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a CANHCAM feature or 'hack' someone's account, it is a scam and will give them access to your CANHCAM account.");
document.onkeyup = function (a) {
	if ((a = a || window.event).altKey && a.ctrlKey && a.shiftKey && 13 == a.which) return $("body"), alert(b64DecodeUnicode("QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv")), !1;
};

// Ripple
function ccCreateRipple() {
	$('[ripple]').on('click', function (e) {
		var rippleDiv = $('<div class="ripple" />'),
		    rippleOffset = $(this).offset(),
		    rippleY = e.pageY - rippleOffset.top,
		    rippleX = e.pageX - rippleOffset.left,
		    ripple = $('.ripple');

		rippleDiv.css({
			top: rippleY - ripple.height() / 2,
			left: rippleX - ripple.width() / 2,
			background: $(this).attr("ripple-color")
		}).appendTo($(this));
		window.setTimeout(function () {
			rippleDiv.remove();
		}, 1500);
	});
}

$(document).ready(function () {
	ccCreateRipple();
});

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_SELECT) {
		$(".select2").select2({
			placeholder: "Chọn một"
		});

		$('.select2').on("select2:select", function (e) {
			var valSelect = $(e.currentTarget).val();
		});
		$('.select2').on("select2:unselect", function (e) {
			var valUnselect = $(e.currentTarget).val();
		});
	}
});

function selectResset(e) {
	$(e).val(null).trigger("change", 0);
}

function canhCamStickyComtent() {

	$('[data-fix]').each(function () {
		$(this).css({
			"z-index": '500'
		});
		if ($(this).attr('data-top') && $(this).attr('data-top').length) {
			$(this).css({
				"top": $(this).attr('data-top')
			});
		}
		if ($(this).attr('data-left') && $(this).attr('data-left').length) {
			$(this).css({
				"left": $(this).attr('data-left')
			});
		}
		if ($(this).attr('data-bottom') && $(this).attr('data-bottom').length) {
			$(this).css({
				"bottom": $(this).attr('data-bottom')
			});
		}
		if ($(this).attr('data-right') && $(this).attr('data-right').length) {
			$(this).css({
				"right": $(this).attr('data-right')
			});
		}

		var toFix = 0;
		var typeFix = 'fixed';
		var changeFix = 'static';

		if ($(this).attr('data-fix') && $(this).attr('data-fix').length) {
			toFix = parseInt($(this).attr('data-fix'));
		}
		if ($(this).attr('data-fix-type') && $(this).attr('data-fix-type').length) {
			typeFix = $(this).attr('data-fix-type');
		}
		if ($(this).attr('data-fix-change') && $(this).attr('data-fix-change').length) {
			changeFix = $(this).attr('data-fix-change');
		}

		$(this).css({
			"position": typeFix
		});

		var scrollTop = $(window).scrollTop();
		var elementOffset = $(this).offset().top;
		var currentElementOffset = elementOffset - scrollTop;
		if (currentElementOffset <= toFix) {
			$(this).css({
				"position": changeFix,
				"top": toFix + 'px'
			});
		}
	});
}

$(document).ready(function () {
	canhCamStickyComtent();
});

$(window).scroll(function () {
	canhCamStickyComtent();
});

$(window).resize(function () {
	canhCamStickyComtent();
});

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_VALIDATOR) {
		$('[data-toggle="validator"]').validator({
			feedback: {
				success: 'fa fa-check',
				error: 'fa fa-close'
			}
		}).on('submit', function (e) {
			if (e.isDefaultPrevented()) {
				$('[data-toggle="validator"]').find('select').parent('.form-group').addClass('has-danger');
			}
		});
		if ($('[data-toggle="validator"]').find('select').hasClass('has-success')) {
			this.removeClass('has-danger');
		}
	}
});

$(document).ready(function () {
	$('.canhcam-header-1 .search-toggle').on('click', function () {
		$('.Module-211').fadeToggle();
	});
});
$(document).ready(function () {
	if ($(window).width() < 992) {
		$('body').append('<div class="backdrop"></div>');
	}
	$('.canhcam-header-1 .toggle-menu').on('click', function () {
		$('.canhcam-header-2').toggleClass('push-off');
		$('.backdrop').toggleClass('push-off');
		$('.canhcam-header-2 .nav-item').removeClass('active').find('.child-list').slideUp();
	});
	$('.backdrop').on('click', function () {
		$('.canhcam-header-2').removeClass('push-off');
		$('.backdrop').removeClass('push-off');
		$('.canhcam-header-2 .nav-item').removeClass('active').find('.child-list').slideUp();
	});

	if ($(window).innerWidth() < 992) {

		$('.canhcam-header-2 .main-nav .nav-item').on('click', function (e) {
			e.stopPropagation();
			$(e.currentTarget).toggleClass('active');
			$(e.currentTarget).children('.child-list').slideToggle();
		});
	}
	megaMenu();
});
$(window).on('scroll', function () {
	if ($(document).width() >= 992) {
		var s = $(document).scrollTop();
		var p = $('.canhcam-header-2').offset().top;
		var h = $('.canhcam-header-1').outerHeight();
		stickyHeader(s, p, h);
	}
});
function stickyHeader(s, p, h) {

	if (s >= p - h) {
		// console.log('bigger')
		$('.canhcam-header-1').fadeOut();
		$('.canhcam-header-2').addClass('fixed-menu');
	} else if (s < p) {
		// console.log('smaller')
		$('.canhcam-header-1').show();
		$('.canhcam-header-2').removeClass('fixed-menu');
	}
}
var megaMenu = function megaMenu() {
	$('.mega-list .list-group-item').each(function () {
		var x = $(this).attr('data-link');
		$(this).hover(function () {
			$('.mega-menu .mega-content').not(x).hide();
			$(x).css('display', "flex");
		});
	});
};
$(document).ready(function () {
	$('.canhcam-banner-1 .owl-carousel').owlCarousel({
		items: 1,
		dots: false,
		autoplay: true,
		autoplaySpeed: 500,
		autoplayTimeout: 4000,
		loop: true,
		nav: true,
		autoplayHoverPause: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		navText: ['<img src="/Data/Sites/1/skins/default/img/owl-prev.png">', '<img src="/Data/Sites/1/skins/default/img/owl-next.png">']
	});
});

$(document).ready(function () {
	$('.canhcam-banner-2 .owl-carousel').owlCarousel({
		items: 1,
		dots: false,
		nav: false,
		autoplaySpeed: 750,
		autoplayTimeout: 4000,
		mouseDrag: false,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		navText: ['<img src="./img/owl-prev.png">', '<img src="./img/owl-next.png">']
	});
});

$(function () {
	$('.canhcam-carousel-1 .owl-carousel').owlCarousel({
		items: 1,
		autoplay: true,
		autoplayTimeOut: 2500,
		autoplaySpeed: 1000,
		rewind: true,
		margin: 30,
		autoplayHoverPause: true,
		dots: true,
		dotsEach: true,
		responsive: {
			768: {
				items: 2
			},
			992: {
				items: 3
			}
		}
	});
});

$(document).ready(function () {
	$('.Module-306 .row .form-group:nth-child(4) input').attr({ 'type': 'date' });
	$('.Module-304 .row .form-group:nth-child(4) input').attr({ 'type': 'date' });
	$('#ctl00_mainContent_ctl10_ctlfea2c23906944855a9d78ddb6450e24f_txtfea2c23906944855a9d78ddb6450e24f').attr('type', 'date');
	$('#ctl00_mainContent_ctl11_ctl441e446320964901ac769209d04dfe63_txt441e446320964901ac769209d04dfe63').attr('type', 'date');
	$('#ctl00_mainContent_ctl02_ctlfea2c23906944855a9d78ddb6450e24f_txtfea2c23906944855a9d78ddb6450e24f').attr('type', 'date');
	$('#ctl00_mainContent_ctl01_ctl441e446320964901ac769209d04dfe63_txt441e446320964901ac769209d04dfe63').attr('type', 'date');
	$('#ctl00_mainContent_ctl00_ctl00_mdl306_ctl00_ctlfea2c23906944855a9d78ddb6450e24f_txtfea2c23906944855a9d78ddb6450e24f').attr('type', 'date');
});
$(document).ready(function () {
	$('.canhcam-home-2 .owl-carousel').owlCarousel({
		// items: 4,
		autoplay: true,
		margin: 30,
		loop: true,
		dots: true,
		dotsEach: 1,
		nav: true,
		navText: ['<i class="mdi mdi-chevron-left"></i>', '<i class="mdi mdi-chevron-right"></i>'],
		responsive: {
			0: {
				dotsEach: 1,
				items: 2
			},
			480: {
				dotsEach: 1,
				items: 2
			},
			768: {
				dotsEach: 1,
				items: 3
			},
			992: {
				dotsEach: 1,
				nav: false,
				items: 4
			}
		}
	});
});
$(document).ready(function () {
	$('.canhcam-home-3 .review').owlCarousel({
		items: 1,
		dots: false,
		nav: true,
		navText: ['<i class="mdi mdi-chevron-left"></i>', '<i class="mdi mdi-chevron-right"></i>'],
		rewind: true
	});

	$('.canhcam-home-3 .video').owlCarousel({
		items: 1,
		dots: false,
		nav: true,
		navText: ['<i class="mdi mdi-chevron-left"></i>', '<i class="mdi mdi-chevron-right"></i>'],
		rewind: true
	});
});
function CCForm1() {
	$('.canhcam-form-1 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {} else {
			$(this)[0].reset();
		}
	});
};

$(function () {
	CCForm1();
});

$(window).resize(function () {});

// Theme list
//  - default
//  - white
//  - black
//  - river
//  - cyan
//  - green
//  - metan
//  - yellow
//  - red
// Check at http://en.mygeoposition.com/

$(document).ready(function () {
	if ($('.canhcam-map-1 #ccmaps')) {
		$('.canhcam-map-1 #ccmaps').kmaps();
	}
});

$(window).resize(function () {});

$(document).ready(function () {
	if ($('.canhcam-home-4 .kienthuc-danhgia').length) {
		$('.canhcam-home-4 .kienthuc-danhgia').owlCarousel({
			false: false,
			loop: true,
			rewind: true,
			margin: 30,
			dots: true,
			dotsEach: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					mouseDrag: false,
					items: 3
				}
			}
		});
	}
	if ($('.canhcam-home-4 .kienthuc-video').length) {
		$('.canhcam-home-4 .kienthuc-video').owlCarousel({
			false: false,
			loop: true,
			// center: false,
			rewind: true,
			// padding: 10,
			margin: 30,
			// nav: false,
			dots: true,
			dotsEach: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					mouseDrag: false,
					items: 3
				}
			}
		});
	}
});

$(function () {
	$('.canhcam-boxes-1 .job').find('.job-title').click(function () {
		$('.canhcam-boxes-1 .job .job-title').not(this).parent().find('.job-content').slideUp();
		$('.canhcam-boxes-1 .job .job-title').not(this).parent().find('.job-title').removeClass('active');
		$(this).parent(this).find('.job-content').slideToggle();
		$(this).toggleClass('active');
		$('.career-frame').slideUp();
	});

	$('.canhcam-boxes-1 .toggle-apply-form').on('click', function () {
		$(this).parents('.job').find('.career-frame').slideToggle();
	});
});
$(document).ready(function () {
	shopCanhCam1();
	$(".canhcam-shop-1 #price").slider({
		formatter: function formatter(value) {
			return value;
		}
	});
	$(".canhcam-shop-1 #price").on("slide", function (slideEvt) {
		$(".canhcam-shop-1 #geVal").text(slideEvt.value);
	});
	selectCountriesShop1();
});

function selectCountriesShop1() {
	var datano = $('.canhcam-shop-1 #selectcountries').attr('data-no');
	$('.canhcam-shop-1 #selectcountries').select2({
		"language": {
			"noResults": function noResults() {
				return datano;
			}
		},
		escapeMarkup: function escapeMarkup(markup) {
			return markup;
		}
	}).on('select2:select', function (e) {
		var data = e.params.data;
		var attributes = e.target.value;
		window.location.href = attributes;
	});
}

function shopCanhCam1() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('.canhcam-shop-1 #filterSearch').addClass('collapse');
	} else {
		$('.canhcam-shop-1 #filterSearch').removeClass('collapse');
	}
}

$(window).resize(function () {
	shopCanhCam1();
});

$(document).ready(function () {
	$('.canhcam-shop-1 .product-list .dropdown-list h3').click(function () {
		$('.canhcam-shop-1 .product-list .dropdown-list h3').not(this).parent().children('.type-product').slideUp();
		$('.canhcam-shop-1 .product-list .dropdown-list h3').not(this).parent().removeClass('active');
		$(this).parent().children('.type-product').slideToggle();
		$(this).parent().toggleClass('active');
	});
});
$(function () {
	if ($('.canhcam-carousel-2 .news-list .owl-carousel').length) {
		$('.canhcam-carousel-2 .news-list .owl-carousel').owlCarousel({
			false: false,
			loop: true,
			// center: false,
			rewind: true,
			// padding: 10,
			margin: 30,
			// nav: false,
			dots: true,
			dotsEach: true,
			callbacks: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					items: 3
				},
				992: {
					items: 4
				}
			}
		});
	}
});
function ProductDetailShop1() {
	$('.canhcam-shop-details-1 .product-details .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});
	$('.canhcam-shop-details-1 .product-details .slider-nav').slick({
		autoplay: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		// centerMode: true,
		focusOnSelect: true,
		prevArrow: $('.left-arrow'),
		nextArrow: $('.right-arrow'),
		infinite: true,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 2
				// centerMode: false,
			}
		}]
	}).on('init', function (event, slick, direction) {
		if (!$('.canhcam-shop-details-1 .product-details .slider-nav .left-arrow').is(':visible')) {
			$('.canhcam-shop-details-1 .product-details .slider-control').css({
				'padding-top': '0px'
			});
		}
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
		var getcs = slick.$slides.length - 1;
		if (currentSlide == 0) {
			$('.canhcam-shop-details-1 .product-details .left-arrow').attr('disabled', 'disabled');
		} else {
			$('.canhcam-shop-details-1 .product-details .left-arrow').removeAttr('disabled');
		}
		if (getcs == currentSlide) {
			$('.canhcam-shop-details-1 .product-details .right-arrow').attr('disabled', 'disabled');
		} else {
			$('.canhcam-shop-details-1 .product-details .right-arrow').removeAttr('disabled');
		}
	});
};

$(document).ready(function () {
	ProductDetailShop1();
});
$(document).ready(function () {

	$('#ctl00_mainContent_ctl02_ctl637bc46840064b54b58c9747a93dc62c_txt637bc46840064b54b58c9747a93dc62c').attr('type', 'date');
});

function giaiPhapChiTiet() {
	$('.giaiphapchitiet-1 .slider-img .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});
	$('.giaiphapchitiet-1 .slider-img .slider-nav').slick({
		autoplay: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		centerMode: false,
		focusOnSelect: true,
		prevArrow: $('.left-arrow'),
		nextArrow: $('.right-arrow'),
		infinite: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				vertical: false,
				verticalSwiping: false,
				variableWidth: false
			}
		}]
	}).on('init', function (event, slick, direction) {
		if (!$('.giaiphapchitiet-1 .slider-img .slider-nav .left-arrow').is(':visible')) {
			$('.giaiphapchitiet-1 .slider-img .slider-control').css({
				'padding-top': '0px'
			});
		}
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
		var getcs = slick.$slides.length - 1;
		if (currentSlide == 0) {
			$('.giaiphapchitiet-1 .slider-img .left-arrow').attr('disabled', 'disabled');
		} else {
			$('.giaiphapchitiet-1 .slider-img .left-arrow').removeAttr('disabled');
		}
		if (getcs == currentSlide) {
			$('.giaiphapchitiet-1 .slider-img .right-arrow').attr('disabled', 'disabled');
		} else {
			$('.giaiphapchitiet-1 .slider-img .right-arrow').removeAttr('disabled');
		}
	});
};

$(document).ready(function () {
	giaiPhapChiTiet();
});

function lieuTrinhChiTiet1() {
	$('.lieutrinhchitiet-1 .slider-img .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});
	$('.lieutrinhchitiet-1 .slider-img .slider-nav').slick({
		autoplay: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		centerMode: false,
		focusOnSelect: true,
		prevArrow: $('.left-arrow'),
		nextArrow: $('.right-arrow'),
		// vertical: true,
		// variableWidth: false,
		// verticalSwiping: false,
		infinite: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		}]
	}).on('init', function (event, slick, direction) {
		if (!$('.lieutrinhchitiet-1 .slider-img .slider-nav .left-arrow').is(':visible')) {
			$('.lieutrinhchitiet-1 .slider-img .slider-control').css({
				'padding-top': '0px'
			});
		}
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
		var getcs = slick.$slides.length - 1;
		if (currentSlide == 0) {
			$('.lieutrinhchitiet-1 .slider-img .left-arrow').attr('disabled', 'disabled');
		} else {
			$('.lieutrinhchitiet-1 .slider-img .left-arrow').removeAttr('disabled');
		}
		if (getcs == currentSlide) {
			$('.lieutrinhchitiet-1 .slider-img .right-arrow').attr('disabled', 'disabled');
		} else {
			$('.lieutrinhchitiet-1 .slider-img .right-arrow').removeAttr('disabled');
		}
	});
};

$(document).ready(function () {
	lieuTrinhChiTiet1();
	$('.lieutrinhchitiet-1 .button-list .btn-video').fancybox({
		'width': 768,
		'height': 480
	});

	$('#ctl00_mainContent_ctl00_ctl00_mdl329_ctl00_ctl637bc46840064b54b58c9747a93dc62c_txt637bc46840064b54b58c9747a93dc62c').attr('type', 'date');
});

$(function () {
	if ($('.canhcam-carousel-3 .news-list .owl-carousel').length) {
		$('.canhcam-carousel-3 .news-list .owl-carousel').owlCarousel({
			false: false,
			loop: true,
			// center: false,
			rewind: true,
			// padding: 10,
			margin: 30,
			// nav: false,
			dots: true,
			dotsEach: true,
			callbacks: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					items: 3
				},
				992: {
					items: 4
				}
			}
		});
	}
});
$(function () {
	if ($('.canhcam-carousel-7 .news-list .owl-carousel').length) {
		$('.canhcam-carousel-7 .news-list .owl-carousel').owlCarousel({
			false: false,
			loop: true,
			// center: false,
			rewind: true,
			// padding: 10,
			margin: 30,
			// nav: false,
			dots: true,
			dotsEach: true,
			callbacks: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					items: 3
				},
				992: {
					items: 4
				}
			}
		});
	}
});

$(function () {
	if ($('.canhcam-carousel-4 .news-list .owl-carousel').length) {
		$('.canhcam-carousel-4 .news-list .owl-carousel').owlCarousel({
			false: false,
			loop: true,
			rewind: true,
			margin: 30,
			dots: true,
			dotsEach: true,
			callbacks: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					items: 3
				},
				992: {
					items: 4
				}
			}
		});
	}
});
// $(window).scroll(function () {
// 	$('.canhcam-boxes-7 .nav-about .list-group .list-group-item .nav-link').each(function () {
// 		var link = $(this).attr('data-link')
// 		console.log(link)
// 		var xyz = $(link).offset().top - $('header .canhcam-header-2').outerHeight() - 10;
// 		if ($(window).scrollTop() >= xyz) {
// 			$('.canhcam-boxes-7 .nav-about .list-group .list-group-item .nav-link').removeClass('active')
// 			$(this).addClass('active')
// 		}
// 	})
// })
$(document).ready(function () {
	$('.canhcam-boxes-7 .nav-about .list-group .list-group-item .nav-link').each(function () {
		var link = $(this).attr('data-link');
		var headerHeight = $('.canhcam-header-2').outerHeight();
		$(this).click(function () {
			$('.canhcam-boxes-7 .nav-about .list-group .list-group-item .nav-link').not(this).removeClass('active');
			$(this).addClass('active');
			$('html,body').animate({
				scrollTop: $(link).offset().top - headerHeight
			}, 1000);
		});
	});
});

$(function () {
	if ($('.canhcam-carousel-5 .news-list .owl-carousel').length) {
		$('.canhcam-carousel-5 .news-list .owl-carousel').owlCarousel({
			false: false,
			loop: true,
			// center: false,
			rewind: true,
			// padding: 10,
			margin: 30,
			// nav: false,
			dots: true,
			dotsEach: true,
			callbacks: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					items: 3
				}
			}
		});
	}
});
$(function () {
	if ($('.canhcam-carousel-6 .news-list .owl-carousel').length) {
		$('.canhcam-carousel-6 .news-list .owl-carousel').owlCarousel({
			false: false,
			loop: true,
			// center: false,
			rewind: true,
			// padding: 10,
			margin: 30,
			// nav: false,
			dots: true,
			dotsEach: true,
			callbacks: true,
			responsive: {
				0: {
					items: 2
				},
				480: {
					items: 2
				},
				768: {
					items: 3
				}
			}
		});
	}
});
function changeNewsItemNews3() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-news-3 .news-item').each(function () {
			var geth = $(this).find('.top-list .item:first-child figure').outerHeight();
			var countitem = $(this).find('.part-list').find('.item').length;
			$(this).find('.part-list .item figure').each(function () {
				$(this).css({
					'height': 'calc(' + geth / countitem + 'px - 1rem)'
				});
			});
		});
	} else {
		$('.canhcam-news-3 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			});
		});
	}
}

$(document).ready(function () {
	changeNewsItemNews3();

	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-news-3 .owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			center: true,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true
		});
	}

	$('.canhcam-news-3 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-3 .news-list #grid').removeClass('active');
		$('.canhcam-news-3 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-3 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-3 .news-list #list').removeClass('active');
		$('.canhcam-news-3 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
	changeNewsItemNews3();
});

$(document).ready(function () {});

function changeNewsDetail1() {
	$(".canhcam-news-details-1 .news-read").lightGallery({
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		selector: '.item-news-read'
	});
}
function createNewsSocial1() {
	var newsFullPath = document.URL;
	var newsFullPathEncode = encodeURIComponent(document.URL);
	$('.fb-share-button').attr('data-href', newsFullPath);
	$('.fb-share-button .fb-xfbml-parse-ignore').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + newsFullPathEncode + '&src=sdkpreparse');
	$('.twitter-share-button').attr('data-url', newsFullPath);
}

function changeIMGtoDiv1() {
	$('.canhcam-news-details-1 .othernews .item figure').each(function () {
		var tmp = $(this).find('img').attr('src');
		$(this).append('<div class="thumb"></div>');
		$(this).find('.thumb').css({
			"background-image": "url(" + tmp + ")",
			"background-position": "center center",
			"background-size": "cover"
		});
	});
}

$(document).ready(function () {
	changeNewsDetail1();
	createNewsSocial1();
	changeIMGtoDiv1();
});

$(window).resize(function () {
	changeIMGtoDiv1();
});

$(document).ready(function () {
	var _$$lightGallery;

	$(".canhcam-gallery-1 .gallery-details .gallery-lists .hidden").lightGallery((_$$lightGallery = {
		thumbnail: true,
		addClass: 'canhcam-gallery-1 canhcam-video-fixed-size',
		counter: false,
		download: false,
		startClass: '',
		enableSwipe: false,
		enableDrag: false,
		speed: 500
	}, _defineProperty(_$$lightGallery, "thumbnail", true), _defineProperty(_$$lightGallery, "animateThumb", false), _defineProperty(_$$lightGallery, "showThumbByDefault", false), _$$lightGallery));

	$('.canhcam-gallery-1 .gallery-details .gallery-lists .item').each(function () {
		$(this).click(function () {
			$(this).find('.hidden a:first-child').trigger('click');
		});
	});
});
$(document).ready(function () {
	var _$$lightGallery2;

	$(".canhcam-gallery-2 .gallery-details .gallery-lists .item-wrap").lightGallery((_$$lightGallery2 = {
		thumbnail: true,
		// mode: 'lg-fade',
		addClass: 'canhcam-gallery-2 canhcam-video-fixed-size',
		counter: false,
		download: false,
		startClass: '',
		enableSwipe: false,
		enableDrag: false,
		speed: 500
	}, _defineProperty(_$$lightGallery2, "thumbnail", true), _defineProperty(_$$lightGallery2, "animateThumb", false), _defineProperty(_$$lightGallery2, "showThumbByDefault", false), _$$lightGallery2));
});
// $(document).ready(function() {
//     $('.canhcam-hotro-1 .question-list .question').click(function() {
//         $(this).parent().toggleClass('active');
//         $(this).parent().children('.answer').slideToggle();
//         // $('.canhcam-hotro-1 .question-list .question').not(this).parent().removeClass('active');
//         // $('.canhcam-hotro-1 .question-list .question').not(this).parent().find('.answer').slideUp();
//     });
// })

$(document).ready(function () {
	$('.canhcam-hotro-1 .question-list .question').click(function () {
		$('.canhcam-hotro-1 .question-list .question').not(this).parent().children('.answer').slideUp();
		$('.canhcam-hotro-1 .question-list .question').not(this).parent().removeClass('active');
		$('.canhcam-hotro-1 .question-list .toggle-text').not(this).removeClass('show');
		$(this).parent().children('.toggle-text').addClass('show');
		$(this).parent().children('.answer').slideToggle();
		$(this).parent().toggleClass('active');
	});
	$('.canhcam-hotro-1 .question-list .toggle-text').click(function () {
		$(this).parent().find('.answer').toggleClass('show-more');
		$(this).toggleClass('txt');
		$('.canhcam-hotro-1 .question-list .toggle-text').text('Xem thêm');
		$('.canhcam-hotro-1 .question-list .toggle-text.txt').text('Ẩn đi');
	});
});

function CCForm1() {
	$('.canhcam-form-1 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {} else {
			$(this)[0].reset();
		}
	});
};

$(function () {
	CCForm1();
});

$(window).resize(function () {});

$(document).ready(function () {});
function CCFooter1() {};

$(function () {
	CCFooter1();
});

$(window).resize(function () {});
//# sourceMappingURL=app.js.map
