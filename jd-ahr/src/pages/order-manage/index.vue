<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="下单人" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="订单编码" prop="orderId">
        <el-input v-model="formData.orderId"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStateId">
        <el-select clearable v-model="formData.orderStateId">
          <el-option
            v-for="(item, index) in orderStateIdOptions"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款时间" prop="payTime">
        <el-date-picker
          v-model="formData.payTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </i-search>

    <i-table
      :toolbar="toolbar"
      :tableData="tableData"
      :pageInfo="pageInfo"
      :selectionShow="true"
      v-loading="tableLoading"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-for="(item, index) in columnList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        align="center"
        :width="item.width"
        :show-overflow-tooltip="true"
        :formatter="columnFormatter">
      </el-table-column>
    </i-table>

    <!-- 订单详情接口 -->
    <i-dialog
      v-model="detailDialogVisible"
      title="订单详情"
      @dialog-cancel="detailDialogCancel"
      @dialog-confirm="detailDialogConfirm">
        <i-table
          :tableData="detailTableData"
          :pageInfo="detailPageInfo"
          :paginationVisible="false">
          <el-table-column
            v-for="(item, index) in detailColumnList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
            :width="item.width"
            :show-overflow-tooltip="true">
          </el-table-column>
        </i-table>
    </i-dialog>
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import req from '@/api/order-manage.js'
import IFile from '@/components/common/i-file.vue'
import moment from 'moment'

export default {
  name: 'order-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    IFile
  },
  data () {
    return {
      tableLoading: false,
      formData: {
        userName: '',
        orderId: '',
        payTime: [],
        phone: '',
        orderStateId: ''
      },
      detailDialogVisible: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      toolbar: [
        {
          btnName: '详情',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要查看的数据')

              return
            }

            if (this.tableSelectRows.length > 1) {
              this.$message.info('当前不支持批量查看数据')

              return
            }

            this.detailDialogVisible = true
            req('getOrderDetailData', {orderId: this.tableSelectRows[0].orderId}).then(data => {
              this.detailTableData = data.data.orderDeepenList
              this.detailPageInfo.pageSize = data.data.length
              this.detailPageInfo.pageNum = 1
              this.detailPageInfo.total = data.data.length
            })
          }
        },
        {
          btnName: '订单取消',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行取消订单操作?').then(() => {
              let orderIds = this.tableSelectRows.map(item => {
                return item.orderId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              req('updateOrder', {
                orderId: orderIds,
                orderStateId: '1',
                version: versions
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '订单到货',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行到货操作?').then(() => {
              let orderIds = this.tableSelectRows.map(item => {
                return item.orderId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              req('updateOrder', {
                orderId: orderIds,
                orderStateId: '2',
                version: versions
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '取消到货',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行取消到货操作?').then(() => {
              let orderIds = this.tableSelectRows.map(item => {
                return item.orderId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              req('updateOrder', {
                orderId: orderIds,
                orderStateId: '0',
                version: versions
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '订单已取货',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行订单已取货操作?').then(() => {
              let orderIds = this.tableSelectRows.map(item => {
                return item.orderId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              req('updateOrder', {
                orderId: orderIds,
                orderStateId: '3',
                version: versions
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '取消已取货',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行取消已取货操作?').then(() => {
              let orderIds = this.tableSelectRows.map(item => {
                return item.orderId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              req('updateOrder', {
                orderId: orderIds,
                orderStateId: '2',
                version: versions
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        }
      ],
      orderStateIdOptions: [
        {label: '已下单', value: '0'},
        {label: '已取消', value: '1'},
        {label: '已到货', value: '2'},
        {label: '已取货', value: '3'},
        {label: '已完成未评价', value: '4'},
        {label: '已完成已评价', value: '5'}
      ],
      columnList: [
        {label: '订单编码', prop: 'orderId', width: 150},
        {label: '订单总价', prop: 'orderAllCost'},
        {label: '订单状态', prop: 'orderStateId', distName: 'orderStateIdOptions'},
        {label: '门店编码', prop: 'storeId'},
        {label: '下单人姓名', prop: 'userName'},
        {label: '下单人手机号', prop: 'phone', width: 200},
        {label: '确认付款时间', prop: 'payTime', width: 200}
      ],
      tableData: [],
      detailTableData: [],
      detailPageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      detailColumnList: [
        {label: '用户编号', prop: 'userId'},
        {label: '订单编号', prop: 'orderId'},
        {label: '商品编号', prop: 'goodsId'},
        {label: '商品名称', prop: 'goodsName'},
        {label: '商品数量', prop: 'goodsCount'},
        {label: '总金额', prop: 'theGoodsAllPrice'},
        {label: '售价', prop: 'goodsPrice'},
        {label: '定价', prop: 'goodsShelfCost'}
      ],
      tableSelectRows: []
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    fetch () {
      this.pageInfo.pageSize = 5
      this.pageInfo.pageNum = 1
      this.search()
    },
    search () {
      this.tableLoading = true

      req('getTableData', {
        ...this.formData,
        payTimeStart: this.formData.payTime && this.formData.payTime[0] ? moment(this.formData.payTime[0]).format('YYYY-MM-DD') : '',
        payTimeEnd: this.formData.payTime && this.formData.payTime[1] ? moment(this.formData.payTime[1]).format('YYYY-MM-DD') : '',
        payTime: '',
        role: JSON.parse(sessionStorage.getItem('roleInfo')).role,
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      }).then(data => {
        this.tableLoading = false
        this.tableData = data.data.list
        this.pageInfo.pageNum = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
        this.pageInfo.total = data.data.total
      }).catch(() => {
        this.tableLoading = false
      })
    },
    reset () {
      this.fetch()
    },
    handleSizeChange (value) {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = value
      this.search()
    },
    handleCurrentChange (value) {
      this.pageInfo.pageNum = value
      this.search()
    },
    handleSelectionChange (rows) {
      this.tableSelectRows = rows
    },
    detailDialogCancel () {
      this.detailDialogVisible = false
    },
    detailDialogConfirm () {
      this.detailDialogVisible = false
    },
    // 表格表头的循环list变量名一定要是columnList
    columnFormatter (row, column, cellValue, index) {
      let distName = this.columnList.filter(item => {
        return item.prop === column.property
      })[0].distName

      if (distName) {
        let currentDist = []

        currentDist = this[distName].filter(item => {
          return item.value === row[column.property]
        })

        if (currentDist[0]) {
          return currentDist[0].label
        } else {
          return row[column.property]
        }
      } else {
        return row[column.property]
      }
    }
  }
}
</script>
