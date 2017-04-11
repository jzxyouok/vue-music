/**
 * Created by dell on 2017/3/10.
 */
export const change_actions = {
    //调用改变搜索状态的分开函数
    changeSearch({ dispatch, state }){
        dispatch('SearchState')
    },
    changeType({ dispatch, state }){
        dispatch('typeState')
    },
    changePlay({ dispatch, state },songDetail){
        console.log(songDetail);
        dispatch('playState',songDetail);
    },
    change_index({ dispatch, state },index){
        dispatch('toggle_play',index);
    },
    change_next({ dispatch, state }) {
        dispatch('NEXT');
    },
    change_pre({ dispatch, state }) {
        dispatch('PRE');
    }
}