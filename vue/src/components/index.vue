<!-- Vue Single File Component, Created by liukun on 2021/7/1. -->
<template>
  <div id="TablePage">
    <div class="panel">
      <div class="panel-heading">
        <div class="panel-title tip-header">
          <div class="title tip-title">
            <h3>{{ title }}</h3>
            <span v-if="subtitle" class="tip">{{ subtitle }}</span>
          </div>
          <div class="float-btn">
            <float-button></float-button>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <slot></slot>
        <search-bar @onSearch="onSearch" @onClear="onClear"></search-bar>
        <table-layout
          :tableData="tableData"
          :loading="loading"
          :row-key="rowKey"></table-layout>
      </div>
      <table-pagination
        @sizeChange="sizeChange"
        @currentChange="currentChange"
        :backButton="backButton"
        @goBack="goBack">
      </table-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import floatButton from './PageFloatButton'
import searchBar from './PageSearchBar'
import tableLayout from './PageTableLayout'
import tablePagination from './PageTablePagination'

export default {
  name: 'table-page',
  components: {
    floatButton,
    searchBar,
    tableLayout,
    tablePagination
  },
  data() {
    return {}
  },
  props: {
    rowKey: {
      type: String,
      default: function() {
        return 'id'
      }
    },
    loading: {
      type: Boolean
    },
    // 页面标题
    title: {
      type: String,
      required: true
    },
    // 页面副标题
    subtitle: {
      type: String,
      required: false
    },
    // 浮动按钮
    floatButtonList: {
      type: Array,
      required: false
    },
    // 表格数据
    tableData: {
      type: Array,
      required: true
    },
    backButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSearch(obj) {
      this.$emit('onSearch', obj)
    },
    onClear(obj) {
      this.$emit('onClear')
    },
    goBack(size) {
      this.$emit('goBack', size)
    },
    sizeChange(size) {
      this.$emit('sizeChange', size)
    },
    currentChange(page) {
      this.$emit('currentChange', page)
    }
  }
}
</script>

<style lang="less">
#TablePage {
  .panel {
    position: relative;
    margin-bottom: 15px;
    border-width: 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 22px rgba(102, 177, 255, 0.08);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &.fixed-panel {
      height: 100%;
      overflow: scroll;
    }
    .panel-heading {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      box-shadow: 0 4px 22px rgba(102, 177, 255, 0.09);
      position: relative;
      z-index: 1;
      .panel-title {
        display: block;
        padding: 15px 15px;
        font-size: 18px;
        color: #37474f;
        margin-top: 0;
        margin-bottom: 0;
      }
      .tip-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tip-title {
          display: flex;
          align-items: end;
          h3 {
            margin:  0;
            font-size: 18px;
          }
          .tip {
            font-weight: 900;
            font-size: 14px;
            color: #666666;
            margin-left: 10px;
            margin-top: 10px;
          }
        }
      }
    }
    .panel-body {
      position: relative;
      padding: 15px 15px 20px;
      &.no-padding {
        padding:15px 0;
      }
      &[min-height] {
        min-height: 300px;
      }
    }
    .panel-footer {
      transition:  width 0.1s linear;
      padding: 12px 0!important;
      background-color: #fff;
      box-shadow: 0 -4px 22px rgba(102, 177, 255, 0.09);
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      width: auto;
      .pages {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
