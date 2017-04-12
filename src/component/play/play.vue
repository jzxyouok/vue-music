<template>
    <div class="play" v-if="playState">
        <div class="play_nav">
            <div class="play_nav_progress">
                <div class="progress_value"></div>
            </div>
            <div class="play_nav_detail"  @click="showContent">
                <div class="left">
                    <img :src="NowPlay.detail[[NowPlay.curr_index]].imgUrl" alt="">
                    <div class="text">
                        <div class="songName">{{NowPlay.detail[NowPlay.curr_index].songName}}</div>
                        <div class="author">{{NowPlay.detail[NowPlay.curr_index].singer}}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="list_button" @click.stop="showList" >清单</div>
                    <div class="control"@click.stop="start" >暂停</div>
                </div>
            </div>
            <div class="list"  :class="{'showList':listState}">
                <div class="list_head">
                    <div class="list_text">播放列表</div>
                    <span class="list_delete" @click="showList">收起</span>
                </div>
                <div class="list_content">
                    <div class="song" v-for="song in NowPlay.detail" @click="play_index($index)">
                        <span class="song_name">{{song.songName}}-{{song.singer}}</span>
                        <!--<span class="singer"></span>-->
                        <span>X</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="play_content" :class="{'showContent':contentState}">
            <div class="back" @click="showContent">
                返回
            </div>
            <div class="text">
                <span class="songName">{{NowPlay.detail[[NowPlay.curr_index]].songName}}</span>
               <!-- <span class="author">{{NowPlay.detail[[NowPlay.curr_index]].singer}}</span>-->
            </div>
            <div class="voice">
                <div class="voice_bg">
                    <div class="voice_curr">
                    </div>
                </div>
            </div>
            <div class="play_img">
                <img :src="NowPlay.detail[[NowPlay.curr_index]].imgUrl" alt="" id="play_img_bg">
            </div>
            <div class="play_time">
                <input class="currentTime"  v-model="currentTime">
                <div class="progress">
                    <div class="progress_curr"></div>
                </div>
                <div class="total_time"></div>
            </div>
            <div class="control">
                <div class="previous" @click="pre">上一曲</div>
                <div class="pause" @click="start">暂停</div>
                <div class="next" @click="next">下一曲</div>
            </div>
        </div>
        <audio controls="controls" autoplay="autoplay" id="audio" style="display: none;" :src="NowPlay.detail[NowPlay.curr_index].voiceUrl" v-on:timeupdate="realtime">
            <source src="" id="source">
        </audio>

    </div>
</template>
<script>
    import {change_actions} from '../../vuex/actions'
    import {GETTERS} from '../../vuex/getters'
    export default{
        name: "play",
        components: {},
        data(){
            return {
                name: "zhouwei",
                listState:false,
                contentState:false,
                currentTime:''
            }
        },
        methods:{
            showList(){
                this.listState?this.listState = false:this.listState = true;
            },
            showContent(){
                this.contentState?this.contentState = false:this.contentState = true;
            },
            start: function () {
                var audio = document.querySelector('audio');
                if(audio.paused){
                    audio.play();
                    $(".control .pause").text('暂停')
                    $(".play_nav .control").text('暂停')
                    $(".play_img").css("animation-play-state", "running")
                }
                else {
                    audio.pause()
                    $(".control .pause").text('播放');
                    $(".play_nav .control").text('播放');
                    $(".play_img").css("animation-play-state", "paused")
                }
            },
            realtime:function () {
                //计时
                var m,
                    s,
                    t_m,
                    t_s,
                    sCurrentTime = document.querySelector('audio').currentTime,
                    sDuration = document.querySelector('audio').duration,
                    in_curr_progress,
                    out_curr_progress,
                    total_time;
                m = Math.floor(sCurrentTime/ 60);
                s = Math.floor(sCurrentTime % 60);
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
                this.currentTime = m + ":" + s;
                //进度条
                in_curr_progress = ( Math.floor(sCurrentTime)/Math.floor(sDuration))*$(".play_time .progress").width();
                out_curr_progress = ( Math.floor(sCurrentTime)/Math.floor(sDuration))*$(".play_nav .play_nav_progress").width();
                $(".play_time .progress_curr").width(in_curr_progress);
                $(".play_nav_progress .progress_value").width(out_curr_progress);
                //总时间
                t_m = Math.floor(sDuration / 60);
                t_s = Math.floor(sDuration % 60);
                t_m = t_m < 10 ? '0' + t_m : t_m;
                t_s = t_s < 10 ? '0' + t_s : t_s;
                total_time =  t_m + ":" + t_s;
                $(".play_time .total_time").text(total_time);
            }
        },
        computed:{
          /*  NowPlay(){return this.$store.state.nowPlay}*/
        },
        vuex:{
            actions:{
                change:change_actions.changeSearch,
                play_index: change_actions.change_index,
                next:change_actions.change_next,
                pre:change_actions.change_pre
            },
            getters: {
                NowPlay: GETTERS.getNowPlay,
                SearchState:GETTERS.getSearch,
                playState:GETTERS.getPlayState
            }
        }
    }
</script>
<style lang="sass">
    .play{
        width: 100%;
        .play_nav{
            position: fixed;
            bottom: 0;
            z-index: 2010;
            width: 100%;
            height: 3.667rem;
            background-color: rgba(122,222,311,0.54);
            .list{
                height: 26.667rem;
                width: 100%;
                background-color: white;
                position: absolute;
                bottom: -26.667rem;
                transition:all 0.5s ease;
                .list_head{
                    height: 2.667rem;
                    line-height: 2.667rem;
                    font-size: 1.333rem;
                    text-align: center;
                    border-bottom: 0.067rem solid silver;
                    .list_delete{
                        position: absolute;
                        right: 0.667rem;
                        top: 0;
                        font-size: 1rem;
                    }
                }
                .list_content{
                    height: 23.933rem;
                    overflow-y: auto;
                    .song{
                        height: 2rem;
                        border-bottom: 1px solid silver;
                        span{
                            display: inline-block;
                            margin-top: 0.333rem;
                        }
                        span:nth-child(1){
                            margin-left:1.333rem;
                            width: 14rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                       /* span:nth-child(2){
                            font-size: 0.667rem;
                            color: silver;
                        }*/
                        span:nth-child(2){
                            float: right;
                            margin-right: 0.667rem;
                        }
                    }
                }
            }
            .showList{
                bottom: 3.667rem;
            }
            img{
                width: 2.667rem;
                height: 2.667rem;
                border-radius: 1.333rem;
            }
            .play_nav_progress{
                width: 100%;
                background-color: lightpink;
                height:0.2rem;
                position: relative;
                .progress_value{
                    position: absolute;
                    width: 0;
                    background-color: crimson;
                    height: 0.2rem;
                }
            }
             .play_nav_detail{
                 overflow: hidden;
                 height: 100%;
                 .left{
                     float: left;
                     margin-top:0.333rem;
                     margin-left:0.333rem;
                     img,.text{
                         float: left;
                     }
                     img{
                         margin-right:0.4rem;
                     }
                     .text{
                         .songName{
                             width: 14rem;
                             overflow: hidden;
                             text-overflow: ellipsis;
                             white-space: nowrap;
                         }
                         .author{
                             width: 14rem;
                             overflow: hidden;
                             text-overflow: ellipsis;
                             white-space: nowrap;
                         }
                     }
                 }
                 .right{
                     float: right;
                     margin-top:0.667rem;
                     margin-right:1.333rem;
                     .list_button,.control{
                         float: left;
                     }
                     .list_button{
                         margin-right: 1.333rem;
                     }
                 }
             }
        }
        .play_content{
            width: 100%;
            height:100%;
            background-color: antiquewhite;
            position: fixed;
            bottom: 44.467rem;
            transition: all .3s ease;
            z-index: 3000;
            .back{
                position: absolute;
                left: 0.667rem;
                top: 0.667rem;
                font-size: 1.333rem;
                color: gray;
            }
            .text{
                margin-top: 0.667rem;
                display: flex;
                justify-content: center;
                span:nth-child(1){
                    width: 10rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                }
                span:nth-child(2){
                   /* width: 4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;*/
                }
            }
            .voice{
                position: relative;
                width: 20rem;
                height: 0.333rem;
                z-index:3001;
                margin:0 auto;
                margin-top:3.333rem;
                .voice_bg{
                    background-color:wheat;
                    position: relative;
                    z-index:3001;
                    width: 100%;
                    height: 100%;
                }
                .voice_curr{
                    background-color: red;
                    position: relative;
                    height: 100%;
                    width: 6.667rem;
                    z-index:3001;
                }
            }
            .play_img{
                width: 18.667rem;
                height: 18.667rem;
                background:url('./img/timg.png') no-repeat;
                background-size:cover;
                margin: 0 auto;
                margin-top: 2.667rem;
                animation: circle_top 12s linear 0s forwards;
                -webkit-animation: circle_top 12s linear 0s forwards;
                animation-iteration-count: infinite;
                -webkit-animation-iteration-count: infinite;
                animation-play-state: running;
                -webkit-animation-play-state: running;
                display:flex;
                justify-content: center;
                align-items:center;
                #play_img_bg{
                    width: 11.333rem;
                    height:11.333rem;
                    border-radius: 50%;
                }
            }
            @keyframes circle_top {
                form {
                    transform: rotateZ(0deg);
                }
                to {
                    transform: rotateZ(360deg);
                }
            }
            @-webkit-keyframes circle_top {
                form {
                    transform: rotateZ(0deg);
                }
                to {
                    transform: rotateZ(360deg);
                }
            }
            .play_time{
                margin-top: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height:3.333rem;
                width:100%;
                .currentTime{
                    width: 3.333rem;
                    background-color: antiquewhite;
                    text-align: center;
                }
                .progress{
                    width: 16.667rem;
                    height: 0.266rem;
                    background-color: wheat;
                    .progress_curr{
                        width: 0;
                        background-color: #bf616a;
                        height: 100%;
                    }
                }
                .total_time{
                    width: 3.333rem;
                    text-align: center;
                }
            }
            .control{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0 auto;
                width: 20rem;
                height: 4rem;
                .previous,.pause,.next{
                    font-size: 1.333rem;
                }
                .previous{
                }
                .pause{
                }
                .next{
                }
            }
        }
        .showContent{
            bottom: 0;
        }
    }
</style>