<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="closeTypeNav">
      <h2 class="all" @mouseenter="showTypeNav">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition
        name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.ccategoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId" href="javascript:void(0)">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:void(0)"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "animate.css";

export default {
  name: "TypeNav",
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        if (state.home.categoryList.length>15) {
          state.home.categoryList.splice(9, 2); //...太长了
        }
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 路由跳转到search页面
    goSearch(e) {
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      if (categoryname) {
        if (category1id) 
        {
          query.category1Id = category1id;
        } else if (category2id) 
        {
          query.category2Id = category2id;
        } else if (category3id) 
        {
          query.category3Id = category3id;
        }
      }
      //合并参数
      location.query = query;
      if (this.$route.params) {
        location.params = this.$route.params
        this.$router.push(location);
      }
      
    },

    // 当鼠标进入的时候展示TypeNav模块
    showTypeNav() {
      this.show = true;
    },
    // 鼠标离开隐藏TypeNav模块
    closeTypeNav() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  mounted() {
    // this.$store.dispatch("categoryList");
    if (this.$route.path == "/home") {
      this.show = true;
    } else {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scope>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          h3:hover {
            background-color: #ff3d33b2;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    
    .sort-enter{
        height: 0px;
        opacity: 0;
    }
    .sort-enter-to{
        height: 461px;
        opacity: 1;
    }
    .sort-enter-active{
        transition: all 0.2s linear;
    }
  }
}
</style>