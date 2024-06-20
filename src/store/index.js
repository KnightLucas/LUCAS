import Vue from "vue";
import Vuex from 'vuex'

// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import user from "./user"
import shopcar from "./shopcar";
import trade from "./trade";

Vue.use(Vuex);



export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        user,
        shopcar,
        trade
    }
});
