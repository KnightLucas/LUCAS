import { reqSearchList } from "@/api"

const state = {
    searchList:{}
}

const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}

const actions = {
    async getSearchList(context,value){
        let result = await reqSearchList(value)
        if (result.code>=200&&result.code<300) {
            context.commit("GETSEARCHLIST",result.data)
        }
    }
}

const getters = {
    goodsList(state){
        if (state.searchList.goodsList) {
            return state.searchList.goodsList || [];
        }
    },
    trademarkList(state){
        if (state.searchList.trademarkList) {
            return state.searchList.trademarkList || [];
        }
    },
    attrsList(state){
        if (state.searchList.attrsList) {
            return state.searchList.attrsList || [];
        }
    },
}

export default({
    state,
    mutations,
    actions,
    getters,
});
