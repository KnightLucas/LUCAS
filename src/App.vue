<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>

import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch("categoryList");
    this.$store.dispatch("bannerList");
  },
}
</script>

<style>

</style>
