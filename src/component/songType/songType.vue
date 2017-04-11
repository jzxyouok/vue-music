<template>
    <div class="songType">
        <ul v-show="show">
            <li id="19" @click="searchType($event)">
                <div>摇滚</div>
            </li>
            <li id="18" @click="searchType($event)">
                <div>民谣</div>
            </li>
            <li id="3" @click="searchType($event)">
                <div>欧美</div>
            </li>
            <li id="5" @click="searchType($event)">
                <div>内地</div>
            </li>
            <li id="6" @click="searchType($event)">
                <div>港台</div>
            </li>
            <li id="16" @click="searchType($event)">
                <div>韩国</div>
            </li>
            <li id="17" @click="searchType($event)">
                <div>日本</div>
            </li>
            <li id="26" @click="searchType($event)">
                <div>热歌</div>
            </li>
        </ul>
        <div class="result_content" v-show="!show">
            <div @click="back" class="back_text">返回</div>
            <div class="result" v-for="song in songs" @click="play({imgUrl:song.albumpic_small,voiceUrl:song.url,songName:song.songname,singer:song.singername})">
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
        name: "myvue",
        components: {},
        data(){
            return {
                name: "歌曲分类",
                songs:[],
                show:true
            }
        },
        methods:{
            searchType(event){
                this.$http.get(`https://route.showapi.com/213-4?showapi_appid=33436&topid=${event.target.id?event.target.id:$(event.target).parent()[0].id}&showapi_timestamp=&showapi_sign=55504d2c49514f17b19d7a6a42acb401`).then((response) => {
                    console.log(response.data)
                    this.songs = response.data.showapi_res_body.pagebean.songlist
                    this.show = false;
                }).catch(function(response) {
                    console.log(response);
                    alert('您选择的歌曲已经下架');
                });

            },
            back(){
                this.show = true;
            }
        },
        vuex:{
            getters:{
                typeState: GETTERS.getType
            },
            actions:{
                change:change_actions.changeSearch,
                play:change_actions.changePlay
            }
        }
    }
</script>
<style lang="sass">
    .songType{
        height: 37.8rem;
        overflow-y: auto;

        margin-top: 3rem;
        ul{
            flex-wrap: wrap;
            justify-content: space-around;
            display: flex;
            li{
                background: url("./img/rock.jpg") no-repeat;
                background-size: cover;
                margin-bottom: 0.667rem;
                width: 10.667rem;
                height: 10.667rem;
                align-items: center;
                justify-content: space-around;
                display: flex;
                div{
                    color: #FFFFFF;
                    font-size: 1.333rem;
                    margin-top: 1.333rem;
                }
            }
            li:nth-child(2){
                background-image: url("./img/folk.jpg");
            }
            li:nth-child(3){
                background-image: url("./img/ouzhou.jpg");
            }
        }
        .result_content{
            height: 37.067rem;
            overflow-y:auto;
            .back_text{
                color: darkgoldenrod;
                margin:0.667rem 0 0 0.667rem;
            }
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