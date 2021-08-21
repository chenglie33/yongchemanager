<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @closed='closed'
    >
    <div class='flexBox flex-col flex-middle'>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>开户行：</div>
        <div class='flex-1'>{{dataReponse.bank}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>银行卡号：</div>
        <div class='flex-1'>{{dataReponse.bankNum}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>公司名：</div>
        <div class='flex-1'>{{dataReponse.companyName}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>地址：</div>
         <div class='flex-1'>{{dataReponse.address}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>开票状态：</div>
         <div class='flex-1'>{{getTypeText('invoiceStatus',dataReponse.invoiceStatus)}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>开票时间：</div>
       <div class='flex-1'>{{dataReponse.invoiceTime}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>订单id：</div>
        <div class='flex-1'>{{dataReponse.id}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>电话：</div>
        <div class='flex-1'>{{dataReponse.phone}}</div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x w100pct'>
        <div class='items'>税号：</div>
        <div class='flex-1'>{{dataReponse.taxNum}}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if='dataReponse.invoiceStatus!==1'  @click="kpa">开票</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getInvoiceInfoApi, orderInvoicApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'kaipia',
  data () {
    return {
      title: '开票',
      dialogVisible: false,
      dataReponse: {},
      orderId: null
    }
  },
  methods: {
    getTypeText,
    handleClose () {
      this.dialogVisible = false
    },
    closed () {
      this.dataReponse = {}
      this.orderId = null
    },
    kpa () {
      orderInvoicApi({ orderId: this.orderId }).then(data => {
        this.dialogVisible = false
        this.$emit('success')
      })
    },
    show (data) {
      this.dialogVisible = true
      this.orderId = data.id
      getInvoiceInfoApi({ orderId: data.id }).then(data => {
        this.dataReponse = data.content
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.items{
  width: 120px;
}
</style>
