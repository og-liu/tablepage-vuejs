# 快速上手
> TablePage 使用 `render` 函数渲染组件，跳过编译过程，效率更高、性能更好, 可维护性更强！它将日常开发中最常用的表格列表页面完整的封装成了一个组件，包含了可能遇到的各种功能，通过使用时传递的配置信息生成页面，若已有的功能或样式不能满足的部分，也可以通过插槽的形式自定义编写

## 安装

##### npm 
在终端命令行使用指令安装依赖，然后按照下一步骤引入、注册全局组件使用
```bash
npm install tablepage-vuejs --save
```

## 引入并启用
> 在 main.js 引入， 如果项目中没有使用 Element UI，则也需要一并引入

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import tablePage from 'tablepage-vuejs'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(tablePage)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
```

## 在页面中使用

> 这是最基本的使用，至少得传入 `title`、`tableData` 以及 `tableColumns`，分别表示 `页面标题`、`数据源` 和 `每一列的配置信息`

```html run { title: '基础版' }
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  provide() {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'birthday',
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
          label: '联系地址'
        }
      ],
    }
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>
```

> 通过传入更多属性以展示一个功能丰富的表格页面

```html run { title: '综合实例' }
<template>
  <table-page
    title="高质量人类"
    subtitle="让天下没有难找的对象"
    :tableData="tableData"
    @currentChange="currentChange"
    @sizeChange="sizeChange"
    @onSearch="onSearch"
    :loading="loading">
  </table-page>
</template>

<script type="text/ecmascript-6">
export default {
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
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'birthday',
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
    // 请求接口获取列表数据
    getData(page = 1, pageSize = 10, search = {}) {
      this.loading = true
      // 模拟接口
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
```

# API 使用说明
> 下面将详细介绍组件的每一个 `prop`、`provide`、`event` 的使用， 建议按顺序阅读

## title 页面标题
> 用于展示页面标题

- 传入方式: `Prop`
- 类型: `String`
- 必传: `是`

##### 用法
```vue
<template>
  <table-page title="产品列表"></table-page>
</template>
```

## subtitle 副标题
> 用于展示副标题

- 传入方式: `Prop`
- 类型: `String`
- 必传: `否`

##### 用法
```vue
<template>
  <table-page title="产品列表" subtitle="拼团集采价更低"></table-page>
</template>
```

## tableData 表格数据源
> 通过 `接口` 从后端获取的数据源，用于表格展示的数据，和 `tableColumns` 搭配使用

- 传入方式: `Prop`
- 类型: `Array`，`对象数组`，每个元素都应该是一个对象，而每个对象表示每行数据
- 必传: `是`

##### 用法
```vue
<template>
  <table-page title="产品列表" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: []
    }
  }
}
</script>
```

## tableColumns 表格列集合
> 通过注入的方式对表格每列数据做配置，`tableColumns` 只是一个容器，用于存放所有的 `列` 的配置信息

- 传入方式: `Provide`
- 类型: `Array`，`对象数组`，每个元素都应该是一个对象，而每个对象表示每列数据的配置信息
- 必传: `是`

```html run { title: '基本用法' }
<template>
  <table-page title="产品列表" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          "erp_sku_sn": "UM574",
          "attribute_name": "12*2mg",
          "unit_name": "包、箱、盒",
          "factory_name": "三九制药有限公司",
          "promotion_available_stock": "3747.00",
          "whole_price": "46.00",
          "ladder_price": "￥45.00",
          "channel": "商城"
        },
        {
          "erp_sku_sn": "UM573",
          "attribute_name": "12*2mg",
          "unit_name": "包、箱、盒",
          "factory_name": "三九制药有限公司",
          "promotion_available_stock": "3747.00",
          "whole_price": "46.00",
          "ladder_price": "￥45.00",
          "channel": "商城"
        }
      ]
    }
  },
  provide() {
    return {
      tableColumns: [
        {
          prop: 'erp_sku_sn',
          label: '产品编码'
        },
        {
          prop: 'attribute_name',
          label: '规格',
        },
        {
          prop: 'unit_name',
          label: '单位',
        },
        {
          prop: 'factory_name',
          label: '生产厂家'
        },
        {
          prop: 'promotion_available_stock',
          label: '库存数量'
        },
        {
          prop: 'whole_price',
          label: '供应价'
        },
        {
          prop: 'ladder_price',
          label: '拼团价'
        },
        {
          prop: 'channel',
          label: '发布渠道'
        }
      ]
    }
  }
}
</script>
```

## tableColumnsItem 表格列配置
> 这里的 `tableColumnsItem` 并非真的有这个属性，而是代指 `tableColumns` 的每个子元素、表示的是每一列的具体配置信息

### prop 渲染字段
### label 表头文本信息
### width 宽度
### minWidth 最小宽度
### maxWidth 最大宽度
### type 列类型
### slot 列插槽

### handleButton 操作按钮集合
### handleButtonItem 操作按钮配置
#### icon 图标名称
#### content 提示文本
#### type 风格
#### event 回调函数
#### isShow 是否显示


## floatButtonSet 浮动按钮

## searchBarSet 搜索栏
## paginationSet 分页配置

## loading 加载动画

- 类型: `Boolean`
- 必传: `否`

##### 用法
```vue
<template>
  <table-page title="产品列表" :tableData="tableData" :loading="loading"></table-page>
</template>

<script type="text/ecmascript-6">
import tablePage from '@/components/TablePage'

export default {
  components: { tablePage },
  data() {
    return {
      tableData: [],
      loading: false
    }
  }
}
</script>
```

```html run
<template>
  <table-page title="产品列表" :tableData="tableData" :loading="loading"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  provide() {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'birthday',
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
          label: '联系地址'
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get('https://mock.ogliu.com/mock/618484ed957ff105d1b54bad/api/list').then(response => {
        this.tableData = response.data.data
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
```

# 更新预告
> 持续开发、更新、优化，暂时计划要实现的功能如下:

- 新增获取数据之前事件
- 新增获取数据完成时事件
- 新增获取数据失败时事件

- 搜索栏新增高级搜索
- 搜索栏新增更多控件类型的搜索项
- 搜索栏新增插槽
- 浮动按钮新增更多控件类型的按钮项
- 浮动按钮新插槽
- 表格新增批量操作
- 表格新增筛选列功能

# 更新日志
- 暂无日志
