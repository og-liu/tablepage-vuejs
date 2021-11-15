<template>
  <table-page
    title="高质量人类"
    subtitle="让天下没有难找的对象"
    :tableData="tableData"
    @currentChange="currentChange"
    @sizeChange="sizeChange"
    backButton
    @goBack="goBack"
    @onSearch="onSearch"
    :loading="loading">
    <template slot="names" slot-scope="scope">
      <div style="color: #409eff">{{scope.row.name}}</div>
    </template>
  </table-page>
</template>

<script>
import tablePage from './components/index'
import axios from 'axios'

export default {
  components:{ tablePage },
  data(){
    return {
      tableData: [],
      pagination: {},
      loading: false,
      search: {}
    }
  },
  provide() {
    return {
      floatButtonSet: [
        {
          type: 'Button',
          text: '新增高质量人类',
          style: 'primary',
          onClick: this.added
        },
        {
          type: 'Dropdown',
          text: '导出数据',
          list: [
            {
              text: '导出高质量男孩',
              onClick: this.leadingOutBoys
            },
            {
              text: '导出高质量女孩',
              onClick: this.leadingOutGirls
            }
          ],
        },
        {
          type: 'Button',
          text: '黑名单',
          disabled: true,
          style: 'info',
          onClick: this.blacklist
        }
      ],
      searchBarSet: [
        {
          type: 'select',
          label: '学历',
          placeholder: '请选择学历',
          key: 'education',
          options: [
            {
              value: '专科',
              label: '专科'
            }, {
              value: '本科',
              label: '本科'
            }, {
              value: '硕士',
              label: '硕士'
            }, {
              value: '博士',
              label: '博士'
            }
          ]
        },
        {
          type: 'input',
          label: '姓名',
          width: 240,
          key: 'name',
          placeholder: '请输入姓名'
        }
      ],
      tableColumns: [
        {
          renderType: 'slot',
          slot: 'names',
          label: '姓名'
        },
        {
          prop: 'name',
          renderHeader: this.renderHeader
        },
        {
          prop: 'birthday',
          minWidth: 100,
          label: '出生日期',
        },
        {
          prop: 'sex',
          label: '性别',
        },
        {
          prop: 'phone',
          label: '联系电话'
        },
        {
          prop: 'hobbies',
          label: '爱好'
        },
        {
          prop: 'education',
          label: '学历'
        },
        {
          prop: 'occupation',
          label: '职业'
        },
        {
          prop: 'address',
          width: 300,
          label: '联系地址'
        }
      ],
      paginationSet: () => this.pagination
    }
  },
  mounted() {
    // 请求接口获取列表数据
    this.getData()
  },
  methods: {
    added() {
      console.log('新增高质量人类名单')
    },
    blacklist() {
      console.log('点击了黑名单')
    },
    leadingOutBoys() {
      console.log('导出高质量男孩名单')
    },
    leadingOutGirls() {
      console.log('导出高质量女孩名单')
    },
    goBack() {
      console.log('点击了返回按钮')
    },
    renderHeader(createElement, { column }) {
      return createElement('span', [
          createElement('span', ['姓名' + ' ']),
          createElement('el-popover', {
            props: {
              placement: 'top',
              trigger: 'hover',
              popperClass: 'titshowTip'
            }}, [createElement('span',
            ['自定义表头']),
            createElement('span', {
              slot: 'reference',
              'class': { 'el-icon-question': true }
            })
          ])
        ]
      )
    },
    // 请求接口获取列表数据
    getData(page = 1, pageSize = 10, search = {}) {
      this.loading = true
      axios.get('https://mock.ogliu.com/mock/618484ed957ff105d1b54bad/api/list', {
        params: { page, pageSize, ...search }
      }).then(response => {
        this.tableData = response.data.data
        console.log(this.tableData)
        this.pagination = {
          size: pageSize,
          total: response.data.meta.pagination.total,
          current: response.data.meta.pagination.current_page
        }
        this.loading = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 点击搜索按钮
    onSearch(search) {
      this.search = search
      this.getData(1, this.pagination.size, search)
    },
    // 当前页码改变
    currentChange(page) {
      this.getData(page, this.pagination.size, this.search)
    },
    // 每页展示数量改变
    sizeChange(size) {
      this.pagination.size = size
      this.getData(1, size, this.search)
    }
  }
}
</script>
