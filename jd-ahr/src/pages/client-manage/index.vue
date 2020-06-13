<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="客户名称" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="客户账号" prop="userAcct">
        <el-input v-model="formData.userAcct"></el-input>
      </el-form-item>
    </i-search>

    <i-table
      :tableData="tableData"
      :pageInfo="pageInfo"
      :selectionShow="true"
      v-loading="tableLoading"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
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
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import req from '@/api/client-manage.js'

export default {
  name: 'client-manage',
  components: {
    ISearch,
    ITable
  },
  data () {
    return {
      dialogType: 'add',
      tableLoading: false,
      formData: {
        userName: '',
        userAcct: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      columnList: [
        {label: '客户名称', prop: 'userName'},
        {label: '客户编号', prop: 'userId'},
        {label: '客户账号', prop: 'userAcct'},
        {label: '性别', prop: 'sex', distName: 'sexOptions'},
        {label: '手机号', prop: 'phone'},
        {label: '邮箱', prop: 'mail'},
        {label: '身份证', prop: 'idCard'}
      ],
      tableData: [],
      sexOptions: [
        {label: '男', value: '0'},
        {label: '女', value: '1'}
      ]
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
        ...Object.assign({}, this.formData, {role: JSON.parse(sessionStorage.getItem('roleInfo')).role}),
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      }).then(data => {
        console.log(data)
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
