<template>
  <div class="pd20">
    <el-card :body-style="{ 'padding-top': '20px' }">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车牌号">
              <el-input v-model="form.plateNumber" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单号">
              <el-input v-model="form.orderNumber" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="退款时间">
              <el-date-picker v-model="form.refundTime" type="datetimerange" style="width: 100%;"
                range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="停车场">
              <el-select v-model="form.parkingLot" style="width: 100%;">
                <el-option label="状态一" value="1"></el-option>
                <el-option label="状态二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="mt20">
        <el-col :span="12">
          <el-button type="primary" @click="exp">导 出</el-button>
        </el-col>
        <el-col :span="12" class="tr">
          <el-button type="primary" @click="query">查 询</el-button>
          <el-button @click="reset">重 置</el-button>
        </el-col>
      </el-row>
      <el-table class="mt20" :data="tableData" :header-cell-style="{ 'background-color': '#ebeef5' }" style="width: 100%">
        <el-table-column prop="parkingLot" label="停车场" align="center"></el-table-column>
        <el-table-column prop="plateNumber" label="车牌号" align="center"></el-table-column>
        <el-table-column prop="orderNumber" label="订单号" align="center"></el-table-column>
        <el-table-column prop="refundAmount" label="退款金额（元）" align="center"></el-table-column>
        <el-table-column prop="refundTime" label="退款时间" align="center"></el-table-column>
      </el-table>
      <div class="mt20 tr">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      form: {
        plateNumber: '',
        orderNumber: '',
        refundTime: '',
        parkingLot: ''
      },
      tableData: [
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', orderNumber: '1002891821234', refundAmount: '16.00', refundTime: '2019-12-03 12:46:58' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', orderNumber: '1002891821234', refundAmount: '16.00', refundTime: '2019-12-03 12:46:58' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', orderNumber: '1002891821234', refundAmount: '16.00', refundTime: '2019-12-03 12:46:58' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', orderNumber: '1002891821234', refundAmount: '16.00', refundTime: '2019-12-03 12:46:58' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', orderNumber: '1002891821234', refundAmount: '16.00', refundTime: '2019-12-03 12:46:58' }
      ],
      currentPage: 1,
      pageSize: 20,
      total: 200
    }
  },
  methods: {
    edit (item) {},
    del (item) {},
    resetPwd (item) {},
    query () {},
    reset () {},
    exp () {},
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
