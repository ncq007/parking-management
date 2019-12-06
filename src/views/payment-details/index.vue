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
            <el-form-item label="入场时间">
              <el-date-picker v-model="form.inTime" type="datetimerange" style="width: 100%;"
                range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="付款时间">
              <el-date-picker v-model="form.paymentTime" type="datetimerange" style="width: 100%;"
                range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.status" style="width: 100%;">
                <el-option label="状态一" value="1"></el-option>
                <el-option label="状态二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
        <el-table-column prop="inTime" label="入场时间" align="center"></el-table-column>
        <el-table-column prop="paymentTime" label="付款时间" align="center"></el-table-column>
        <el-table-column prop="paymentAmount" label="缴费金额（元）" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
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
        inTime: '',
        paymentTime: '',
        status: '',
        parkingLot: ''
      },
      tableData: [
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', inTime: '2019-12-03 09:10:33', paymentTime: '2019-12-03 12:46:58', paymentAmount: '16.00', status: '已支付,通知车场成功' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', inTime: '2019-12-03 09:10:33', paymentTime: '2019-12-03 12:46:58', paymentAmount: '16.00', status: '已支付,通知车场成功' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', inTime: '2019-12-03 09:10:33', paymentTime: '2019-12-03 12:46:58', paymentAmount: '16.00', status: '已支付,通知车场成功' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', inTime: '2019-12-03 09:10:33', paymentTime: '2019-12-03 12:46:58', paymentAmount: '16.00', status: '已支付,通知车场成功' },
        { parkingLot: '中建光谷之星', plateNumber: '鄂A L7989', inTime: '2019-12-03 09:10:33', paymentTime: '2019-12-03 12:46:58', paymentAmount: '16.00', status: '已支付,通知车场成功' }
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
