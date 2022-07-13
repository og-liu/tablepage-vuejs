<!-- Vue Single File Component, Created by liukun on 2021/7/2. -->
<template>
  <div class="table-wrap">
    <div class="batch-handle" v-if="batchHandle.length > 0">
      <div class="select">
        <vue-svg @click.native="clearSlected" class="icon" name="error" width="12" height="12" color="#409EFF"></vue-svg>
        <span>已选</span>
        <b style="color:#E65D6E;font-weight:400">{{selectedRows.length}}</b>
        <span>项目</span>
      </div>
      <ul class="select-list">
        <li v-for="(item, index) in batchHandle" :key="index" @click="doBatchHandle(item)">
          <vue-svg
            :name="item.svg.name"
            :path="item.svg.path || ''"
            :width="item.svg.width || '12'"
            :height="item.svg.height || '12'"
            :color="item.svg.color || '#409EFF'"
            :multipleColor="item.svg.multipleColor || false"
            style="margin-right: 5px;">
          </vue-svg>
          <span>{{item.content}}</span>
        </li>
      </ul>
    </div>

    <!-- 解决 el-tabble 搭配 v-loadding 导致表格上、右外边框渲染问题 -->
    <div v-show="loading" style="position: relative; width: 100%; height: 1px; background-color: #FFF; opacity: 0.9; margin-bottom: -1px; z-index: 1;"></div>
    <div ref="line-y" v-show="loading" style="position: absolute; z-index: 1; width: 1px; height: 609px; background-color: #FFF; opacity: 0.9"></div>

    <el-table v-bind:class="{'scrollSticky': scrollSticky}" ref="tableRef" v-loading="loading" :data="data" border fit style="width: 100%" @row-click="onRowClick" :row-key="rowKey" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" :reserve-selection="true" fixed="left" width="50" v-if="batchHandle.length > 0"></el-table-column>
      <table-column v-for="(item, index) in tableColumns" :key="index" :item="item">
        <template slot-scope="scope">
          <div class="button-list">
            <span v-for="(button, index) in handleButton" :key="index" v-bind:class="button.class || ''">
              <span v-if="(button.isShow && button.isShow(scope.row)) || button.isShow === undefined">
                <span v-permission="button.permission ? button.permission : ''">
                  <el-tooltip
                    style="margin: 0 4px;"
                    :enterable="false"
                    :content="button.content"
                    placement="top">
                    <span class="circle">
                      <el-button v-if="button.svg" style="width: 30px; height: 30px; position: relative;" v-on:click.stop="callbackEvent(button, scope.row, scope.$index)" :type="button.type" size="mini" circle>
                        <vue-svg
                          :name="button.svg.name"
                          :path="button.svg.path || ''"
                          :width="button.svg.width || '16'"
                          :height="button.svg.height || '16'"
                          :color="button.svg.color || ''"
                          :multipleColor="button.svg.multipleColor || false"
                          style="position: absolute; top: 6px; left: 6px;">
                        </vue-svg>
                      </el-button>
                      <el-button v-else style="width: 30px; height: 30px;" v-on:click.stop="callbackEvent(button, scope.row, scope.$index)" :type="button.type" :icon="button.icon" size="mini" circle>
                      </el-button>
                    </span>
                  </el-tooltip>
                </span>
              </span>
            </span>
          </div>
        </template>
      </table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  inject: {
    batchHandle: {
      from: 'batchHandleSet',
      default: () => []
    },
    tableColumns: {
      from: 'tableColumnSet',
      default: () => []
    }
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
    // 表格数据
    tableData: {
      type: Array,
      required: false
    },
    scrollSticky: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    loading: {
      handler (val) {
        if (val) this.$refs['line-y'].style.height = this.$refs.tableRef.fixedHeight.height
      }
    },
    tableData: {
      handler (val) {
        this.$set(this, 'data', val)
      },
      immediate: true,
      deep: true
    },
    tableColumns: {
      handler (val) {
        val.map(i => {
          if(i.renderType === 'button') this.handleButton = i.handleButtonSet
        })
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {},
  data() {
    return {
      selectedRows: [],
      data: [],
      handleButton: []
    }
  },
  components: {
    tableColumn: {
      props: ['item'],
      render: function (h) {
        const item = this.item
        if (item.renderType === 'slot') {
          return h('el-table-column', {
            props: {
              label: item.label,
              align: item.align || 'center',
              width: item.width,
              minWidth: item.minWidth,
              showOverflowTooltip: true,
              renderHeader: item.renderHeader
            },
            scopedSlots: item.slot,
            slot: item.slot
          }, [this.$parent.$parent.$parent.$scopedSlots[item.slot]])
        } else if (item.renderType === 'button') {
          return h('el-table-column', {
            props: {
              label: item.label,
              align: item.align || 'center',
              fixed: 'right',
              width: (item.maximum || item.handleButtonSet.length) * 38 + 22,
              renderHeader: item.renderHeader
            }
          }, [this.$scopedSlots.default])
        } else {
          return h('el-table-column', {
            props: {
              prop: item.prop,
              label: item.label,
              align: item.align || 'center',
              width: item.width,
              minWidth: item.minWidth,
              showOverflowTooltip: true,
              renderHeader: item.renderHeader
            }
          })
        }
      }
    }
  },
  methods: {
    doBatchHandle(item) {
      if (this.selectedRows.length === 0) {
        this.$notify({
          title: '没有选中任何数据',
          type: 'error',
          position: 'bottom-right'
        })
      } else {
        this.$parent.$parent[item.event](item, this.selectedRows)
      }

    },
    callbackEvent(item, row, index) {
      this.$parent.$parent[item.event](row, index)
    },
    onRowClick(row, col, event) {
      this.$refs.tableRef.toggleRowSelection(row)
      this.$emit('toggleRowSelection', row)
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    clearSlected() {
      this.$refs.tableRef.clearSelection()
    }
  }
}
</script>

<style>
.button-list {
  text-align: left; display: flex; align-items: center;
}
</style>

<style>
.scrollSticky .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.scrollSticky .el-table__fixed, .el-table__fixed-right {
  height: 100% !important;
}
</style>

<style>
.batch-handle {
  font-size: 13px;
  margin-bottom: 8px;
  display: flex;
}
.batch-handle .select {
  color: #999;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.batch-handle .select .icon {
  margin-right: 5px;
  cursor: pointer;
}
.batch-handle .select b {
  min-width: 20px;
  text-align: center;
}
.batch-handle .select-list {
  list-style-type: none;
  color: #409EFF;
  display: flex;
  margin: 0;
  padding: 0;
}

.batch-handle .select-list li {
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>

<style>
.table-wrap .el-table--border.el-loading-parent--relative {
  border-color: #EBEEF5!important;
}
</style>
