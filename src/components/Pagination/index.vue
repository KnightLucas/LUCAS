<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNum.stratNum >1" @click="$emit('getPageNo',1)">1</button>
    <button v-show="startNumAndEndNum.stratNum>2">···</button>

    <button 
        v-for="(page,index) in startNumAndEndNum.diff" 
        :key="index" 
        @click="$emit('getPageNo',page+startNumAndEndNum.stratNum-1)"
        :class="{'active':page+startNumAndEndNum.stratNum-1 == pageNo}"
    >{{page+startNumAndEndNum.stratNum-1}}</button>

    <button v-show="startNumAndEndNum.endNum<totalPage-1">···</button>
    <button v-show="startNumAndEndNum.endNum<totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
  computed:{
    totalPage(){
        return Math.ceil(this.total/this.pageSize)
    },
    startNumAndEndNum(){
        const {continues,pageNo,totalPage} = this;

        let stratNum =0 , endNum = 0;

        if (continues>totalPage) {
            stratNum = 1
            endNum= totalPage
        }else{
            stratNum = pageNo - parseInt(continues/2)
            endNum = pageNo + parseInt(continues/2)

            if (stratNum<1){
                stratNum = 1
                endNum = continues
            }
            if (endNum>totalPage) {
                endNum = totalPage
                stratNum = totalPage - continues + 1
            }
        }

        let diff = endNum - stratNum +1
        return {stratNum,endNum,diff}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
