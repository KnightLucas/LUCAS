import VueRouter from "vue-router";

// 引入组件
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"

//引入仓库
import store from "@/store";

// 保存原有的push方法
let originPush = VueRouter.prototype.push;

//重写push
VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

const router = new VueRouter({
    routes:[
        {
          name:'pay',
          path:'/pay', 
          component:Pay
        },
        {
            name:'trade',
            path:'/trade',
            component:Trade
        },
        {
            name:'shopcart',
            path:'/shopcart',
            component:ShopCart,
        },
        {
            name:'home',
            path:'/home',
            component:Home,
            meta:{
                showFooter:true
            }
        },
        {
            name:'login',
            path:'/login',
            component:Login,
            meta:{
                showFooter:false
            }
        },
        {
            name:'register',
            path:'/register',
            component:Register,
            meta:{
                showFooter:false
            }
        },
        {
            name:'search',
            path:'/search/:keyWord?',
            component:Search,
            meta:{
                showFooter:true
            }
        },
        {
          name:'detail',
          path:'/detail/:skuid?',
          component:Detail,
          meta:{
            showFooter:true
          }  
        },
        {
            name:'addcartsuccess',
            path:'/addcartsuccess',
            component:AddCartSuccess,
            meta:{
                showFooter:false
              }  
        },
        // 重定向当第一次访问的时候定向到首页
        {
            path:'*',
            redirect:"/home"
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y : 0 ,behavior:"smooth"}
    }
})

//全局前置守卫
router.beforeEach(async(to,from,next)=>{
    let token = store.state.user.token;
    let userInfo = store.state.user.userInfo;
    if (token) {
        //登陆了但跳向登录页面
        if (to.path=='/login') {
            next('/home')
        }else{
            //登陆了但是信息没加载
            if (Object.keys(userInfo).length != 0) {
                next()
            }else{
                try {
                    await store.dispatch("userInfo")
                    next()
                } catch (error) {
                    await store.commit("CLSUSERINFO")
                    next('/login')
                }
            }
            next()
        }
    }else{
        next()
    }
})

export default router