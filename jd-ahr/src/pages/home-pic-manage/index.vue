<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="状态" prop="slideshowStateId">
        <el-select clearable v-model="formData.slideshowStateId">
          <el-option
            v-for="(item, index) in slideshowStateIdOptions"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        <template slot-scope="scope">
          <el-button v-if="item.prop === 'watch'" type="text" @click="watchImg(scope.row)">预览</el-button>
          <span v-else>{{ filterDist(scope.row[item.prop], item) }}</span>
        </template>
      </el-table-column>
    </i-table>

    <i-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      @dialog-before-close="dialogBeforeClose"
      @dialog-cancel="dialogCancel"
      @dialog-confirm="dialogConfirm">
      <el-form :model="dialogFormData" ref="form" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="排序" prop="slideshowNum">
              <el-input v-model.number="dialogFormData.slideshowNum" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="有效期起" prop="startTime">
              <el-date-picker
                v-model="dialogFormData.startTime"
                :picker-options="startTimePickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="有效期止" prop="endTime">
              <el-date-picker
                v-model="dialogFormData.endTime"
                :picker-options="endTimePickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片" prop="imagePath">
              <i-file v-model="dialogFormData.imagePath"></i-file>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="商品" prop="goodsId">
              <comm-select v-model="dialogFormData.goodsId"></comm-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </i-dialog>
  </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import req from '@/api/home-pic-manage.js'
import IFile from '@/components/common/i-file.vue'
import CommSelect from './comm-select.vue'
import moment from 'moment'

export default {
  name: 'home-pic-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    IFile,
    CommSelect
  },
  data () {
    return {
      dialogType: 'add',
      tableLoading: false,
      formData: {
        slideshowStateId: ''
      },
      oneClassifyOptions: [],
      twoClassifyOptions: [],
      dialogFormData: {
        goodsName: '',
        isbn: '',
        oneClassifyId: '',
        twoClassifyId: '',
        goodsAdvertise: '',
        goodsDescribe: '',
        supplierName: '',
        goodsInventory: '',
        goodsOriginalCost: '',
        goodsPrice: '',
        goodsAuthor: '',
        goodsPress: '',
        imagePath: ''
      },
      dialogVisible: false,
      dialogTitle: '新增商品',
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      startTimePickerOptions: {
        disabledDate: (value) => {
          return this.dialogFormData.endTime < value
        }
      },
      endTimePickerOptions: {
        disabledDate: (value) => {
          return this.dialogFormData.startTime > value
        }
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            this.dialogVisible = true
            this.dialogType = 'add'
            this.dialogTitle = '新增轮播图'
          }
        },
        {
          btnName: '删除',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要删除的数据')

              return
            }

            this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
              let ids = this.tableSelectRows.map(item => {
                return item.slideshowId
              }).toString()

              req('deleteSliderPic', {slideshowId: ids}).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '启用',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行启用?').then(() => {
              let slideshowIds = this.tableSelectRows.map(item => {
                return item.slideshowId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              req('updateSliderState', {
                slideshowId: slideshowIds,
                slideshowStateId: '1',
                version: versions
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '禁用',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行禁用?').then(() => {
              let slideshowIds = this.tableSelectRows.map(item => {
                return item.slideshowId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              req('updateSliderState', {
                slideshowId: slideshowIds,
                slideshowStateId: '0',
                version: versions
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        }
      ],
      slideshowStateIdOptions: [
        {label: '已禁用', value: '0'},
        {label: '启用', value: '1'}
      ],
      columnList: [
        {label: '排序', prop: 'slideshowNum'},
        {label: '图片路径', prop: 'slideshowPath'},
        {label: '状态', prop: 'slideshowStateId', distName: 'slideshowStateIdOptions'},
        {label: '预览', prop: 'watch'},
        {label: '有效期起', prop: 'startTime'},
        {label: '有效期止', prop: 'endTime'}
      ],
      tableData: [],
      tableSelectRows: [],
      formRules: {
        slideshowNum: [
          { required: true, message: '请输入轮播图排序', trigger: 'change' },
          { type: 'number', message: '轮播图排序必须为数字' }
        ],
        startTime: [
          { required: true, message: '请选择有效期始', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择有效期止', trigger: 'change' }
        ],
        goodsId: [
          { required: true, message: '请选择商品', trigger: 'change' }
        ],
        imagePath: [
          { required: true, message: '请上传商品图片', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.search()
  },
  filters: {
    filterDist (value, distName) {
      if (distName) {
        return this[distName].filter(item => {
          return item.value === value
        })[0].label
      }
    }
  },
  watch: {
    'dialogFormData.goodsId': {
      handler (value) {
        this.$refs.form.validateField('goodsId')
      },
      deep: true
    }
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
    dialogBeforeClose () {
      this.$refs.form.resetFields()
      this.twoClassifyOptions = []
    },
    dialogCancel () {
      this.$refs.form.resetFields()
      this.twoClassifyOptions = []
      this.dialogVisible = false
    },
    dialogConfirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          req('addSliderPic', Object.assign({},
            this.dialogFormData,
            {
              startTime: moment(this.dialogFormData.startTime).format('YYYY-MM-DD'),
              endTime: moment(this.dialogFormData.endTime).format('YYYY-MM-DD')
            })).then(data => {
            if (data.code === 0) {
              this.$message.success(data.msg)

              this.fetch()
              this.$refs.form.resetFields()
              this.dialogVisible = false
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 查看图片
    watchImg (data) {
      window.open(data.slideshowPath)
    },
    // 转换字典
    filterDist (value, item) {
      if (item.distName) {
        return this[item.distName].filter(distItem => {
          return distItem.value === value
        })[0].label
      } else {
        return value
      }
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
