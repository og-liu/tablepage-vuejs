<template>
  <div style="min-width: 1050px">
    <table-page
      title="高质量人类"
      subtitle="让天下没有难找的对象"
      :tableData="tableData"
      @currentChange="currentChange"
      @sizeChange="sizeChange"
      backButton
      @goBack="goBack"
      @onSearch="onSearch"
      @onClear="onClear"
      row-key="name"
      :loading="loading">
      <template slot="more">
        <el-dropdown split-button type="primary" size="small">
          更多名单
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>凶猛的小萝莉</el-dropdown-item>
            <el-dropdown-item>沧伤的小正太</el-dropdown-item>
            <el-dropdown-item>娇萌的怪叔叔</el-dropdown-item>
            <el-dropdown-item>恐怖的御姐姐</el-dropdown-item>
            <el-dropdown-item>性感的老阿姨</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template slot="names" slot-scope="scope">
        <div style="color: #409eff">{{scope.row.name}}</div>
      </template>
      <template slot="birthday" slot-scope="scope">
        <el-date-picker size="small" v-model="birthday" type="date" placeholder="选择日期"></el-date-picker>
      </template>
    </table-page>
  </div>
</template>

<script>
import tablePage from './components/index'
import axios from 'axios'

export default {
  components:{ tablePage },
  data(){
    return {
      birthday: '',
      tableData: [],
      pagination: {},
      loading: false,
      search: {}
    }
  },
  provide() {
    return {
      batchHandleSet: [
        {
          content: '开始',
          svg: {
            name: 'start'
          },
          event: 'doStart'
        },
        {
          content: '停止',
          svg: {
            width: '16',
            height: '16',
            name: 'off'
          },
          event: 'doStop'
        }
      ],
      floatButtonSet: [
        {
          renderType: 'button',
          text: '新增高质量人类',
          type: 'primary',
          icon: 'el-icon-edit',
          onClick: this.added
        },
        {
          renderType: 'slot',
          slot: 'more'
        },
        {
          renderType: 'dropdown',
          text: '导出数据',
          type: 'primary',
          menuSet: [
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
          renderType: 'button',
          text: '黑名单',
          disabled: true,
          type: 'info',
          onClick: this.blacklist
        }
      ],
      searchBarSet: [
        {
          renderType: 'input',
          label: '姓名',
          width: 240,
          key: 'name',
          placeholder: '请输入姓名'
        },
        {
          renderType: 'slot',
          label: '出生日期',
          slot: 'birthday',
        },
        {
          renderType: 'select',
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
        }
      ],
      tableColumnSet: [
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
        },
        {
          label: '操作',
          renderType: 'button',
          handleButtonSet: [
            {
              content: '编辑',
              svg: {
                name: 'edit',
                width: '16',
                height: '16',
                color: '#FFF'
              },
              icon: 'el-icon-edit',
              type: 'primary',
              event: 'doEdit',
              // 如果当前行的 name 值不为大山，则显示按钮
              isShow: (item) => item.name !== '大山'
            },
            {
              content: '删除',
              icon: 'el-icon-delete',
              type: 'danger',
              event: 'doDel'
            }
          ]
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
    onClear() {
      this.birthday = ''
    },
    doEdit(row) {
      console.log(row)
      console.log('点击了编辑按钮')
    },
    doDel(row) {
      console.log(row)
      console.log('点击了删除按钮')
    },
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
        this.pagination = {
          size: pageSize,
          total: response.data.meta.pagination.total,
          current: response.data.meta.pagination.current_page
        }
        this.loading = false
      }).catch(function (error) {
        this.loading = false
        console.log(error)
      })
    },
    // 点击搜索按钮
    onSearch(search) {
      this.search = search
      this.search.birthday = this.birthday
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
    },
    doStart(item, rows) {
      console.log(item)
      console.log(rows)
    },
    doStop(item, rows) {
      console.log(item)
      console.log(rows)
    }
  }
}
</script>

<style>
.el-dropdown .el-dropdown__caret-button {
  padding-top: 8.5px;
}
</style>
