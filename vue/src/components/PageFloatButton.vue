<!-- Vue Single File Component, Created by liukun on 2021/7/1. -->
<template>
  <div id="FloatButton" float-right v-if="show">
    <button-list v-for="(item, index) in floatButtonSet" :data="item" :key="index"></button-list>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  inject: {
    // 浮动按钮（集合）信息
    floatButtonSet: {
      from: 'floatButtonSet',
      default: () => []
    }
  },
  computed: {
    // 是否启用浮动按钮
    show: function () {
      return this.floatButtonSet.length > 0
    }
  },
  components: {
    // 渲染单个按钮
    buttonList: {
      functional: true,
      props: ['data'],
      render: function (h, context) {
        const type = context.props.data.type
        switch (type) {
          case 'Button':
            return context.parent.renderButton(h, context)
          case 'Dropdown':
            return context.parent.renderDropdown(h, context)
          default:
            console.error(new Error('按钮类型异常, 请检查是否正确传入 type 参数！'))
            break
        }
      }
    }
  },
  methods: {
    // 普通按钮
    renderButton(h, context) {
      const data = context.props.data
      let directive = {}
      if (this.$root.$options.directives.permission) {
        directive = {
          name: 'permission',
          value: data.permission
        }
      }
      return h('el-button', {
        props: {plain: true, size: 'small', type: data.style, icon: data.icon},
        directives: [directive],
        on: {click: data.onClick}
      }, data.text)
    },
    // 下拉菜单按钮
    renderDropdown(h, context) {
      return h('el-dropdown', {}, [
        this.renderDropdownButton(h, context),
        this.renderDropdownList(h, context)
      ])
    },
    // 下拉菜单按钮
    renderDropdownButton(h, context) {
      const data = context.props.data
      return h('el-button', {
        props: {
          plain: true,
          size: 'small',
          type: data.style
        }
      }, [
        data.text,
        h('i', {'class': {'el-icon-arrow-down': true, 'el-icon--right': true}})
      ])
    },
    // 下拉菜单列表
    renderDropdownList(h, context) {
      let list = context.props.data.list
      let children = []
      list.map(item => children.push(this.renderDropdownItem(h, item)))
      return h('el-dropdown-menu', {attrs: {slot: 'dropdown'}}, children)
    },
    // 下拉菜单列表项
    renderDropdownItem(h, item) {
      return h('el-dropdown-item', {
        nativeOn: {click: item.onClick}
      }, item.text)
    }
  }
}
</script>

<style>
#FloatButton .el-button {
  margin-left: 10px;
}
</style>
