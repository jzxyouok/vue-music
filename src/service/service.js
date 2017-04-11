/**
 * Created by dell on 2017/3/14.
 */
export default {
    //歌曲分类接口
    getStyleSongs:function () {
        Vue.$http.get('https://route.showapi.com/213-1?keyword=海阔天空&page=1&showapi_appid=33436&showapi_timestamp=&showapi_sign=55504d2c49514f17b19d7a6a42acb401').then((response) => {
            console.log(response.data)
        }).catch(function(response) {
            console.log(response)
        });
    }
}