<template>
    <div class="Recommend">
        <swiper  class="swiper-box" :options="swiperOption" >
            <swiper-slide class="swiper-item">
                <div>
                    <img src="./img/banner3.png" alt="" >
                </div>
            </swiper-slide>
            <swiper-slide class="swiper-item">
                <div>
                    <img src="./img/banner4.png" alt="" >
                </div>
            </swiper-slide>
            <swiper-slide class="swiper-item">
                <div>
                    <img src="./img/banner5.png" alt="" >
                </div>
            </swiper-slide>
            <swiper-slide class="swiper-item">
                <div>
                    <img src="./img/banner6.png" alt="" >
                </div>
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination-child"  slot="pagination"></div>
        <ul class="personality">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div style="margin: 0.667rem 0 0 0.667rem">为你推荐</div>
        <div class="rContent">
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
    import {
            swiper,
            swiperSlide
    } from 'vue-awesome-swiper'
    export default{
        name: "Recommend",
        components: {
            swiper,
            swiperSlide
        },
        data(){
            return {
                name: "推荐",
                swiperOption:{
                    pagination: '.swiper-pagination-child',
                    paginationClickable: true,
                    autoplay: 1000,
                },
                songs:[]
            }
        },
        ready(){
            this.$http.get(`https://route.showapi.com/213-4?showapi_appid=33436&topid=17&showapi_timestamp=&showapi_sign=55504d2c49514f17b19d7a6a42acb401`).then((response) => {
                console.log(response.data)
                this.songs = response.data.showapi_res_body.pagebean.songlist
                this.show = false;
            }).catch(function(response) {
                console.log(response)
            });
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
<style lang="sass" >
    @import "Recommend.scss";
</style>