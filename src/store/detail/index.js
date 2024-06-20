import { reqDetailList,reqAddOrUpdateShopCart } from "@/api"
import {SET_USERID} from "@/utils/USER_ID"

const state = {
    detailList : {},
    uuid_token:SET_USERID()
}

const actions = {
    async detailList(context,goodId){
        let result = await reqDetailList(goodId)
            if (result.code>=200 && result.code<300) {
                context.commit("DETAILLIST",result.data)
            }
        
    },
    //将产品提交购物车
    async getGoodsInfo(context,{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    DETAILLIST(state,value){
        state.detailList = value
    }
}

const getters = {
    categoryView(state){
        return state.detailList.categoryView || {}
    },
    skuInfo(state){
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailList.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}