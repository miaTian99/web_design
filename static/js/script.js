// UA判定

var _ua = (function(u) {
    var mobile = {
        0: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1,
        iPhone: (u.indexOf("iphone") != -1),
        Android: (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
    };
    var tablet = (u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1;
    var pc = !mobile[0] && !tablet;
    return {
        Mobile: mobile,
        Tablet: tablet,
        PC: pc
    };

	// example
	// if(_ua.PC)
	// if(_ua.Tablet)
	// if(_ua.Mobile[0])
	// if(_ua.Mobile.iPhone)
	// if(_ua.Mobile.Android)


})(window.navigator.userAgent.toLowerCase());

var userAgent;
var iPad = false;
// browser class
function addBrowserClass() {
    var __add = function(name, ver) {
        if (document.documentElement.className) {
            document.documentElement.className += ' ';
        }
        document.documentElement.className += name + (ver !== '' ? ' ' + name + (ver * 1).toString().replace('.', '_') : '');
    };
    userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();
    if (get = userAgent.match(/msie (\d+(\.\d+)?)/i)) {
        __add('ie', get[1]);
    } else if (get = userAgent.match(/Trident.+rv\:(\d+(\.\d+)?)/i)) {
        __add('ie', get[1]);
    } else if (get = userAgent.match(/chrome\/(\d+(\.\d+)?)/i)) {
        __add('chrome', get[1]);
    } else if (get = userAgent.match(/firefox\/(\d+(\.\d+)?)/i)) {
        __add('firefox', get[1]);
    } else if (get = userAgent.match(/opera\/(\d+(\.\d+)?)/i)) {
        __add('opera', get[1]);
    } else if (get = userAgent.match(/safari\/(\d+(\.\d+)?)/i)) {
        __add('safari', get[1]);
    }

    // ついでにモバイルOS情報を付加する→ios(iphone, ipad, ipod), android
    if (get = userAgent.match(/iPhone OS (\d+(\.\d+)?)/i)) {
        __add('ios', get[1]);
    }
    if (get = userAgent.match(/iPhone;/i)) {
        __add('iphone', '');
    } else if (get = userAgent.match(/iPod;/i)) {
        __add('ipod', '');
    } else if (get = userAgent.match(/iPad;/i)) {
        __add('ipad', '');
		iPad = true;
    } else if (get = userAgent.match(/Android (\d+(\.\d+)?)/i)) {
        __add('android', get[1]);
    }
}
addBrowserClass();

var number = 1;
var wW;
var wW_half;
var wH;
var animeFlag = true;
var scrollFlag = true;
var touchFlag = true;
var reloadFlag = true;
var movieFlag = false;
var inscrollFlag =false;
var $section = [$('#section1'),$('#section2'),$('#section3'),$('#section4'),$('#section5'),$('#section6'),$('#section7'),$('#section8'),$('#section9'),$('#section10')];
var $section1 = $('#section1');
var $section2 = $('#section2');
var $section3 = $('#section3');
var $section4 = $('#section4');
var $section5 = $('#section5');
var $section7 = $('#section7');
var initialValue = 0;
var ed4 = $('.effect_detail4');
var ed4w = ed4.width();
var vl_ul = $('#voice_list ul');
var vl_ul_width = 8770;
var vl_ed4_diff = vl_ul_width - ed4w;
var maxSlidepoint = parseInt(vl_ed4_diff + 200);
var slideTimer;
var touchstartpoint;
var header = $('header');
var nav = $('header nav');
var movie_height = $('#play').innerHeight();
var animTimer = null;
var moreair;
$(function() {
	if(/twitter|fbav|line/.test(navigator.userAgent.toLowerCase())){
		$('#webview').removeClass('remove');
		$('.webview_cont .touchElm').on('click',function(){
			$('#webview').addClass('remove');
		});
	}
	$('#loading').addClass('on');
	//console.log(number);
	$('#op').on('click',function(e){
        if(!_ua.Mobile[0]){
            e.stopPropagation();
    		var check = nav.hasClass('none');
    		if(check){
    			//menu クローズ状態
    			openMenu();
    		}else{
    			//menu オープン状態
    			closeMenu();
    		}
        }else {
            if($('body#voice').length){
                e.stopPropagation();
        		var check = nav.hasClass('none');
        		if(check){
        			//menu クローズ状態
        			openMenu();
        		}else{
        			//menu オープン状態
        			closeMenu();
        		}
            }
        }
	});
	$('.balloon').on('click',function(){
        $(this).parents('.circle_wrap').toggleClass('on');
	});
	setInterval(function(){
		$('#arrow,#arrow3').toggleClass('float');
	},2500);
	setInterval(function(){
		$('.balloon').toggleClass('float');
	},1500);

//sidenav
	$('#sidenav li, #menu .menuli, .changeSection').on('click',function(e){
        e.stopPropagation();
        //console.log(e.target.className);
        var liNum = $(this).data('linum');
        if(menuflag){
            closeMenu(liNum);
        }else{
            startNextSection(liNum);
        }
        return false;
	});

    var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    document.addEventListener(mousewheelevent, startMonoAir, false);
    document.addEventListener('touchstart', function(e){
        if($('body#voice').length){
            return;
        }
        // console.log(e.target.className);
        // if(e.target.nodeName.match(/^(A|LI)$/) || $(e.target).hasClass(/(touchElm|btn|back)/)){
		// 	return;
		// }

        //e.stopPropagation();
        // console.log(e.touches[0].pageY);
        touchstartpoint = e.touches[0].pageY;
        // e.preventDefault();
        if(!touchFlag) return;
        if(e.target.className.match(/touchElm/)){
            var action = $(e.target).data('action');
            if(action === 'voice'){
                var dir = $(e.target).data('detail');
                slideVoice(dir);
            }
            $('.container').addClass('notouch');
            setTimeout(function(){
                $('.container').removeClass('notouch');
            },1000);
        }
    }, false);
    noscroll();
    document.addEventListener('touchend', startMonoAir, false);
});
var menuflag = false;
function menu(){

    var check = nav.hasClass('none');
    if(check){
        //menu クローズ状態
        openMenu();

    }else{
        //menu オープン状態
        closeMenu();

    }
}
function noscroll(){
    $(window).on('touchstart.noScroll', function(e) {
        if($('body#voice').length){
            return;
        }
        inscrollFlag = false;
        e.preventDefault();
    });
}
function onscroll(){
    $(window).off('touchstart.noScroll');
    // console.log("onscroll");
}
function openMenu(){
    //menu クローズ状態
    menuflag = true;
    touchFlag = false;
    scrollFlag = false;
    nav.removeClass('none');
    if(!inscrollFlag){
        onscroll();
    }
    setTimeout(function(){
        $('#op p').text('CLOSE');
        header.addClass('on');
        nav.addClass('on');
        $('body').addClass('blue nav_open');

    },10);
}

function closeMenu(liNum){
    if(typeof liNum === 'undefined'){
        liNum = false;
    }
    menuflag = false;
    scrollFlag = true;
    touchFlag = true;
    header.removeClass('on');
    nav.removeClass('on');
    $('body').removeClass('blue nav_open');
    // console.log(inscrollFlag,liNum);
    if(inscrollFlag){
        touchFlag = false;
        scrollFlag = false;
    }else {
        noscroll();
    }
    setTimeout(function(){
        $('#op p').text('MENU');
        nav.addClass('none');
        if(liNum)
            startNextSection(liNum);
    },500);
}
var stage = false;
if(!_ua.Mobile[0]){
    var stage = new createjs.Stage("arc");
    var shape = new createjs.Shape();
    var color = 'rgba(240, 194, 83, 0.2)';
    var thickness = 20;
    var d = -90;
    var s = 180;
    var startR = d * Math.PI / 180;
    var endR = s * Math.PI / 180;
    function draw(){
        stage.addChild(shape);
        stage.update();
        createjs.Ticker.addEventListener("tick", stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        shape.x = 190;
        shape.y = 190;
        shape.graphics.setStrokeStyle(thickness).beginStroke(color);
        var arcCommand = shape.graphics.arc(0, 0, 180, startR, startR).command;
        var artTween = createjs.Tween.get(arcCommand).to({endAngle: endR}, 400, createjs.Ease.easeOut);
    }
    function removeDraw(){
        var artTween = createjs.Tween.get(shape).to({alpha: 0}, 400, createjs.Ease.easeOut);
        setTimeout(function(){
            stage.removeChild();
            shape = new createjs.Shape();
        },400);
    }
}

var save  = 0; // タイムスタンプ保存用
var clock = 0; // タイムスタンプ比較用
function startMonoAir(e){
    // console.log(e.target.className);
    // console.log($(e.target).data('action'));

    clock = e.timeStamp - save;
    save  = e.timeStamp;
    if(clock < 50) {
        if(e.type === 'wheel')
            e.preventDefault();
        return false; // 比較結果が50msより少ない場合はキャンセル
    }
    var delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);
    if(e.type === 'touchend'){
        delta = e.changedTouches[0].pageY - touchstartpoint;
        // console.log(touchstartpoint);
        // console.log(e.changedTouches[0].pageY);
        // console.log(Math.abs(delta));
        if(delta === 0 || Math.abs(delta) <= 50){

            // console.log(e.target.className.match(/touchElm/));
            if(e.type === 'touchend' && e.target.className.match(/touchElm/)){
                var action = $(e.target).data('action');
                switch (action) {
                    case 'menu':
                        e.stopPropagation();
                        menu();
                        break;

                    case 'section':
                        // console.log(e);
                        if(!_ua.Mobile[0]){
                            var num = $(e.target).data('section');
                            closeMenu(num);
                            break;
                        }

                    case 'sidemenu':
                        var num = $(e.target).data('linum');
                        startNextSection(num);
                        break;

                    case 'cd':
                        var cdnum = $(e.target).data('cdnum');
						$('.commentary_detail'+cdnum).addClass('on');
                        setTimeout(function(){
							$('#section3').addClass('step_ccover');
                            $('.commentary_detail'+cdnum).find('.commentary_inner').addClass('go');
                        },10);
                        break;

                    case 'cd_close':
                        var cdclosenum = $(e.target).data('cdnum');
                        // console.log(cdclosenum);
                        $('.commentary_detail'+cdclosenum).find('.commentary_inner').removeClass('go');
                        setTimeout(function(){
							$('#section3').removeClass('step_ccover');
                            $('.commentary_detail'+cdclosenum).removeClass('on');
                        },10);
                        break;

                    case 'more_sec4':
                        var modal = $(e.target).data('modal');
                        if(modal === 'paper'){
                            $section4.addClass('onPaper');
                            if(_ua.Mobile[0]){
                                setTimeout(function(){
                                    $section4.addClass('onPaperGo');
                    			},10);
                                scrollFlag = false;
                                inscrollFlag = true;
                                onscroll();
                            }else {
                                setTimeout(function(){
                    				$section4.addClass('onPaperGo');
                    			},1000);
                            }
                        }else if(modal === 'gear'){
                            $section4.addClass('onGear');
                            if(_ua.Mobile[0]){
                                setTimeout(function(){
                                    $section4.addClass('onGearGo');
                    			},10);
                                inscrollFlag = true;
                                scrollFlag = false;
                                onscroll();
                            }else {
                                setTimeout(function(){
                    				$section4.addClass('onGearGo');
                    			},1000);
                            }
                        }else if(modal === 'back'){
                            if(!_ua.Mobile[0]){
                                $(e.target).addClass('none');
                    			$section4.removeClass('onPaperGo onGearGo');
                                setTimeout(function(){
                    				$section4.removeClass('onPaper onGear');
                    				$('.modal .back').removeClass('none');
                    			},1000);
                            }
                        }
                        break;

                    case 'more_sec4_modal':
                        var modalshift = $(e.target).data('modal');
                        // console.log(modalshift);
                        modalChange(modalshift);
                        break;

                    case 'more_sec5':
                        var detail = $(e.target).data('detail');
                        e.stopPropagation();
                        changeSec5(detail);
                        break;

                    case 'more_sec5_detail':
                        var detail = $(e.target).data('detail');
                        changeSec5(detail, true);
                        break;

                    case 'mm':
                        var mmnumber = $(e.target).data('mm');
						$('.more_modal_wrap').addClass('on');
						$('.more_modal_wrap').addClass(mmnumber);
                        setTimeout(function(){
                            $('.more_modal_inner').addClass('go');
                        },100);
                        break;
                    case 'mmclose':
                        $('.more_modal_inner').removeClass().addClass('more_modal_inner');
                        setTimeout(function(){
							$('.more_modal_wrap').removeClass().addClass('more_modal_wrap');
                        },500);
                        break;

                    case 'voice':
                        clearTimeout(slideTimer);
                        break;

                    case 'limited':
                        $('.limited_edition').toggleClass('on');
                        break;

                    case 'cartridge':
                        $('.cartridge').toggleClass('on');
                        break;

                    case 'link':
                        var url = $(e.target).attr('href');
                        window.open(url);
                        break;

                    case 'movie':
						ytPlayer.playVideo();
						$(this).addClass('play');
						$('#close').addClass('on');
						setTimeout(function(){
							$('#play').addClass('none');
						},500);
                        break;

                    case 'anchor':
                        var n = $(e.target).data('section');
                        startNextSection(n);
                        break;

					case 'close_movie':
						$(this).addClass('on');
						$('#play').removeClass('none');
						ytPlayer.pauseVideo();
						setTimeout(function(){
							$('#play').removeClass('play');
							$('#close').removeClass('on');
						},500);
                        break;

                    case 'share':
						var url = $(e.target).attr('href');
                        window.open(url);
                        break;

                    case 'webview':
							$('#webview').addClass('remove');
                        break;

                    case 'crosscut':
							$('#section7').addClass('step3').removeClass('step1 step2');
                        break;

                    case 'disposable':
							$('#section7').addClass('step2').removeClass('step1 step3');
                        break;

                    case 'refill':
							$('#section7').addClass('step1').removeClass('step2 step3');
                        break;

                    default:
                        break;

                }
        		return;
        	}
            return;
            //delta = -1;
        }
    }
    if(scrollFlag){
        if (delta < 0 && number < 9){

            scrollFlag = false;
            //console.log('+');
            //number+=1;
            // console.log('number:'+number);
            // console.log($section);

            startScroll(number, number-1);

        } else if(delta > 0 && number > 1) {
            scrollFlag = false;
            //console.log(delta);
            // console.log('-');
            number-=1;

            // console.log('number:'+number);
            // console.log($section);
            //resetClass(number-1);
            $('*').off('webkitTransitionEnd transitionend');
            $('body').addClass('skip').on('webkitTransitionEnd transitionend', function(e) {
                if(e.originalEvent.propertyName=='width'){
                    $('body').removeClass('skip');
                    here(number);
                    startAnimation(number, number+1);
                    // resetClass(number-1);
                    // animation(number);
                    // $section[number-1].addClass('on start');
                    // here();
                    //scrollFlag = true;
                }
            });
        }
    }
}

function startAnimation(liNum, old){
    // console.log(old);
    //console.log($section);
    liNum = parseInt(liNum);
    resetClass(liNum);
    animation(liNum);
    var addClassName = 'on start';
    if(liNum === 1){
        addClassName = 'on';
    }
    // console.log(liNum);
    // console.log($section[liNum-1]);
    $section[liNum-1].addClass(addClassName);
    changeScrollFlag(liNum);
    $(this).off('webkitTransitionEnd transitionend');
}

function startNextSection(liNum){
    liNum = parseInt(liNum);

    if(number === liNum) return false;
    // console.log(liNum);
    here(liNum);
    //1 to 2
    if(liNum == 2 && number == 1){
        $section1.addClass('start').on('webkitTransitionEnd transitionend', function(e) {

			if(e.originalEvent.propertyName.match(/transform/)){
                $section1.addClass('step1');
            }
	        if(e.originalEvent.propertyName.match(/opacity/)){
                // //console.log(e.originalEvent.propertyName);
                $('.section:not(:eq(1))').removeClass(function(index, className) {
                    var classList = (className.match(/\bstep\S+/g) || []);
                    classList.push('on start end');
                    return classList.join(' ');
                });
                $section2.addClass('on start');
                number = 2;
                animeFlag = true;
                $(this).off('webkitTransitionEnd transitionend');
            }
        });
        changeScrollFlag(liNum);
    }else{
        var spAnimFlag = {
            6: {
                'elem': (_ua.Mobile[0]) ? 'effect4_img' : 'sec5_effect1',
                'property': (_ua.Mobile[0]) ? 'transform' : 'left'
            },
            7: {
                'elem': 'sec6_more6',
                'property': 'transform'
            },
            8: {
                'elem': 'bg_end_7',
                'property': 'height'
            }
        }

        // console.log(animeFlag);
        // console.log(number);
        // console.log(liNum);
        var old = number;
        //隣り合わせのセクション移動
        if(animeFlag && number == (liNum - 1)){
            // console.log($section[liNum-2]);
            if(typeof spAnimFlag[liNum] !== 'undefined'){
                $section[liNum-2].addClass('end').on('webkitTransitionEnd transitionend', function(e) {
                    // console.log(spAnimFlag[liNum].elem);
                    if(e.originalEvent.target.id==spAnimFlag[liNum].elem&&e.originalEvent.propertyName==spAnimFlag[liNum].property){
                        startAnimation(liNum, old);
                    }
                });
            }else if(liNum == '4' && !_ua.Mobile[0]){
                $section[liNum-2].addClass('end');
                setTimeout(function(e) {
                    // console.log(e);
                    startAnimation(liNum, old);
                },1000);
            }else{
                // 復帰予定
                // console.log($section[liNum-2]);
                $section[liNum-2].addClass('end').on('webkitTransitionEnd transitionend', function(e) {
                    // console.log(e);
                    startAnimation(liNum, old);
                });
            }
        }else{
            //skipの処理 & ２つ以上離れたセクション移動
            //resetClass(liNum-1);
            $('body').addClass('skip').on('webkitTransitionEnd transitionend', function(e) {
                if(e.originalEvent.propertyName=='width'){
                    $('body').removeClass('skip');
                    startAnimation(liNum, old);
                }
            });
        }
        animeFlag = false;
    }
    number = liNum;
}

function startScroll(n){
    startNextSection(n+1);
    return false;
}

var transitionEndFlags = {
    1: {

    },
    2: {
        'elm': '.copy'
    },
    3: {
        'elm': '#sec3_step5 .description'
    },
    4: {
        'elm': '#bg_end_4'
    },
    5: {
        'elm': '.effects .effect4 .img'
    },
    6: {
        'elm': '#sec6_more6',
        'property': 'box-shadow'
    },
    7: {
        'elm': '.standard .lineup1 .inner'
    },
    8: {
        'elm': '.line1 .item'
    },
    9: {
        'elm': '#bg_end_9'
    },
    // 10: {
    //     'elm': '#bg_end_10'
    // }
};

function changeScrollFlag(liNum){
    //console.log(transitionEndFlags[liNum]);
    if(typeof transitionEndFlags[liNum] !== 'undefined' && typeof transitionEndFlags[liNum].elm !== 'undefined'){
        $(transitionEndFlags[liNum].elm).on('webkitTransitionEnd transitionend', function(e) {
            // console.log(e.originalEvent.propertyName);
            if(typeof transitionEndFlags[liNum].property !== 'undefined'){
                if(e.originalEvent.propertyName === transitionEndFlags[liNum].property){
                    // console.log(e.originalEvent.propertyName);
                    scrollFlag = true;
                    $(this).off('webkitTransitionEnd transitionend');
                }
            }else{
                // console.log('property is undefined');
                scrollFlag = true;
                $(this).off('webkitTransitionEnd transitionend');
            }
        });
    }else{
        var delayTime = 1000;
        if(typeof transitionEndFlags[liNum] !== 'undefined' && typeof transitionEndFlags[liNum].delay !== 'undefined'){
            delayTime = transitionEndFlags[liNum].delay;
        }
        setTimeout(function(){
            scrollFlag = true;
        }, delayTime);
    }
}

$(window).on('load',function(){
	if(_ua.Mobile.iPhone){
		$('body').addClass('iphone');
	}
	if(_ua.Tablet){
		$('.container').addClass('tablet');
	}
	setTimeout(function(){
		$('#loading').removeClass('on');
		setTimeout(function(){
			$('#loading').addClass('off');
			setTimeout(function(){
				$('#loading').addClass('remove');
			},1000)
		},1000)
	},1000)
	// $('#opening').addClass('on');
	// $('#opening').on('webkitTransitionEnd transitionend', function(e) {
	// 	if(e.originalEvent.target.id=='opma'&&e.originalEvent.propertyName=='left'){
	// 		$('#opening').removeClass('on').addClass('off');
	// 	}
	// 	if(e.originalEvent.target.id=='opening'&&e.originalEvent.propertyName=='opacity'){
	// 		$('#opening,#loading').addClass('remove');
	// 	}
	// });
	if($('#voice').length){
		$('#totop').on('click',function(){
			var vOffset = $('#voice').offset().top;
			$('html,body').animate({
    			scrollTop: 0
    		},800,'swing');
    	return false;
		});
	}
});

$(window).on('load resize',function(e){
	wW = $(window).innerWidth();
	wH = $(window).height();

    var urlparam = location.search;

	wW_half = wW/2-1;
	$('#section1 .item,#section2 .bg .item,#section2 .cover .item,#section2 .cover .cover_ti,#section3 .cover .item').css('left',wW_half);
	if(wH<800){
		$('body').addClass('minH800');
	}else if(wH<700){
		// $('body').addClass('minH800');
	}else{
		$('body').removeClass('minH800');
	}

	movie_height = $('#play').innerHeight();

    if(_ua.PC || _ua.Tablet){
        if(e.type === 'load'){
            if(urlparam.match(/\?section=(\d+)$/)){
                var n = urlparam.match(/\?section=(\d+)$/);
                scrollFlag = false;
                touchFlag = false;
                startNextSection(n[1]);
                if(_ua.Tablet){
            		var h100per = $(window).innerHeight();
            		var w100per = $(window).innerWidth();
            		var h50per = h100per/2;
            		var w50per = w100per/2;

            		$('#section7 .bg2,#section7 .bg5,#section7 .bg6').css('border-top-width',h50per);
            		$('#section7 .bg1,#section7 .bg2,#section7 .bg3,#section7 .bg4,#section7 .bg5').css('border-bottom-width',h50per);
            	}
                return false;
            }
        }
        else if(e.type === 'resize' && number == 3 && reloadFlag){
            if(urlparam.match(/\?section=(\d+)$/)){
                location.reload();
            }else{
                location.href = './?section=3';
            }
            return false;

        }
    }else{
        if(e.type === 'load'){
            if(urlparam.match(/\?section=(\d+)$/)){
                var n = urlparam.match(/\?section=(\d+)$/);
                scrollFlag = false;
                touchFlag = false;
                startNextSection(n[1]);
                if(_ua.Mobile[0]){
            		var sec6_ti_h = $('#section6 .ti').height();
            		var wH_header = wH - 56;
            		var moreair_wrap_h = wH_header - sec6_ti_h;
            		var moreair_h = moreair_wrap_h/3;
            		$('.more_air li').css('height',moreair_h);
            	}
                return false;
            }
        }
    }

	if(_ua.Mobile[0]){
		var sec6_ti_h = $('#section6 .ti').height();
		var wH_header = wH - 56;
		var moreair_wrap_h = wH_header - sec6_ti_h;
		var moreair_h = moreair_wrap_h/3;
		$('.more_air li').css('height',moreair_h);
	}

	//sec7 triangle width & height
	if(_ua.Tablet){
		var h100per = $(window).innerHeight();
		var w100per = $(window).innerWidth();
		var h50per = h100per/2;
		var w50per = w100per/2;

		$('#section7 .bg2,#section7 .bg5,#section7 .bg6').css('border-top-width',h50per);
		$('#section7 .bg1,#section7 .bg2,#section7 .bg3,#section7 .bg4,#section7 .bg5').css('border-bottom-width',h50per);
	}
});
function animation(now){
    //console.log('now:' + now);
    if(now == 3){
        reloadFlag = true;
        if(_ua.Mobile[0]){
            scrollFlag = true;
        }
		$section3.addClass('start').on('webkitTransitionEnd transitionend', function(e) {
			if(e.originalEvent.target.id=='sec3_item'&&e.originalEvent.propertyName.match(/transform/)){
				$section3.addClass('step1');
			}
			if(e.originalEvent.target.id=='sec3_line'&&e.originalEvent.propertyName=='width'){
				$section3.addClass('step2');
			}
			if(e.originalEvent.target.id=='sec3_st1_point'&&e.originalEvent.propertyName=='opacity'){
				$('#sec3_step1').addClass('step1_st');
				animTimer = setTimeout(function(){
					$('#sec3_step1').addClass('step1_fin');
					$('#section3 h2').addClass('step_off');
				},3000);
			}
			if(e.originalEvent.target.id=='sec3_step1'&&e.originalEvent.propertyName=='opacity'){
				$section3.addClass('step3');
			}
			if(e.originalEvent.target.id=='sec3_item'&&e.originalEvent.propertyName=='margin-top'){
				$('#sec3_step2').addClass('step1_st');
			}
			if(e.originalEvent.target.id=='sec3_step2_description'&&e.originalEvent.propertyName=='opacity'){
				animTimer = setTimeout(function(){
					$('#sec3_item').addClass('step2_press');
					$('#sec3_step2').addClass('step2_st');
				},2000);
			}
			if(e.originalEvent.target.id=='sec3_step2_lock'&&e.originalEvent.propertyName=='opacity'){
				animTimer = setTimeout(function(){
					$('#sec3_step2').addClass('step3_st');
				},2000);
			}
			if(e.originalEvent.target.id=='sec3_step2_description'&&e.originalEvent.propertyName=='margin-top'){
				$('#sec3_step3').addClass('step1_st');
			}
			if(e.originalEvent.target.id=='sec3_step3_description'&&e.originalEvent.propertyName=='opacity'){
				animTimer = setTimeout(function(){
					$('#sec3_item').addClass('step3_anime_st');
					$('#sec3_line').addClass('step3_anime_st');
				},2000);
				animTimer = setTimeout(function(){
					$('#sec3_step3').addClass('step1_fin');
				},7500);
			}
			if(e.originalEvent.target.id=='sec3_step3_description'&&e.originalEvent.propertyName=='margin-top'){
				$('#sec3_step4').addClass('step1_st');
			}
			if(e.originalEvent.target.id=='sec3_step4_description'&&e.originalEvent.propertyName=='opacity'){
				animTimer = setTimeout(function(){
					$('#sec3_item').addClass('step3_anime_cut');
					$('#sec3_step4').addClass('step2_st');
					$('#sec3_line').addClass('step_stop');
				},3000);
			}
			if(e.originalEvent.target.id=='sec3_item'&&e.originalEvent.propertyName=='margin-left'){
				animTimer = setTimeout(function(){
					$('#sec3_step4').addClass('step2_fin');
					$('#sec3_line').addClass('step3_anime_fin');
					$section3.addClass('step3_5');
				},2000);
			}
			if(e.originalEvent.target.id=='sec3_line'&&e.originalEvent.propertyName=='left'){
				animTimer = setTimeout(function(){
					$section3.addClass('step4');
                    $('body').addClass('separate');
				},1000);
			}
			if(e.originalEvent.target.id=='sec3_item'&&e.originalEvent.propertyName=='left'){
				$('#sec3_item,#sec3_item_conventional').addClass('step4_anime_st');
			}
			if(e.originalEvent.target.id=='sec3_item_conventional'&&e.originalEvent.propertyName=='margin-top'){
				$('.animation5,.conventional').addClass('step1_st');
				animTimer = setTimeout(function(){
					$section3.addClass('step_last');
				},3000);
                reloadFlag = false;
                animeFlag = true;
			}
		});
	}
	if(now == 4){
		$('.paper .btn').on('click',function(){
			$section4.addClass('onPaper');
			setTimeout(function(){
				$section4.addClass('onPaperGo');
			},1000);
		});
		$('.gear .btn').on('click',function(){
			$section4.addClass('onGear');
			setTimeout(function(){
				$section4.addClass('onGearGo');
			},1000);
		});
		$('.modal .back').on('click',function(){
            // console.log("modalback");
            $(this).addClass('none');
            $section4.removeClass('onPaperGo onGearGo nextmodal');
            if(_ua.Mobile[0]){
                setTimeout(function(){
                    $section4.removeClass('onPaper onGear');
                    $('.modal .back').removeClass('none');
                    scrollFlag = true;
    			},10);
                noscroll();
            }else {
    			setTimeout(function(){
    				$section4.removeClass('onPaper onGear');
    				$('.modal .back').removeClass('none');
    			},1000);
            }
		});
		var chainNo = 1;
		setInterval(function(){
			$('.anime1 .parts_chain1').toggleClass('on');
		},200);
		setInterval(function(){
			$('.anime1 .parts_chain2').toggleClass('on');
		},200);
		setInterval(function(){
			if(chainNo=='4'){
				chainNo = 1;
			}
			$('.anime2 .parts_chain').removeClass('on');
			$('.anime2 .parts_chain'+chainNo).addClass('on');
			chainNo++;
		},300);

        $('.changeModal').off('click');
        $('.changeModal').on('click',function(e){
            e.stopPropagation();
            var modal = $(this).data('modal');
            modalChange(modal);
            return false;
    	});
        setTimeout(function(){
            animeFlag = true;
            // console.log('animeFlagAfter:'+animeFlag);
        },2500);
	}
	if(now == 5){
		$section[now-1].addClass('start').on('webkitTransitionEnd transitionend', function(e) {
			$section[now-1].addClass('step1');
            animeFlag = true;
		});
        $('#effect_close').on('click',function(){
            $('.effect_details').removeClass('eff1 eff2 eff3 eff4 on');
            scrollFlag = true;
            noscroll();
		});

        $('.changeSec5, .effects li').off('click');
        $('.changeSec5, .effects li').on('click', function(e){
            var detail;
            var typepager = false;
            if($(this).attr('class').match(/effect(\d){1}/)){
                detail = $(this).attr('class').match(/effect(\d){1}/);
                detail = detail[1];
            }
            else{
                detail = $(this).data('detail');
                typepager = true;
            }
            changeSec5(detail, typepager);
        });

		var slideTimerL;

		var vl_ul = $('#voice_list ul');
        initialValue = 0;
        vl_ul.css('left',initialValue);
        //clearInterval(slideTimerNext);
        $('#sec5_pager_prev').addClass('off');
        $('#sec5_pager_next').removeClass('off');

		$('#effect_close').on('click',function(){
			$('.effect_details').removeClass('eff1 eff2 eff3 eff4 on');
            $section[now-1].removeClass('open');
		});

        clearTimeout(slideTimer);
        $('#sec5_pager_prev, #sec5_pager_next').off('mouseenter mouseleave');
        $('#sec5_pager_prev, #sec5_pager_next').on('mouseenter', function(e){
            slideVoice(e.delegateTarget.className);
        }).on('mouseleave', function(){
            clearTimeout(slideTimer);
            return false;
        });
	}
	if(now == 6){
		$section[now-1].addClass('start').on('webkitTransitionEnd transitionend', function(e) {
			if(e.originalEvent.target.id=='sec6_more6'&&e.originalEvent.propertyName=='transform'){
				$section[now-1].addClass('step1');
			}
			if(e.originalEvent.target.id=='sec6_more6'&&e.originalEvent.propertyName=='left'){
				$section[now-1].addClass('step2');
			}
			animeFlag = true;
		});
	}
	if(now == 7){
		$section[now-1].addClass('start').on('webkitTransitionEnd transitionend', function(e) {
			if(e.originalEvent.target.id=='sec7_bg'&&e.originalEvent.propertyName=='opacity'){
				$section[now-1].addClass('step1');
			}
			animeFlag = true;
		});
	}
	if(now == 8){
		$section[now-1].addClass('start').on('webkitTransitionEnd transitionend', function(e) {
			if(e.originalEvent.target.id=='bg_end_8'&&e.originalEvent.propertyName=='width'){
				$section[now-1].addClass('step1');
			}
			animeFlag = true;
		});
	}
	if(now == 9){
		if(_ua.Mobile.iPhone||iPad){
			setTimeout(function(){
				$('#play').addClass('play');
				$('#close').addClass('on');
				setTimeout(function(){
					$('#play').addClass('none');
				},500);
			},1000);
		}

		animeFlag = true;
	}
	// if(now == 10){
	// 	$section[now-1].addClass('start').on('webkitTransitionEnd transitionend', function(e) {
	// 		if(e.originalEvent.target.id=='bg_end_10'&&e.originalEvent.propertyName=='width'){
	// 			$section[now-1].addClass('step1');
	// 		}
	// 		animeFlag = true;
	// 	});
	// }

}

//modal change
var modalflag = true;
function modalChange(modal){
    if(!modalflag) return false;
    modalflag = false;
    $section4.addClass('nextmodal');
    $('.nextmodal .detail_paper, .nextmodal .detail_gear').on('webkitTransitionEnd transitionend', function(e) {
        if(_ua.Mobile[0]){
            if(e.originalEvent.propertyName=='opacity'){
                $section4.removeClass('onPaperGo onGearGo');
                if(modal === 'gear'){
                    $section4.removeClass('onPaper').addClass('onGear onGearGo').removeClass('nextmodal');
                }else if(modal === 'paper'){
                    $section4.removeClass('onGear').addClass('onPaper onPaperGo').removeClass('nextmodal');
                }
                $('#section4 *').off('webkitTransitionEnd transitionend');
            }
        }else {
            if(e.originalEvent.propertyName=='margin-left'){
                $section4.removeClass('onPaperGo onGearGo');
                if(modal === 'gear'){
                    $section4.removeClass('onPaper nextmodal').addClass('onGear onGearGo');
                }else if(modal === 'paper'){
                    $section4.removeClass('onGear nextmodal').addClass('onPaper onPaperGo');
                }
                $('.nextmodal .detail_paper, .nextmodal .detail_gear').off('webkitTransitionEnd transitionend');
            }

        }
    });
    setTimeout(function(){
        if(!modalflag) modalflag = true;
    }, 1100);
}

//section5
function changeSec5(detail, typepager){
    if(typeof detail === 'undefined') return false;
    var $effectsli = $('.effects li').eq(detail-1);
    var check = $effectsli.hasClass('on');
    var cln = 'open';
    if(typepager) cln += ' typepager';
    $section5.addClass(cln);

    if(!typepager)
        $section5.removeClass('typepager');

    if(!_ua.Mobile[0]){
        if(check){
            $('body').removeClass('section5_more');
            $('.effects li').removeClass('on off');
            $('.effect_details').removeClass('on eff1 eff2 eff3 eff4');
            $section5.removeClass('open');
            removeDraw();
        }else{
            $('body').addClass('section5_more');
            $('.effects li').not($effectsli).addClass('off').removeClass('on');
            $effectsli.addClass('on').removeClass('off');
            $('.effect_details').addClass('on');
            $('.effect_details').removeClass('eff1 eff2 eff3 eff4');
            $('.effect_details').addClass('eff' + detail);

            if(detail == 3){
                setTimeout(function(){
                    draw();
                }, 1200);
            }else{
                removeDraw();
            }
        }
    }else{
        if(detail == 4){
            location.href = 'voice.html';
            return false;
        }else{
            $section5.addClass(cln);
            scrollFlag = false;
            if(_ua.Mobile[0]){
                inscrollFlag = true;
            }
            onscroll();
            $('.effect_details').addClass('on');
            $('.effect_details').removeClass('eff1 eff2 eff3 eff4');
            setTimeout(function(){
                $('.effect_details').addClass('eff' + detail);
            },10);
        }

        // if(check2=='effect1'){
        //     $('.effect_details').addClass('on');
        //     setTimeout(function(){
        //         $('.effect_details').addClass('eff1');
        //     },100)
        // }else if(check2=='effect2'){
        //     $('.effect_details').addClass('on');
        //     setTimeout(function(){
        //         $('.effect_details').addClass('eff2');
        //     },100)
        // }else if(check2=='effect3'){
        //     $('.effect_details').addClass('on');
        //     setTimeout(function(){
        //         $('.effect_details').addClass('eff3');
        //     },100)
        // }else if(check2=='effect4'){
        //     location.href = 'voice.html';
        //     return false;
        // }else if(check2=='close'){
        //     $('.effect_details').removeClass('eff1 eff2 eff3 eff4 on');
        // }
        //
    }
}

//ユーザーの声
$(window).on('resize', function(){
    ed4w = ed4.width();
    vl_ed4_diff = vl_ul_width - ed4w;
    maxSlidepoint = parseInt(vl_ed4_diff + 200);
    checkPager();
});

// console.log(ed4w);
// console.log(vl_ul_width);
// console.log(vl_ed4_diff);
// console.log(maxSlidepoint);

function slideVoice(dir){

    if(typeof dir === 'undefined'){
        dir = 'next';
    }
    if(dir === 'next'){
        initialValue -= 20;
    }else{
        initialValue += 20;
    }

    //pager show or hide
    checkPager();

    if((dir === 'next' && Math.abs(initialValue) > maxSlidepoint) || (dir === 'prev' && Math.abs(initialValue) <= 0)){
        clearTimeout(slideTimer);
        return false;
    }
    vl_ul.css('left',initialValue);



    slideTimer = setTimeout(function(){
        slideVoice(dir);
    }, 100);
}

function checkPager(){
    //pager show or hide
    if(Math.abs(initialValue) > 0){
        $('#sec5_pager_prev').removeClass('off');
    }else{
        $('#sec5_pager_prev').addClass('off');
    }
    if(Math.abs(initialValue) >= maxSlidepoint){
        $('#sec5_pager_next').addClass('off');
    }else{
        $('#sec5_pager_next').removeClass('off');
    }
}


function resetClass(now){
    clearTimeout(animTimer);
    clearTimeout(slideTimer); //section5 users voice slider
    if(ytPlayer){
        var moviestatus = ytPlayer.getPlayerState();
        if(moviestatus === 1){
            ytPlayer.stopVideo();
            $('#play').removeClass('none play');
        }
    }
    if(stage)
        removeDraw();
    //console.log('reset not #section:' + now);
	//$('.section:not(:eq('+now+'))').removeClass(function(index, className) {
    //$('#section' + now).removeClass(function(index, className) {
    $('.section').not('#section' + now).removeClass(function(index, className) {
		var classList = (className.match(/\b(step|onPaper|onGear|open|typepager)\S*/g) || []);
		classList.push('on start end');
        // console.log(classList);
	    return classList.join(' ');
	});

    if(_ua.Mobile[0]){
        $('.more_modal_inner').removeClass().addClass('more_modal_inner');
        $('.more_modal_wrap').removeClass().addClass('more_modal_wrap');
    }

    //section内の不要なclassを削除
    $('#section5 *, #section7 *, #section3 *').not('#sec5_pager_prev, #sec5_pager_next').removeClass(function(index, className) {
	//$('#section'+ now +' *').not('#sec5_pager_prev, #sec5_pager_next').removeClass(function(index, className) {
		var classList = (className.match(/\b(step\S*|eff[0-9]{1}|(on|off)\s*)/g) || []); //step~ eff[0-9]{1} on off
		classList.push();
	    return classList.join(' ');
	});
	$('*').off('webkitTransitionEnd transitionend');
}
function here(n){
	$('body').removeClass();
	$('body').addClass('section'+n);
    $('#sidenav li').removeClass('on');
    $('#sidenav li').eq(n-1).addClass('on');
}

// MOVIE
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var ytPlayer;

function onPlayerStateChange(event) {
    var ytStatus = event.data;
    if (ytStatus == YT.PlayerState.ENDED) {
		$('#play').removeClass('none');
		setTimeout(function(){
			$('#play').removeClass('play');
		},500);
    }
	if (ytStatus == YT.PlayerState.PAUSED) {
		$('#close').addClass('on');
		$('#play').removeClass('play');
		setTimeout(function(){
			$('#play').removeClass('none');
		},500);

    }
}

function onYouTubeIframeAPIReady() {
    var movieW = 800,
        movieH = 450;
	if(_ua.Mobile[0]){
        movieW = '100%';
        movieH = movie_height;
	}
    ytPlayer = new YT.Player(
        'movie',
        {
            width: movieW,
            height: movieH,
            videoId: 'R9dWYTi-Law',
            playerVars: {
                rel : 0
            },
            events: {
               'onStateChange': onPlayerStateChange
           }
        }
    );
}
$(function(){
	$('#play').on('click',function() {
        ytPlayer.playVideo();
		$(this).addClass('play');
		$('#close').addClass('on');
		setTimeout(function(){
			$('#play').addClass('none');
		},500);
    });
	$('#close').on('click',function() {
		$(this).addClass('on');
		$('#play').removeClass('none');
		ytPlayer.pauseVideo();
		setTimeout(function(){
			$('#play').removeClass('play');
			$('#close').removeClass('on');
		},500);
    });
});


$.fn.hasClass = function (e)
{
    var t = " " + e + " ", n = 0, r = this.length;
    for (; r > n; n++)
    {
        if (1 === this [n].nodeType && (" " + this [n].className + " ").replace(/\W/, " ").indexOf(t) >= 0) {
            return!0;
        } else if (  (e instanceof RegExp) && 1 === this [n].nodeType && (" " + this [n].className + " ").replace(/\W/, " ").match(e) ){
             return true;
        }
        return!1;
    }
}

//デバイスの向き
if(_ua.Mobile[0]){
	var isLandscape = function(){
		if (window.innerHeight > window.innerWidth) {
			$('#alert').addClass('remove');
            $(window).off('scroll.onalert touchmove.onalert');

		}else{
			$('#alert').removeClass('remove');
            var $fixed = $('#alert');
            $(window).on('scroll.onalert touchmove.onalert', null, function() {
              $fixed.css('transform', 'translateY(' + window.scrollY + 'px)')
            });
		}
	}
	$(window).resize(function(){
		isLandscape();
	});
	isLandscape();
}
