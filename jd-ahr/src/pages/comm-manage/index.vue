<template>
  <div>
    <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="formData.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="商品状态" prop="goodsStateId">
        <el-select clearable v-model="formData.goodsStateId">
          <el-option
            v-for="(item, index) in goodsStateOptions"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告词" prop="goodsAdvertise">
        <el-input v-model="formData.goodsAdvertise"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="goodsPress">
        <el-input v-model="formData.goodsPress"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="goodsAuthor">
        <el-input v-model="formData.goodsAuthor"></el-input>
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

    <i-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      @dialog-before-close="dialogBeforeClose"
      @dialog-cancel="dialogCancel"
      @dialog-confirm="dialogConfirm">
      <el-form :model="dialogFormData" ref="form" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="dialogFormData.goodsName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="书号" prop="isbn">
              <el-input v-model="dialogFormData.isbn" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="一级分类" prop="oneClassifyId">
              <el-select v-model="dialogFormData.oneClassifyId" @change="oneSelectChange">
                <el-option
                  v-for="(item, index) in oneClassifyOptions"
                  :key="index"
                  :label="item.classifyName"
                  :value="item.classifyId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="二级分类" prop="twoClassifyId">
              <el-select v-model="dialogFormData.twoClassifyId">
                <el-option
                  v-for="(item, index) in twoClassifyOptions"
                  :key="index"
                  :label="item.classifyName"
                  :value="item.classifyId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="商家名称" prop="supplierName">
              <el-input v-model="dialogFormData.supplierName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="库存" prop="goodsInventory">
              <el-input v-model.number="dialogFormData.goodsInventory" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成本价" prop="goodsOriginalCost">
              <el-input type="number" v-model.number="dialogFormData.goodsOriginalCost" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="在售价" prop="goodsPrice">
              <el-input type="number" v-model.number="dialogFormData.goodsPrice" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="goodsAuthor">
              <el-input v-model="dialogFormData.goodsAuthor" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出版社" prop="goodsPress">
              <el-input v-model="dialogFormData.goodsPress" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="广告词" prop="goodsAdvertise">
              <el-input type="textarea" v-model="dialogFormData.goodsAdvertise" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="商品介绍" prop="goodsDescribe">
              <el-input type="textarea" v-model="dialogFormData.goodsDescribe" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片" prop="imagePath">
              <i-file v-model="dialogFormData.imagePath"></i-file>
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
import req from '@/api/comm-manage.js'
import IFile from '@/components/common/i-file.vue'

export default {
  name: 'comm-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    IFile
  },
  data () {
    return {
      dialogType: 'add',
      tableLoading: false,
      formData: {
        goodsName: '',
        goodsStateId: '',
        goodsAdvertise: '',
        goodsAuthor: '',
        goodsPress: ''
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
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            this.dialogVisible = true
            this.dialogType = 'add'
            this.dialogTitle = '新增商品'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            if (this.tableSelectRows.length > 1) {
              this.$message.info('当前不支持批量修改数据')

              return
            }

            this.dialogVisible = true
            this.dialogType = 'edit'
            this.dialogTitle = '修改商品'

            req('getGoods', {goodsId: this.tableSelectRows[0].goodsId}).then(data => {
              this.oneSelectChange(data.data.oneClassifyId).then(classifyData => {
                this.dialogFormData = Object.assign({}, data.data, {
                  imagePath: data.data.goodsImagePath
                })
              })

              console.log(this.dialogFormData)
            })
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
                return item.goodsId
              }).toString()

              req('deleteGoods', {goodsId: ids}).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '上架',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')
              return
            }

            this.$confirm('是否需要将选中的数据进行上架?').then(() => {
              let goodsIds = this.tableSelectRows.map(item => {
                return item.goodsId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              let goodsInventorys = this.tableSelectRows.map(item => {
                return item.goodsInventory
              }).toString()

              req('updateGoodsStatus', {
                goodsId: goodsIds,
                goodsStateId: '1',
                version: versions,
                goodsInventories: goodsInventorys
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        },
        {
          btnName: '下架',
          type: 'primary',
          func: () => {
            if (this.tableSelectRows.length === 0) {
              this.$message.info('请选择需要修改的数据')

              return
            }

            this.$confirm('是否需要将选中的数据进行下架?').then(() => {
              let goodsIds = this.tableSelectRows.map(item => {
                return item.goodsId
              }).toString()

              let versions = this.tableSelectRows.map(item => {
                return item.version
              }).toString()

              let goodsInventorys = this.tableSelectRows.map(item => {
                return item.goodsInventory
              }).toString()

              req('updateGoodsStatus', {
                goodsId: goodsIds,
                goodsStateId: '2',
                version: versions,
                goodsInventories: goodsInventorys
              }).then(data => {
                this.$message.success(data.msg)

                this.fetch()
              })
            })
          }
        }
      ],
      goodsStateOptions: [
        {label: '售罄', value: '0'},
        {label: '在售', value: '1'},
        {label: '已下架', value: '2'},
        {label: '未发布', value: '3'}
      ],
      columnList: [
        {label: '商品名称', prop: 'goodsName', width: 150},
        {label: '定价', prop: 'goodsOriginalCost'},
        {label: '售价', prop: 'goodsPrice'},
        {label: '销售量', prop: 'goodsSales'},
        {label: '出版社', prop: 'goodsPress'},
        {label: '作者', prop: 'goodsAuthor'},
        {label: '一级分类', prop: 'oneClassifyName'},
        {label: '二级分类', prop: 'twoClassifyName'},
        {label: '广告词', prop: 'goodsAdvertise', width: 200},
        {label: '商品介绍', prop: 'goodsDescribe', width: 200},
        {label: '商品状态', prop: 'goodsStateId', distName: 'goodsStateOptions'},
        {label: '上架时间', prop: 'goodsShelfTime', width: 200},
        {label: '浏览量', prop: 'goodsViewsNum'},
        // {label: '商家编码', prop: 'idCard'},
        {label: '商家名称', prop: 'supplierName', width: 200},
        {label: '库存', prop: 'goodsInventory'},
        {label: 'isbn书号', prop: 'isbn', width: 200}
      ],
      tableData: [],
      tableSelectRows: [],
      formRules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'change' }
        ],
        isbn: [
          { required: true, message: '请输入书号', trigger: 'change' }
        ],
        oneClassifyId: [
          { required: true, message: '请选择一级分类', trigger: 'change' }
        ],
        twoClassifyId: [
          { required: true, message: '请选择二级分类', trigger: 'change' }
        ],
        goodsDescribe: [
          { required: true, message: '请输入商品介绍', trigger: 'change' }
        ],
        supplierName: [
          { required: true, message: '请输入商家名称', trigger: 'change' }
        ],
        goodsInventory: [
          { required: true, message: '请输入商品库存', trigger: 'change' },
          { type: 'number', message: '商品库存必须为数字' }
        ],
        goodsOriginalCost: [
          { required: true, message: '请输入成本价', trigger: 'change' },
          { type: 'number', message: '成本价必须为数字' }
        ],
        goodsPrice: [
          { required: true, message: '请输入在售价', trigger: 'change' },
          { type: 'number', message: '在售价必须为数字' }
        ],
        goodsAuthor: [
          { required: true, message: '请输入作者', trigger: 'change' }
        ],
        goodsPress: [
          { required: true, message: '请输入出版社', trigger: 'change' }
        ],
        imagePath: [
          { required: true, message: '请上传商品图片', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.search()
    this.getClassifyList('0')
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
    // 获取分类列表

    getClassifyList (id) {
      return new Promise((resolve, reject) => {
        req('getClassifyList', {classifyId: id}).then(data => {
          this.dialogFormData.twoClassifyId = ''
          if (id === '0') {
            this.oneClassifyOptions = data.data.goodsClassifyList
          } else {
            this.twoClassifyOptions = data.data.goodsClassifyList
          }

          resolve(data)
        })
      })
    },
    oneSelectChange (value) {
      return this.getClassifyList(value)
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
          if (this.dialogType === 'add') {
            req('addGoods', {...this.dialogFormData}).then(data => {
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
            req('updateGoods', {...this.dialogFormData}).then(data => {
              if (data.code === 0) {
                this.$message.success(data.msg)

                this.fetch()
                this.$refs.form.resetFields()
                this.dialogVisible = false
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        } else {
          return false
        }
      })
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
