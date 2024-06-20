import Vue from 'vue'
import App from './App.vue'

//全局组件三级联动
import TypeNav from '@/components/TypeNav'
//全局组件分页器
import Pagination from '@/components/Pagination'
//懒加载
import VueLazyload from 'vue-lazyload'


Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

//引入路由插件
import VueRouter from 'vue-router'

//引入路由配置项
import router from '@/router'

import "@/plugins/validate"

///引入仓库
import store from '@/store'

//引入Mock数据
import '@/mock/mockServe'

//引入swiper的样式
import "swiper/css/swiper.css"

//全局网络请求
import * as API from "@/api"

//elementUI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 使用路由
Vue.use(VueRouter)
//懒加载
Vue.use(VueLazyload)
//使用elementUI库
Vue.use(ElementUI);


new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router:router,
  store,
}).$mount('#app')
