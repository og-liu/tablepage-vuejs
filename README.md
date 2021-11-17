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

> 这是最基本的使用，至少得传入 `title`、`tableData` 以及 `tableColumnSet`，分别表示 `页面标题`、`数据源` 和 `每一列的配置信息`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  provide() {
    return {
      tableColumnSet: [
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
      tableData: [
        {
          name: '大山',
          birthday: '2003-03-29',
          sex: '男',
          phone: '18888888888',
          hobbies: '动漫',
          education: '本科',
          occupation: '程序员',
          address: '广东省 广州市 白云区'
        }
      ]
    }
  }
}
</script>
```

## 综合实例

> 通过传入更多属性以展示一个功能丰富的表格页面, 你可以在下方代码区修改代码进行调试，数据来源 `Easy Mock` 参考文档: https://mock.ogliu.com

```html run { title: '在线预览' }
<template>
  <table-page
    title="高质量人类"
    subtitle="让天下没有难找的对象"
    :tableData="tableData"
    @currentChange="currentChange"
    @sizeChange="sizeChange"
    @onSearch="onSearch"
    @onClear="onClear"
    backButton
    @goBack="goBack"
    :loading="loading">
    <template slot="birthday" slot-scope="scope">
      <el-date-picker size="small" v-model="birthday" type="date" placeholder="选择日期"></el-date-picker>
    </template>
    <template slot="clear">
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
  </table-page>
</template>

<script type="text/ecmascript-6">
export default {
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
      floatButtonSet: [
        {
          renderType: 'button',
          text: '新增高质量人类',
          type: 'primary',
          onClick: this.added
        },
        {
          renderType: 'slot',
          slot: 'clear'
        },
        {
          renderType: 'dropdown',
          text: '导出数据',
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
          renderHeader: this.renderHeader
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
          minWidth: 200,
          label: '联系地址'
        },
        {
          label: '操作',
          renderType: 'button',
          handleButtonSet: [
            {
              content: '编辑',
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
    // 自定义表头
    renderHeader(createElement, { column }) {
      return createElement('span', [
          createElement('span', ['姓名' + ' ']),
          createElement('el-popover', {
            props: {
              placement: 'top',
              trigger: 'hover',
              popperClass: 'titshowTip'
            }}, [createElement('span',
            ['数据来源于 Easy Mock']),
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
    onClear() {
      this.birthday = ''
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
    goBack() {
      console.log('点击了返回按钮')
    },
    doEdit(row, index) {
      console.log('点击了编辑按钮')
    },
    doDel(row, index) {
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
    }
  }
}
</script>
```

# API 使用说明
> 下面将详细介绍组件的每一个 `prop`、`provide`、`event` 的使用， 建议按顺序阅读

## title 页面标题
> 用于展示页面标题，必传属性，每个页面都应该有一个标题

- 传入方式: `Prop`
- 类型: `String`
- 必传: `是`

##### 用法
```vue
<template>
  <table-page title="高质量人类"></table-page>
</template>
```

## subtitle 副标题
> 用于展示副标题，可选属性，不需要不传即可

- 传入方式: `Prop`
- 类型: `String`
- 必传: `否`

##### 用法
```vue
<template>
  <table-page title="高质量人类" subtitle="让天下没有难找的对象"></table-page>
</template>
```

## tableData 表格数据源
> 通过 `接口` 从后端获取的数据源，用于表格展示的数据，和 `tableColumnSet` 搭配使用

- 传入方式: `Prop`
- 类型: `Array`，`对象数组`，每个元素都应该是一个对象，而每个对象表示每行数据
- 必传: `是`

##### 用法
```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山',
          birthday: '2003-03-29',
          sex: '男',
          phone: '18888888888',
          hobbies: '动漫',
          education: '本科',
          occupation: '程序员',
          address: '广东省 广州市 白云区'
        }
      ]
    }
  }
}
</script>
```

## tableColumnSet 表格列集合
> 通过注入的方式对表格每列数据做配置，`tableColumnSet` 只是一个容器，用于存放所有的 `列` 的配置信息

- 传入方式: `Provide`
- 类型: `Array`，`对象数组`，每个元素都应该是一个对象，而每个对象表示每列数据的配置信息
- 必传: `是`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山',
          birthday: '2003-03-29',
          sex: '男',
          phone: '18888888888',
          hobbies: '动漫',
          education: '本科',
          occupation: '程序员',
          address: '广东省 广州市 白云区'
        }
      ]
    }
  },
  provide() {
    return {
      tableColumnSet: [
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
  }
}
</script>
```

## tableColumn 表格列配置
> 这里的 `tableColumn` 并非真的有这个属性，而是代指 `tableColumnSet` 的每个子元素、表示的是每一列的具体配置信息，这里的每个子元素之间的顺序在页面上展示的顺序对应，例如: 我希望在第 3 列展示 `性别`，那么就将 `性别` 相关的配置放在第 3 个子元素位置。

### renderType 列类型

目前表格列的类型分为三种: `普通列`、`操作按钮展示列`、`自定义列`，上述展示的都属于 `普通列`。

- 类型: `String`
- 必传: `否`
- 可选值: `slot（插槽、自定义列）`、`button（操作按钮展示、末位列）`，不传则默认是 `普通列`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '自定义列',
              renderType: 'slot'
            },
            {
              label: '操作',
              renderType: 'button'
            }
          ]
        }
      }
    }
  }
}
</script>
```

### label 表头文本信息

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名'
            }
          ]
        }
      }
    }
  }
}
</script>
```

### renderHeader 自定义表头

有时候表头比较特殊，光展示文本不满足需求，那么就可以不传 `label`，使用 `renderHeader` 自定义表头，它接收一个 `render` 函数，作为表头渲染

- 类型: `function`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              prop: 'name',
              renderHeader: this.renderHeader
            }
          ]
        }
      },
      methods: {
        renderHeader(createElement, { column }) {
          return createElement('span', [
            createElement('span', ['姓名']),
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
            ])]
          )
        }
      }
    }
  }
}
</script>
```

### prop 渲染字段

只作用于 `普通列`，因为 `自定义列` 通过插槽渲染字段，而操作列不需要渲染字段，它应该和 `tableData` 对应，例如我希望第一列展示 `姓名`，则需要找到 `tableData` 里 `姓名` 对应的字段赋值给 `prop`

- 类型: `String`
- 必传: `普通列必传`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name'
            }
          ]
        }
      }
    }
  }
}
</script>
```

### width 列宽度

对应列的宽度，可以传数值类型或者字符串类型的数字，带单位（px）也能识别，推荐传数值就好。

- 类型: `String || Number`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              width: 200
            }
          ]
        }
      }
    }
  }
}
</script>
```

### minWidth 列最小宽度

对应列的最小宽度，可以传数值类型或者字符串类型的数字，带单位（px）也能识别，推荐传数值就好。

- 类型: `String || Number`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
            }
          ]
        }
      }
    }
  }
}
</script>
```

### slot 列插槽

在某些时候，我们预设的表格列不满足需求，就需要使用到插槽来实现自定义列, 在接收 `slot` 字段之前，务必先将 `renderType` 的值设置为 `slot`

- 类型: `String`
- 必传: `否`

使用步骤: 
1. 确认需要插入列的位置，例如需要在第 2 列使用自定义列，那么就需要在 `tableColumnSet` 的第 2 个子元素配置插槽。
2. 设置 `renderType` 的值为 `slot`。
3. 设置 `slot` 对应的名称，它将与 `template` 的 `slot` 字段对应。
4. 在组件体内开启 `template`，设置模板名称。
5. 编写自定义内容。

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData">
    <!-- 4. 在组件体内开启 template，注意它的 slot 属性值，必须与第上一步设置的名称一致 -->
    <template slot="sex" slot-scope="scope">
      <!-- 5. 编写自定义的内容 -->
      <div style="color: #409eff">{{scope.row.name}}</div>
    </template>
  </table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
            },
            {
              // 1. 确认位置，在此处开启插槽列的配置
              label: '性别',
              renderType: 'slot', // 2. 设置 renderType 的值为 slot, 告诉组件要以插槽的模式来渲染
              slot: 'sex', // 3. 设置当前插槽列对应的模板名称
            }
          ]
        }
      }
    }
  }
}
</script>
```

### handleButtonSet 操作按钮集合
在表格末尾一列可以设置 `操作按钮集合` 列，首先需要把 `renderType` 的值设置为 `button`，然后它将接收一个 `handleButtonSet` 字段，它是一个对象数组，数组内每一个对象代表着一个按钮的配置，为了方便理解，下面我将以 `handleButton` 来表示这个对象，当然它的顺序也对应着页面上渲染的顺序，与 `tableColumnSet` 一样，`handleButtonSet` 只是一个容器，按钮的具体配置都落实在它的子元素 `handleButton` 上，`操作按钮` 可以获取当前行的数据做对应的操作，整个操作列在页面宽度不够的时候会固定展示在右侧。

### handleButton 操作按钮配置

> 这里的 `handleButton` 并非真的有这个属性，而是代指 `handleButtonSet` 的每个子元素，表示的是每一个操作按钮的配置信息。

#### content 提示文本

按钮提示文本，鼠标滑动到按钮上浮现的提示文字

- 类型: `String`
- 必传: `是`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
            },
            {
              label: '操作',
              renderType: 'button',
              handleButtonSet: [
                {
                  content: '编辑'
                }
              ]
            }
          ]
        }
      }
    }
  }
}
</script>
```

#### icon 图标名称

字体图标名称， `Element UI` 图标。

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
            },
            {
              label: '操作',
              renderType: 'button',
              handleButtonSet: [
                {
                  content: '编辑',
                  icon: 'el-icon-edit'
                }
              ]
            }
          ]
        }
      }
    }
  }
}
</script>
```

#### svg 图标配置 (推荐使用)

svg 图标配置，它与 `icon` 二选一即可，基于插件 `svg-vuejs`, 它接收一个对象，对象内部接收所有插件提供的参数，详情参考文档: https://svg.ogliu.com

- 类型: `Object`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
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
                  }
                }
              ]
            }
          ]
        }
      }
    }
  }
}
</script>
```

#### type 风格

按钮的颜色风格, 沿用 `Element ui` 按钮风格。

- 类型: `String`
- 必传: `否`
- 可选值: `primary`, `success`, `info`, `warning`, `danger`, 不传参数则为黑白按钮。

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
            },
            {
              label: '操作',
              renderType: 'button',
              handleButtonSet: [
                {
                  content: '编辑',
                  icon: 'el-icon-edit',
                  type: 'primary'
                }
              ]
            }
          ]
        }
      }
    }
  }
}
</script>
```

#### event 回调函数

点击按钮触发的回调函数，需要注意的是这里接收的是回调函数的函数名，而并非函数体，对应的回调函数应该写在 `methods` 中，它有两个预设参数 `row`、`index` 可以获取当前行的数据和索引

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
            },
            {
              label: '操作',
              renderType: 'button',
              handleButtonSet: [
                {
                  content: '编辑',
                  icon: 'el-icon-edit',
                  type: 'primary',
                  event: 'doEdit'
                }
              ]
            }
          ]
        }
      },
      methods: {
        doEdit(row, index) {
          console.log('点击了编辑按钮')
        }
      }
    }
  }
}
</script>
```

#### isShow 是否显示

当前按钮是否显示，可用于做权限限制，这里接收返回值为 `Boolean` 布尔值的回调函数, 你可以通过回调函数预设的参数 `item` 获取 `当前行数据`。

- 类型: `function`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        {
          name: '大山'
        }
      ],
      provide() {
        return {
          tableColumnSet: [
            {
              label: '姓名',
              prop: 'name',
              minWidth: 200
            },
            {
              label: '操作',
              renderType: 'button',
              handleButtonSet: [
                {
                  content: '编辑',
                  icon: 'el-icon-edit',
                  type: 'primary',
                  event: 'doEdit',
                  // 如果当前行的 name 值为大山，则显示按钮
                  isShow: (item) => item.name === '大山'
                }
              ]
            }
          ]
        }
      },
      methods: {
        doEdit(row, index) {
          console.log('点击了编辑按钮')
        }
      }
    }
  }
}
</script>
```

## floatButtonSet 浮动按钮集合

> 在头部右侧新增浮动按钮，可以配置不同的 `文本内容`，`类型`、`风格（颜色）`、`事件` 等等，暂时可以配置 `普通按钮` 和 `下拉菜单按钮`，如果不满足需求，可利用插槽自定义按钮。

- 传入方式: `Provide`
- 类型: `Array`, `对象数组`，每个元素都应该是一个对象，而每个对象表示每个 `浮动按钮` 的配置信息
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: []
    }
  },
  provide() {
    return {
      floatButtonSet: [
        {
          renderType: 'button',
          text: '新增高质量人类',
          type: 'primary',
          onClick: this.added
        }
      ],
      tableColumnSet: [
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
  methods: {
    added() {
      console.log('点击了新增高质量人类')
    }
  }
}
</script>
```

## floatButton 浮动按钮配置

> 这里的 `floatButton` 并非真的有这个属性，而是代指 `floatButtonSet` 的每个子元素、表示的是每一个 `浮动按钮` 的具体配置信息，这里的每个子元素之间的顺序在页面上展示的顺序对应。

### renderType 浮动按钮类型

目前表格列的类型分为三种: `普通按钮`、`下拉菜单按钮`、`自定义按钮`。

- 类型: `String`
- 必传: `是`
- 可选值: `button (普通按钮)`、`dropdown（下拉菜单按钮）`、`slot（插槽、自定义列）`。

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button'
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown'
            }
          ]
        }
      }
    }
  }
}
</script>
```

### text 按钮文本

只作用于 `button （普通按钮）` 和 `dropdown （下拉菜单按钮）`

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类'
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据'
            }
          ]
        }
      }
    }
  }
}
</script>
```

### type 风格

按钮的颜色风格, 沿用 `Element ui` 按钮风格, 只作用于 `button （普通按钮）` 和 `dropdown （下拉菜单按钮）`。

- 类型: `String`
- 必传: `否`
- 可选值: `primary`, `success`, `info`, `warning`, `danger`, 不传参数则为黑白按钮。

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类',
              type: 'primary'
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据',
              type: 'info'
            }
          ]
        }
      }
    }
  }
}
</script>
```

### onClick 按钮点击事件

接收一个函数，在按钮点击时执行，作用于 `button (普通按钮)`。

- 类型: `Function`
- 必传: `是`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类',
              type: 'primary',
              onClick: this.added
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据',
              type: 'info'
            }
          ]
        }
      }
    }
  },
  methods: {
    added() {
      console.log('新增高质量人类名单')
    }
  }
}
</script>
```

### icon 图标名称

字体图标名称， `Element UI` 图标, 只作用于 `button (普通按钮)`。

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类',
              type: 'primary',
              onClick: this.added,
              icon: 'el-icon-edit'
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据',
              type: 'info'
            }
          ]
        }
      }
    }
  },
  methods: {
    added() {
      console.log('新增高质量人类名单')
    }
  }
}
</script>
```

### menuSet 下拉菜单项集合

接收一个 `对象数组`, 数组内每一个 `对象` 表示一个 `下拉菜单项`，只作用于 `dropdown （下拉菜单按钮）`。

- 类型: `Array`
- 必传: `类型为 dropdown 时必传`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类',
              type: 'primary',
              onClick: this.added
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据',
              type: 'info',
              menuSet: [
                {}
              ]
            }
          ]
        }
      }
    }
  },
  methods: {
    added() {
      console.log('新增高质量人类名单')
    }
  }
}
</script>
```

### menu 下拉菜单项配置

这里的 `menu` 并非真的有这个属性，而是代指 `menuSet` 的每个子元素，表示的是每一个 `下拉菜单项`。

#### text 下拉菜单项按钮文本

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类',
              type: 'primary',
              onClick: this.added
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据',
              type: 'info',
              menuSet: [
                {
                  text: '导出高质量男孩'
                }
              ]
            }
          ]
        }
      }
    }
  },
  methods: {
    added() {
      console.log('新增高质量人类名单')
    }
  }
}
</script>
```

#### onClick 下拉菜单项按钮点击事件

接收一个函数，在下拉菜单项按钮点击时执行。

- 类型: `Function`
- 必传: `是`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类',
              type: 'primary',
              onClick: this.added
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据',
              type: 'info',
              menuSet: [
                {
                  text: '导出高质量男孩',
                  onClick: this.leadingOutBoys
                },
                {
                  text: '导出高质量女孩',
                  onClick: this.leadingOutGirls
                }
              ]
            }
          ]
        }
      }
    }
  },
  methods: {
    added() {
      console.log('新增高质量人类名单')
    },
    leadingOutBoys() {
      console.log('导出高质量男孩名单')
    },
    leadingOutGirls() {
      console.log('导出高质量女孩名单')
    }
  }
}
</script>
```

### disabled 禁用按钮

只作用于 `button （普通按钮）` 和 `dropdown （下拉菜单按钮）`。

- 类型: `Boolean`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'button',
              text: '新增高质量人类',
              type: 'primary',
              onClick: this.added,
              disabled: true
            },
            {
              renderType: 'slot'
            },
            {
              renderType: 'dropdown',
              text: '导出数据',
              type: 'info',
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
              disabled: false
            }
          ]
        }
      }
    }
  },
  methods: {
    added() {
      console.log('新增高质量人类名单')
    },
    leadingOutBoys() {
      console.log('导出高质量男孩名单')
    },
    leadingOutGirls() {
      console.log('导出高质量女孩名单')
    }
  }
}
</script>
```

### slot 浮动按钮插槽

在某些时候，我们预设的按钮不满足需求，就需要使用到插槽来实现自定义按钮，在接收 `slot` 字段之前，务必先将 `renderType` 的值设置为 `slot`

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData">
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
  </table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          floatButtonSet: [
            {
              renderType: 'slot',
              slot: 'more'
            }
          ]
        }
      }
    }
  }
}
</script>
```

## searchBarSet 搜索栏（集合）

> 搜索栏提供各种 `类型` 控件的搜索项，包括 `普通文本框`、`下拉菜单` 等等，点击 `查询按钮` 将会暴露出 `查询事件`，具体代码需要自行编写，点击重置则清空搜索栏，它将出现在表格上方， 它是一个容器，由一个或者多个 `搜索项` 组成， 如果内置的 `搜索控件` 不满足需求，可利用插槽自定义 `搜索项`。

- 传入方式: `Provide`
- 类型: `Array`, `对象数组`，每个元素都应该是一个对象，而每个对象表示每个 `搜索项` 的配置信息
- 必传: `否`

## searchEvents 搜索栏事件

> 在点击 `查询`、`重置` 按钮时, 会暴露出对应的事件

### onSearch 点击 `查询` 按钮时

- 传入方式 `prop`
- 类型: `Function`
- 必传: `是`
- 回调参数: `search` 包含内置 `搜索项` 绑定的值

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData" @onSearch="onSearch"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

### onClear 点击 `重置` 按钮时

- 传入方式 `prop`
- 类型: `Function`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData" @onSearch="onSearch" @onClear="onClear"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    },
    onClear() {
      // 这里可以重置一些自定义搜索项的值
    }
  }
}
</script>
```

## searchItem 搜索项配置

> 这里的 `searchItem` 并非真的有这个属性，而是代指 `searchBarSet` 的每个子元素、表示的是每一个 `搜索项` 的具体配置信息，这里的每个子元素之间的顺序在页面上展示的顺序对应。

### renderType 搜索项类型

目前搜索项内置的控件类型分为三种: `input （输入框）`、`select （选择器）`、`slot (自定义搜索项)`。

- 类型: `String`
- 必传: `是`
- 可选值: `input （输入框）`、`select （选择器）`、`slot (自定义搜索项)`。

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"  @onSearch="onSearch"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          searchBarSet: [
            {
              renderType: 'input'
            },
            {
              renderType: 'select'
            },
            {
              renderType: 'slot'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

### label 搜索项标签

出现在每个 `搜索项` 控件左侧的文本信息

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"  @onSearch="onSearch"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          searchBarSet: [
            {
              renderType: 'input',
              label: '姓名'
            },
            {
              renderType: 'select',
              label: '学历'
            },
            {
              renderType: 'slot',
              label: '出生日期'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

### key 搜索项绑定字段

只作用于 `input （输入框）`、`select （选择器）`

- 类型: `String`
- 必传: `是`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"  @onSearch="onSearch"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          searchBarSet: [
            {
              renderType: 'input',
              label: '姓名',
              key: 'name'
            },
            {
              renderType: 'select',
              label: '学历',
              key: 'education'
            },
            {
              renderType: 'slot',
              label: '出生日期'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

### placeholder 搜索项占位符

只作用于 `input （输入框）`、`select （选择器）`

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"  @onSearch="onSearch"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          searchBarSet: [
            {
              renderType: 'input',
              label: '姓名',
              key: 'name',
              placeholder: '请输入姓名'
            },
            {
              renderType: 'select',
              label: '学历',
              key: 'education',
              placeholder: '请选择学历'
            },
            {
              renderType: 'slot',
              label: '出生日期'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

### width 搜索项控件宽度

只作用于 `input （输入框）`、`select （选择器）`

- 类型: `Number`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"  @onSearch="onSearch"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          searchBarSet: [
            {
              renderType: 'input',
              label: '姓名',
              key: 'name',
              placeholder: '请输入姓名',
              width: 240
            },
            {
              renderType: 'select',
              label: '学历',
              key: 'education',
              placeholder: '请选择学历',
              width: 240
            },
            {
              renderType: 'slot',
              label: '出生日期'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

### options 搜索项选项配置

只作用于 `select （选择器）`

- 类型: `Array`, `对象数组`，数组内的每个对象表示一个 `选项`，该对象接收两个参数: `value`, `label`, 分别表示当前选项的值和名称
- 必传: 类型为 `select （选择器）` 时，必传

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"  @onSearch="onSearch"></table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          searchBarSet: [
            {
              renderType: 'input',
              label: '姓名',
              key: 'name',
              placeholder: '请输入姓名',
              width: 240
            },
            {
              renderType: 'select',
              label: '学历',
              key: 'education',
              placeholder: '请选择学历',
              width: 240,
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
              renderType: 'slot',
              label: '出生日期'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

### slot 搜索项插槽

在某些时候，我们预设的 `搜索项` 不满足需求，就需要使用到插槽来实现 `自定义搜索项`，在接收 `slot` 字段之前，务必先将 `renderType` 的值设置为 `slot`

- 类型: `String`
- 必传: `否`

```vue
<template>
  <table-page title="高质量人类" :tableData="tableData"  @onSearch="onSearch">
    <template slot="birthday" slot-scope="scope">
      <el-date-picker size="small" v-model="birthday" type="date" placeholder="选择日期"></el-date-picker>
    </template>
  </table-page>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      provide() {
        return {
          searchBarSet: [
            {
              renderType: 'slot',
              slot: 'birthday',
              label: '出生日期'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch(search) {
      console.log(search)
    }
  }
}
</script>
```

## paginationSet 分页配置

## loading 加载动画

表格数据加载动画

- 类型: `Boolean`
- 必传: `否`

##### 用法
```vue
<template>
  <table-page title="高质量人类" :tableData="tableData" :loading="loading"></table-page>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
      tableData: [],
      loading: false
    }
  }
}
</script>
```

## backButton 返回按钮

表格底部返回上一页按钮，它会暴露一个回调事件 `goBack`，需结合使用。

- 类型: `Boolean`
- 必传: `否`

##### 用法
```vue
<template>
  <table-page 
    title="高质量人类"
    :tableData="tableData"
    :loading="loading"
    backButton
    @goBack="goBack">
  </table-page>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    goBack() {
      console.log('点击了返回按钮')
    }
  }
}
</script>
```

# 更新日志

## 2021-11-17

- 搜索栏新增（自定义搜索项）插槽
- 浮动按钮新增（自定义按钮项）插槽
- 浮动按钮新增 `disabled` 禁用属性
- 搜索栏重置按钮新增事件 `@onClear`
- 命名规范化
  1. 防止与 `ElementUI` 属性冲突，原本控件类型 `type` 更改为 `renderType`
  2. 集合统一添加 `Set` 后缀
  3. 加强语义化，下拉菜单按钮 `list` 更改为 `menuSet`
- 为了化繁为简，更好的分类处理，将原本 `分页子组件` 完全重写，使用 `Provide` 传入参数
- 新增副标题 `subtitle`

<hr/>

# 更新预告

> 持续开发、更新、优化，暂时计划要实现的功能如下:

- 新增横向滚动条
- 搜索栏新增高级搜索
- 表格新增批量操作
- 表格新增筛选列功能
- 浮动按钮新增svg图标

- 搜索栏新增更多控件类型的搜索项
- 浮动按钮新增更多控件类型的按钮项
