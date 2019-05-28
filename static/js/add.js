$(function(){
    var btn_lineup1 = $('#btn_lineup1');
    var btn_lineup2 = $('#btn_lineup2');
    var btn_lineup3 = $('#btn_lineup3');
    var btn_lineup4 = $('#btn_lineup4');
    var btn_lineup5 = $('#btn_lineup5');
    var btn_lineup6 = $('#btn_lineup6');

    btn_lineup1.on('click',function(){
        $('#section7').addClass('step2').removeClass('step1 step3');
    });
    btn_lineup2.on('click',function(){
        $('#section7').addClass('step1 done').removeClass('step2 step3');
    });
    btn_lineup3.on('click',function(){
        $('#section7').addClass('step3').removeClass('step1 step2');
    });
    btn_lineup4.on('click',function(){
        $('#section7').addClass('step3').removeClass('step1 step2');
    });
    btn_lineup5.on('click',function(){
        $('#section7').addClass('step2').removeClass('step1 step3');
    });
    btn_lineup6.on('click',function(){
        $('#section7').addClass('step1 done').removeClass('step2 step3');
    });

});
