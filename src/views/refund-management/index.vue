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
                <el-option v-for="(item, index) in parkingLotList" :key="index" :label="item.parkName" :value="item.parkId"></el-option>
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
import { refundInfoList } from '@/api/refund-management'
import { exp } from '@/api/download-template'
import { listParkByLogin } from '@/api/user-management'
export default {
  name: '',
  data () {
    return {
      form: {
        plateNumber: '',
        orderNumber: '',
        refundTime: ['', ''],
        parkingLot: ''
      },
      tableData: [],
      parkingLotList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created () {
    this.init()
    this.getParkingLotList()
  },
  methods: {
    init () {
      refundInfoList({
        carCode: this.form.plateNumber,
        orderId: this.form.orderNumber,
        refundTimeS: this.form.refundTime[0],
        refundTimeE: this.form.refundTime[1],
        parkId: this.form.parkingLot
      }).then(response => {
        console.log('refundInfo response', response)
        this.tableData = []
        response.info.list.forEach(e => {
          this.tableData.push({
            parkingLot: e.parkName,
            plateNumber: e.carCode,
            orderNumber: e.orderId,
            refundAmount: e.paidMoney,
            refundTime: this.moment(e.refundTime).format('YYYY-MM-DD HH:mm:ss')
          })
        })
        this.total = response.info.totalCount
      })
    },
    getParkingLotList () {
      listParkByLogin({ parkName: '' }).then(response => {
        console.log('getParkingLotList response', response)
        this.parkingLotList = response.info
      })
    },
    query () {
      this.currentPage = 1
      this.init()
    },
    reset () {
      this.form = {
        plateNumber: '',
        orderNumber: '',
        refundTime: ['', ''],
        parkingLot: ''
      }
      this.query()
    },
    exp () {
      exp('/refundInfo/export', {
        carCode: this.form.plateNumber,
        orderId: this.form.orderNumber,
        refundTimeS: this.form.refundTime[0],
        refundTimeE: this.form.refundTime[1],
        parkId: this.form.parkingLot
      }, '退款管理')
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.query()
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
