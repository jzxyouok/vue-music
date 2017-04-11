/**
 * Created by dell on 2017/3/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    //主界面切换状态是否是搜索界面
    isSearch:false,
    nowPlay:{
        state:false,
        curr_index:0,
        detail:[]
    },
    isPlay:false,
    isType:true
}
const mutations = {
    //设置搜索界面状态
    SearchState (state) {
        state.isSearch?state.isSearch = false:state.isSearch = true;
    },
    typeState (state) {
        state.isType?state.isType = false:state.isType = true;
    },
    playState(state,songDetail){
        state.nowPlay.state = true;
        state.nowPlay.curr_index = 0;
        state.nowPlay.detail.unshift (songDetail);
      /* .imgUrl = songDetail.imgUrl;
        state.nowPlay.detail.voiceUrl = songDetail.voiceUrl;
        state.nowPlay.detail.songName = songDetail.songName;
        state.nowPlay.detail.singer = songDetail.singer;*/
    },
    toggle_play(state,index){
        state.nowPlay.curr_index = index;
        state.nowPlay.state = true;
    },
    NEXT(state){
        state.nowPlay.curr_index == state.nowPlay.detail.length - 1?state.nowPlay.curr_index = state.nowPlay.detail.length - 1:state.nowPlay.curr_index += 1;

    },
    PRE(state){
        state.nowPlay.curr_index != 0?state.nowPlay.curr_index -= 1:state.nowPlay.curr_index = 0;
    },
    PLAYSTATE(state){
        state.isPlay = true;
    }
}
export default new Vuex.Store({
    state,
    mutations
})