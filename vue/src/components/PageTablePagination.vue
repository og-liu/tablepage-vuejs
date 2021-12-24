<!-- Vue Single File Component, Created by liukun on 2021/7/2. -->
<template>
  <div v-if="show" class="panel-footer" v-sticky  sticky-offset="offset" sticky-side="bottom">
    <div style="position: relative;" class="footer-wrap">

      <!-- 返回按钮 -->
      <el-button v-if="backButton" style="margin-left: 15px;" size="medium" @click="goBack">返回</el-button>

      <!-- 横向滚动条 -->
      <overlay-scrollbars v-if="scrollSticky" ref="scrollRef" :options="scrollOpt" class="scroll-style os-theme-thick-dark">
        <div v-bind:style="{width: scrollBarWidth}" style="height: 20px;"></div>
      </overlay-scrollbars>

      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pagination.current"
          :page-size="pagination.size"
          :total="pagination.total"
          background
          :page-sizes="pagination.sizes"
          :layout="pagination.layout">
        </el-pagination>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Pagination',
  mounted () {
    if (this.scrollSticky) this.scrollEventListener()
  },
  data() {
    return {
      scrollOpt: {},
      show: false,
      pagination: {}
    }
  },
  inject: {
    paginationSet: {
      from: 'paginationSet',
      default: () => []
    }
  },
  computed: {
    scrollBarWidth: function () {
      return this.$parent.$children[2].$refs.tableRef.bodyWidth
    },
    computedPaginationSet() {
      if (typeof this.paginationSet === 'function') {
        return this.paginationSet()
      } else {
        return this.paginationSet
      }
    }
  },
  watch: {
    computedPaginationSet: {
      handler (val) {
        this.show = !!Object.keys(val).length
        this.pagination = Object.assign({
          current: 1,
          size: 10,
          total: 0,
          sizes: [10, 20, 30, 50],
          layout: 'total, sizes, prev, pager, next, jumper'
        }, val)
      },
      immediate: true,
      deep: true
    }
  },
  props: {
    backButton: {
      type: Boolean,
      default: false
    },
    scrollSticky: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollEventListener() {
      this.scrollOpt = {
        callbacks: {
          onScroll: () => {
            const positionX = this.$refs.scrollRef.osInstance().scroll().position.x
            const tableHead = this.$parent.$children[2].$el.getElementsByClassName('el-table__header-wrapper')[0]
            const tableBody = this.$parent.$children[2].$el.getElementsByClassName('el-table__body-wrapper')[0]
            tableHead.scrollLeft = positionX
            tableBody.scrollLeft = positionX
          }
        }
      }
    },
    goBack() {
      this.$emit('goBack')
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

<style>
.footer-wrap {
  display: flex;
  align-items: center;
}
.footer-wrap .scroll-style {
  position: absolute;
  width: calc(100% - 31px);
  height: 20px;
  top: -30px;
  left: 15px;
}
.footer-wrap .pages {
  margin-top: 0;
}

.os-theme-thick-dark > .os-scrollbar {
  padding: 5px;
}
.os-theme-thick-dark > .os-scrollbar:before {
  content: '';
  display: block;
  position: absolute;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  top: 2px;
  bottom: 2px;
  right: 2px;
  left: 2px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.os-theme-thick-dark > .os-scrollbar:hover:before {
  border: 1px solid rgba(0, 0, 0, 0.16);
}
.os-theme-thick-dark > .os-scrollbar.active:before {
  border: 1px solid rgba(0, 0, 0, 0.24);
}
.os-theme-thick-dark > .os-scrollbar-horizontal {
  right: 18px;
  height: 18px;
}
.os-theme-thick-dark > .os-scrollbar-vertical {
  bottom: 18px;
  width: 18px;
}
.os-theme-thick-dark.os-host-rtl > .os-scrollbar-horizontal {
  left: 18px;
  right: 0;
}
.os-theme-thick-dark > .os-scrollbar-corner {
  height: 18px;
  width: 18px;
  background-color: transparent;
}
.os-theme-thick-dark > .os-scrollbar > .os-scrollbar-track {
  background: transparent;
}
.os-theme-thick-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}
.os-theme-thick-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover {
  background: rgba(0, 0, 0, 0.6);
}
.os-theme-thick-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active {
  background: rgba(0, 0, 0, 0.8);
}
.os-theme-thick-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {
  min-width: 30px;
}
.os-theme-thick-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {
  min-height: 30px;
}
.os-theme-thick-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -3px;
  bottom: -5px;
  display: block;
}
.os-theme-thick-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {
  top: -3px;
  bottom: -5px;
}
.os-theme-thick-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {
  left: -3px;
  right: -5px;
}
.os-theme-thick-dark.os-host-rtl > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {
  right: -3px;
  left: -5px;
}
.os-theme-thick-dark.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
  transition: background 0.3s;
  cursor: move;
}
.os-theme-thick-dark.os-host-transition > .os-scrollbar:before {
  transition: border 0.3s;
}
</style>
