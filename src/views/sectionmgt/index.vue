<template>
  <div class="section-container">
    <div class="section-select">
      <span
        :class="{'section-click': item.isCheck}"
        v-for="(item, index) in list"
        :key="item.id"
        @click="selectOrder(index, list)"
      >{{item.title}}</span>
    </div>
    <el-card shadow="always" class="section-table">
      <component :is="currentView"></component>
    </el-card>
  </div>
</template>

<script>
import table0 from './components/first.vue'
import table1 from './components/second.vue'

export default {
  name: 'sectionmgt',
  components: {
    table0,
    table1
  },
  data () {
    return {
      list: [{
        title: '一级栏目',
        id: 0,
        isCheck: true
      }, {
        title: '二级栏目',
        id: 1,
        isCheck: false
      }],
      currentView: 'table0'
    }
  },
  methods: {
    selectOrder (num, list) {
      let len = list.length
      for (let i = 0; i < len; i++) {
        list[i].isCheck = false
      }
      list[num].isCheck = true
      this.currentView = 'table' + [num]
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  &-select {
    background: #fff;
    overflow: hidden;
  }
  &-select span {
    float: left;
    color: rgba(0, 0, 0, 0.65);
    font-size: 16px;
    line-height: 24px;
    margin: 0 20px;
    padding: 10px 0;
    cursor: pointer;
    z-index: 1500;
  }
  &-click {
    border-bottom: 2px solid #1890ff;
    color: #1890ff !important;
  }
  &-table {
    margin: 20px;
  }
}
</style>
