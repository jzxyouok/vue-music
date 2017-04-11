<template>
    <div class="search" @click="change">
    </div>
    <div class="search_content" v-show="SearchState" >
        <div class="search_head">
            <span @click="change">返回</span>
            <span>搜索</span>
        </div>
        <div class="search_wrap">
            <span>
                <input type="text" id="search" name="" value="" placeholder="搜索歌曲、歌手..."  autofocus>
            </span>
            <button type="button" name="button" @click='search' id="button">
                <i class="mintui mintui-search">搜索</i>
            </button>
        </div>
        <div class="result_content" id="result_content">
            <div class="result" v-for="song in searchSongs" @click="play({imgUrl:song.albumpic_small,voiceUrl:song.m4a,songName:song.songname,singer:song.singername})">
                <div class="result_left">
                    <img :src="song.albumpic_small" alt="">
                    <div class="text">
                        <div>{{song.singername}}</div>
                        <div>{{song.songname}}-{{song.albumname}}</div>
                    </div>
                </div>
                <div class="result_right">
                    mv
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {change_actions} from '../../vuex/actions'
    import {GETTERS} from '../../vuex/getters'
    export default{
        name: "search",
        components: {},
        props: ['isSearch'],
        data(){
            return {
                name: "搜索",
                mySearch:false,
                searchSongs:null,
                page:1
            }
        },
        ready:function () {
            var $result_content =  $("#result_content");
            var _that = this;
            $result_content.scroll(function (e) {
                if (e.target.scrollTop + e.target.offsetHeight>= e.target.scrollHeight - 1) {
                    _that.$http.get(`https://route.showapi.com/213-1?keyword=${document.querySelector('#search').value}&page=${_that.page++}&showapi_appid=33436&showapi_timestamp=&showapi_sign=55504d2c49514f17b19d7a6a42acb401`).then((response) => {
                        console.log(response.data)
                        _that.searchSongs = _that.searchSongs.concat(response.data.showapi_res_body.pagebean.contentlist);
                    }).catch(function(response) {
                        console.log(response)
                    });
                }
            })
        },
        methods:{
            search(){
                this.page = 1;
                $("#result_content")[0].scrollTop = 0;
                this.$http.get(`https://route.showapi.com/213-1?keyword=${document.querySelector('#search').value}&page=1&showapi_appid=33436&showapi_timestamp=&showapi_sign=55504d2c49514f17b19d7a6a42acb401`).then((response) => {
                    console.log(response.data)
                    this.searchSongs = response.data.showapi_res_body.pagebean.contentlist
                }).catch(function(response) {
                    console.log(response)
                });
            },
            back(){

            }
            /*,
            play(songDetail){
                console.log(songDetail)
            }*/
        },
        vuex: {
            actions:{
                change:change_actions.changeSearch,
                play:change_actions.changePlay
            },
            getters:{
                SearchState:GETTERS.getSearch,
            }
        }
    }
</script>
<style lang="sass">
    .search{
        position: absolute;
        width: 10%;
        height: 2.333rem;
        z-index: 1111;
        right: 0;
        background: url("./img/search.png") no-repeat;
        background-size: 60%;
        background-position: center;
        background-color: #ff8833;
    }
    .search_content{
        width: 100%;
        height: 44.467rem;
        background-color: gainsboro;
        position: relative;
        z-index: 2005;
        .search_head{
            width: 100%;
            height: 2.333rem;
            opacity: 1;
            text-align: center;
            line-height: 2.333rem;
            font-size: 1.333rem;
            display: flex;
            color: white;
            justify-content: center;
            background-color: #ff8833;
            span:nth-child(1){
                text-align: left;
                margin-left: 0.667rem;
            }
            span:nth-child(2){
                flex-grow: 1;
                margin-left: -2.667rem;
            }
        }
        .search_wrap{
            padding-left: 5rem;
            margin-top: 2.667rem;
        }
        .result_content{
            height: 37.067rem;
            overflow-y:auto;
            .result{
                overflow:hidden;
                padding:1.333rem;
            .result_left{
                float: left;
            img,.text{
                float: left;
            }
            .text{
                font-size: 1rem;
                div:nth-child(1){
                    color: coral;
                }
                div:nth-child(2){
                    margin-top: 0.333rem;
                    width: 13.333rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    font-size: 0.667rem;
                }
            }
            img{
                width: 2.667rem;
                height: 2.667rem;
                margin-right: 0.667rem;
            }
            }
            .result_right{
                float: right;
            }

            }
        }

    }

</style>