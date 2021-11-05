<!-- Vue Single File Component, Created by liukun on 2021/7/2. -->
<template>
  <transition name="fade" mode="out-in">
    <el-table ref="tableRef" v-loading="loading" :data="data" border fit style="width: 100%">
      <table-column v-for="(item, index) in tableColumns" :key="index" :item="item">
        <template slot-scope="scope">
          <div class="button-list">
            <span v-for="(button, index) in handleButton" :key="index" v-bind:class="button.class || ''">
              <span v-if="(button.isShow && button.isShow(scope.row)) || button.isShow === undefined">
                <el-tooltip
                  style="margin: 0 4px;"
                  :enterable="false"
                  :content="button.content"
                  placement="top">
                  <span class="circle">
                    <el-button v-if="button.svgIcon"
                      style="width: 30px; height: 30px; position: relative;"
                      v-on:click.stop="callbackEvent(button, scope.row, scope.$index)"
                      :type="button.type" size="mini" circle>
                      <vue-svg
                        :name="button.svgIcon.name"
                        :path="button.svgIcon.path || ''"
                        :width="button.svgIcon.width || '16'"
                        :height="button.svgIcon.height || '16'"
                        :color="button.svgIcon.color || ''"
                        :multipleColor="button.svgIcon.multipleColor || false"
                        style="position: absolute; top: 6px; left: 6px;">
                      </vue-svg>
                    </el-button>
                    <el-button v-else
                      style="width: 30px; height: 30px;"
                      v-on:click.stop="callbackEvent(button, scope.row, scope.$index)"
                      :type="button.type" :icon="button.icon" size="mini" circle>
                    </el-button>
                  </span>
                </el-tooltip>
              </span>
            </span>
          </div>
        </template>
      </table-column>
    </el-table>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  inject: {
    tableColumns: {
      from: 'tableColumns',
      default: () => []
    }
  },
  props: {
    loading: {
      type: Boolean
    },
    // 表格数据
    tableData: {
      type: Array,
      required: false
    }
  },
  watch: {
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
          if(i.type === 'button') this.handleButton = i.handleButton
        })
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {},
  data() {
    return {
      data: [],
      handleButton: []
    }
  },
  components: {
    tableColumn: {
      props: ['item'],
      render: function (h) {
        const item = this.item
        if (item.type === 'slot') {
          return h('el-table-column', {
            props: {
              label: item.label,
              align: item.align || 'center',
              width: item.width,
              minWidth: item.minWidth,
              showOverflowTooltip: true
            },
            scopedSlots: item.slot,
            slot: item.slot
          }, [this.$parent.$parent.$parent.$scopedSlots[item.slot]])
        } else if (item.type === 'button') {
          return h('el-table-column', {
            props: {
              label: item.label,
              align: item.align || 'center',
              fixed: 'right',
              // maximum 为最多可共存的按钮个数
              width: (item.maximum || item.handleButton.length) * 38 + 22
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
              showOverflowTooltip: true
            }
          })
        }
      }
    }
  },
  methods: {
    callbackEvent(item, row, index) {
      this.$parent.$parent[item.event](row, index)
    }
  }
}
</script>

<style>
.button-list {
  text-align: left; display: flex; align-items: center;
}
</style>

