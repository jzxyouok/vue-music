/**
 * Created by dell on 2017/3/10.
 */
$(function(){
    $(window).resize(infinite);
    function infinite() {
        var $html =  $('html');
        var htmlWidth =$html.width();
        var html_fontsize = 28.8 / 720 * htmlWidth;
        $html.css({
            "font-size" :  28.8 / 720 * htmlWidth + "px"
        });
        if(html_fontsize == parseInt(getComputedStyle($html[0]).fontSize)){
            return;
        }
        else {
            var t_fs = html_fontsize/(parseInt(getComputedStyle($html[0]).fontSize)/html_fontsize);
            $html.css({
                "font-size" :t_fs+'px'
            });
        }
    }infinite();
});