<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-button type="primary" @click="handleAdd">新建</el-button>
    </el-card>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleAdd () {
      this.$router.push({
        name: 'c_add'
      })
    }
  }
}
</script>
