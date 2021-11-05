<!-- Vue Single File Component, Created by liukun on 2021/7/2. -->
<template>
  <el-form :inline="true" v-if="SearchItems.length">
    <search-item
      v-for="(item, index) in SearchItems"
      :key="index"
      :index="index"
      :item="item"
      @inputchange="inputchange"
      @optionChange="optionChange">
    </search-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click.native="onSearch" plain size="small">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button icon="el-icon-delete" size="small" @click.native="onClear">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'zheshiyigemingzi',
  data() {
    return {
      SearchItems: [],
      vm: this
    }
  },
  watch: {
    searchBarSet: {
      handler (n, o) {
        this.SearchItems = n
        // 允许输入框不传 value 值，默认为空
        this.SearchItems.map((item, index) => {
          if((item.type === 'input' || item.type === 'select') && item.value === undefined) {
            this.$set(this.SearchItems[index], 'value', '')
          }
        })
      },
      immediate: true,
      deep: true
    }
  },
  inject: {
    searchBarSet: {
      from: 'searchBarSet',
      default: () => []
    }
  },
  components: {
    searchItem: {
      props: ['item', 'index'],
      render: function (h) {
        const self = this
        const item = this.item
        const index = this.index

        const vm = this.$parent.$parent

        switch (item.type) {
          case 'input':
            return vm.renderInput(h, item, index, self)
          case 'select':
            return vm.renderSelect(h, item, index, self)
          default:
            break
        }
      }
    }
  },
  methods: {
    // input 输入框渲染
    renderInput(h, item, index, self) {
      return h('el-form-item', {props: {label: item.label}}, [
        h('el-input', {
          attrs: {
            placeholder: item.placeholder
          },
          style: {
            width: `${item.width}px`
          },
          props: {
            clearable: true,
            value: item.value,
            size: 'small'
          },
          on: {
            input: function (event) {
              self.$emit('inputchange', event, index)
            }
          },
          nativeOn: {
            keyup: function (event) {
              if (event.keyCode === 13) {
                self.$parent.$parent.onSearch()
              }
            }
          }
        })
      ])
    },
    // input 输入框双向绑定
    inputchange(val, index) {
      if (val !== '' && val !== null && val !== undefined) val = val.replace(/(^\s*)|(\s*$)/g, '')
      this.SearchItems[index].value = val
    },
    // select 下拉菜单渲染
    renderSelect(h, item, index, self) {
      return h('el-form-item', {
        props: {
          label: item.label
        }
      }, [h('el-select', {
        props: {
          clearable: true,
          value: item.value,
          size: 'small'
        },
        style: {
          width: `${item.width}px`
        },
        on: {
          change: function (event) {
            self.$emit('optionChange', event, index)
          }
        }
      }, item.options.map(function (option) {
        return h('el-option', {
          props: {
            label: option.label,
            value: option.value
          }
        })
      }))])
    },
    // select 下拉菜单 双向绑定
    optionChange(val, index) {
      this.SearchItems[index].value = val
    },
    // 重置搜索栏数据
    onClear() {
      this.SearchItems.map(item => item.value = '')
      this.onSearch()
    },
    // 查询数据 将搜索条数据组装传递到最外层
    onSearch() {
      const params = new Map()
      let obj = Object.create(null)

      this.SearchItems.map(item => {
        params.set([item.key], item.value)
      })

      for (let [k, v] of params) {
        if (v !== '') obj[k] = v
      }

      this.$emit('onSearch', obj)
    }
  }
}
</script>
