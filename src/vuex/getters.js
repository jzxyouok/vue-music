/**
 * Created by dell on 2017/3/10.
 */

/*export const getSearch = state => state.isSearch;*/
export const GETTERS = {
    getSearch(state){
       return state.isSearch
    },
    getNowPlay(state){
        return state.nowPlay
    },
    getPlayState(state){
        return state.nowPlay.state
    },
    getType(state){
        return state.isType
    }
};