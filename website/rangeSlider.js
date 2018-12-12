var hours1 = 9;
var hours2 = 0;
var minutes1 = 17;
var minutes2 = 0;
$("#slider-range").slider({
    range: true,
    min: 0,
    max: 1440,
    step: 15,
    values: [540, 1020],
    slide: function (e, ui) {
        hours1 = Math.floor(ui.values[0] / 60);
        minutes1 = ui.values[0] - (hours1 * 60);

        if (hours1.length == 1) hours1 = '0' + hours1;
        if (minutes1.length == 1) minutes1 = '0' + minutes1;
        if (minutes1 == 0) minutes1 = '00';


        $('.slider-time').html(hours1 + ':' + minutes1);

        hours2 = Math.floor(ui.values[1] / 60);
        minutes2 = ui.values[1] - (hours2 * 60);
	
        if (hours2.length == 1) hours2 = '0' + hours2;
        if (minutes2.length == 1) minutes2 = '0' + minutes2;
        if (minutes2 == 0) minutes2 = '00';


        $('.slider-time2').html(hours2 + ':' + minutes2);
    }
});
