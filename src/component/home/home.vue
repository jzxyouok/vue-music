<template>
    <div class="content-warper">
       <!-- <div class="menu">菜单</div>
        <div class="search">搜索</div>-->
        <menu></menu>
        <search ></search>
        <div class="swiper-pagination nav" slot="pagination" v-show="!SearchState">
        </div>
        <swiper :options="swiperOption" class="swiper-box" v-show="!SearchState">
            <swiper-slide class="swiper-item">
                <my></my>
            </swiper-slide>
            <swiper-slide class="swiper-item">
                <Recommend></Recommend>
            </swiper-slide>
            <swiper-slide class="swiper-item">
                <song-type></song-type>
            </swiper-slide>
        </swiper>
        <play></play>
    </div>
</template>
<script>
    import {
            swiper,
            swiperSlide
    } from 'vue-awesome-swiper'
    import  Recommend from '../Recommend/Recommend.vue'
    import  my from '../my/my.vue'
    import  songType from '../songType/songType.vue'
    import menu from '../menu/menu.vue'
    import search from '../search/search.vue'
    import play from '../play/play.vue'
    import store from '../../vuex/store'
    import {change_actions} from '../../vuex/actions'
    import {GETTERS} from '../../vuex/getters'
    const LIST_NAME = ['我的','推荐','分类']
    export default{
        name: "home",
        components: {
            Recommend,
            my,
            songType,
            swiper,
            swiperSlide,
            menu,
            search,
            play
        },
        store,
        data(){
            return {
                name: "进入首页",
                isSearch:false,
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    paginationBulletRender: function (swiper, index, className) {
                        return '<div class="' + className + '">' + LIST_NAME[index] + '</div>';
                    }
                }
            }
        },
        vuex:{
            actions:{
                change:change_actions.changeSearch
            },
            getters: {
                // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
                SearchState: GETTERS.getSearch,
            }
        }
    }
</script>
<style lang="sass" >
    .nav{
        width: 80%;
        background-color: #ff8833;
        overflow:hidden;
        display: flex;
        justify-content: flex-end;
        margin-left:10%;
        span{
            flex: 1;
            text-align: center;
            font-size: 2.667rem;
        }
        div{
            height: 2.667rem;
            width: 2.667rem;
        }
        .swiper-pagination-bullet-active{
            background-color:inherit ;
            opacity: 1;
        }
    }
    .swiper-pagination>div {
        height: 2.333rem;
        line-height: 235%;
        width: 25%;
        border-radius: 0;
        color: white;
        flex: 1;
        background-color:inherit ;
        opacity: 0.6;
    }

</style>