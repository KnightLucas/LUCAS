//统一管理api接口
import requests from "./request";

//封装mock伪数据的api
import mockRequests from './mockAjax'

//三级联动接口
export const reqCategoryList = ()=>{
    //发请求
    return requests({
        url:'/product/getBaseCategoryList',
        method:"get"
    })
}

//获取首页轮播图的接口
export const reqBannerList = ()=>{
    return mockRequests({
        url:'/banner',
        method:"get"
    })
}

//获取楼层的数据的接口
export const reqFloorList = ()=>{
    return mockRequests({
        url:'/floor',
        method:"get"
    })
}

//获取搜索界面的接口
export const reqSearchList = (params)=>{
    return requests({
        url:'/list',
        method:"POST",
        data:params
    })
}

//获取详情界面的接口
export const reqDetailList = (skuId)=>{
    return requests({
        url:`/item/${ skuId }`,
        method:"GET",
    })
}

//获取验证码接口
export const reqCode = (phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'GET'
    })
}

//提交用户注册数据
export const postUserRegister = (params)=>{
    return requests({
        url:`/user/passport/register`,
        method:"POST",
        data:params
    })
}

//提交用户登录请求
export const postUserLogin = (params)=>{
    return requests({
        url:`/user/passport/login`,
        method:"POST",
        data:params
    })
}

//携带token获取用户信息
export const reqUserInfo = ()=>{
    return requests({
        url:`/user/passport/auth/getUserInfo`,
        method:"GET",
    })
}

//通知服务器清除登录
export const clsUserInfo = ()=>{
    return requests({
        url:`/user/passport/logout`,
        method:"GET"
    })
}

//添加产品到购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'POST'
    })
}

//获取用户购物车的数据接口
export const reqShopCart = ()=>requests({url:'/cart/cartList',method:'get'});


//删除某一个商品的接口
export const reqDeleteCart = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});


//修改某一个商品的勾选的状态

export const reqUpdateChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});


//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});

//获取商品清单数据
export const reqOrderInfo = ()=>requests({url:`/order/auth/trade`,method:'get'});

//提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

//获取支付信息接口
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//查询支付结果
export const reqPayResult = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取我的订单
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});