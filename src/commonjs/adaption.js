/**
 * Created by dell on 2017/3/10.
 */
$(function(){
    $(window).resize(infinite);
    function infinite() {
        var $html =  $('html');
        var htmlWidth =$html.width();
            $html.css({
                "font-size" :  28.8 / 720 * htmlWidth + "px"
            });
    }infinite();
});
