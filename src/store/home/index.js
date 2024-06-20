import { reqBannerList, reqCategoryList, reqFloorList } from "@/api";


const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
}

const mutations = {
    GATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const actions = {
    // 通过API里面的接口函数向服务器发请求获取数据
    async categoryList(context,value){
        let result = await reqCategoryList();
        if (result.code>= 200 && result.code<300) {
            context.commit("GATEGORYLIST",result.data)
        }
    },
    //获取mock里面的轮播图数据
    async bannerList(context,value){
        let result = await reqBannerList();
        if (result.code>= 200 && result.code<300) {
            context.commit("BANNERLIST",result.data)
        }
    },
    // 获取mock里面楼层的数据
    async floorList(context,value){
        let result = await reqFloorList();
        if (result.code>= 200 && result.code<300) {
            context.commit("FLOORLIST",result.data)
        }
    }

}

const getters = {}

export default({
    state,
    mutations,
    actions,
    getters,
});