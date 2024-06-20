import { clsUserInfo, postUserLogin, postUserRegister, reqCode, reqUserInfo } from "@/api"

const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const getters = {}
const mutations = {
    USERCODE(state,value){
        state.code = value
    },
    USERLOGIN(state,value){
        state.token = value
    },
    USERINFO(state,value){
        state.userInfo = value
    },
    CLSUSERINFO(state,value){
        state.userInfo = {}
        state.token = ''
        localStorage.setItem("TOKEN",'')
    }
}
const actions = {
    //获取验证码
    async userCode(context,value){
        let result = await reqCode(value);
        if (result.code==200) {
            context.commit("USERCODE",result.data)
        }
    },
    //用户注册接口
    async userRegister(context,params){
        let result = await postUserRegister(params)
        if (result.code>=200 && result.code<300) {
            return 'ok'
        }else{
            return Promise.reject(new Error("注册失败"))
        }
    },
    async userLogin(context,params){
        let result = await postUserLogin(params)
        if (result.code==200) {
            context.commit("USERLOGIN",result.data.token)
            //持久化存储
            localStorage.setItem("TOKEN",result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },

    async userInfo(context,token){
        let result = await reqUserInfo(token)
        if (result.code==200) {
            context.commit("USERINFO",result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
}

export default({
    state,
    mutations,
    actions,
    getters,
})