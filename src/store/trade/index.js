import { reqAddressInfo, reqOrderInfo ,reqSubmitOrder} from "@/api"

const state={
    address:[],
    orderInfo:{},
    payId:''
}

const actions={
    // 获取用户地址信息
    async getUserAddress(context,value){
        let result = await reqAddressInfo()
        if (result.code == 200) {
            context.commit("GETUSERADDRESS",result.data)
        }
    },
    async getOrderInfo(context,value){
        let result = await reqOrderInfo()
        console.log(result);
        if (result.code == 200) {
            context.commit("GETORDERINFO",result.data)
        }
    },
    //提交订单:tradeNO 交易编码   data:付款人信息
    async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let result = await reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
            commit('SUBMITINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
}

const mutations={
    GETUSERADDRESS(state,address){
        state.address = address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    },
    SUBMITINFO(state,payId){
        state.payId = payId;
    }
}

const getters={

}

export default{
    state,
    actions,
    mutations,
    getters
}

