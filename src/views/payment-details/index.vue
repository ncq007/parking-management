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
                <el-option label="支付成功" value="TRADE_SUCCESS"></el-option>
                <el-option label="退款成功" value="TRADE_REFUND"></el-option>
                <el-option label="等待买家付款" value="WAIT_BUYER_PAY"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
import { payInfoList } from '@/api/payment-details'
import { exp } from '@/api/download-template'
import { listParkByLogin } from '@/api/user-management'
export default {
  name: '',
  data () {
    return {
      form: {
        plateNumber: '',
        inTime: ['', ''],
        paymentTime: ['', ''],
        status: '',
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
      payInfoList({
        carCode: this.form.plateNumber,
        inTimeS: this.form.inTime[0],
        inTimeE: this.form.inTime[1],
        payTimeS: this.form.paymentTime[0],
        payTimeE: this.form.paymentTime[1],
        status: this.form.status,
        parkId: this.form.parkingLot,
        pageRow: this.pageSize,
        pageNum: this.currentPage
      }).then(response => {
        console.log('payInfoList response', response)
        this.tableData = []
        response.info.list.forEach(e => {
          this.tableData.push({
            parkingLot: e.parkName,
            plateNumber: e.carCode,
            inTime: this.moment(e.inTime).format('YYYY-MM-DD HH:mm:ss'),
            paymentTime: this.moment(e.payTime).format('YYYY-MM-DD HH:mm:ss'),
            paymentAmount: e.paidMoney,
            status: e.statusCn
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
        inTime: ['', ''],
        paymentTime: ['', ''],
        status: '',
        parkingLot: ''
      }
      this.query()
    },
    exp () {
      exp('/payInfo/export', {
        carCode: this.form.plateNumber,
        inTimeS: this.form.inTime[0],
        inTimeE: this.form.inTime[1],
        payTimeS: this.form.paymentTime[0],
        payTimeE: this.form.paymentTime[1],
        status: this.form.status,
        parkId: this.form.parkingLot
      }, '缴费详情')
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
