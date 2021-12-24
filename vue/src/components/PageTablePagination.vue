<!-- Vue Single File Component, Created by liukun on 2021/7/2. -->
<template>
  <div v-if="show" class="panel-footer" v-sticky  sticky-offset="offset" sticky-side="bottom">
    <div style="position: relative;" class="go-back">
      <el-button style="margin-left: 15px;" v-if="backButton" size="medium" @click="goBack">返回</el-button>
      <overlay-scrollbars v-if="scrollSticky" ref="scrollRef" :options="scrollOpt" class="scroll-style">
        <div v-bind:style="{width: scrollBarWidth}" style="height: 10px; padding: 0 15.5px"></div>
      </overlay-scrollbars>
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
.scroll-style {
  position: absolute;
  width: 100%;
  height: 10px;
  top: -12px;
  left: 0;
}

.go-back {
  display: flex;
  align-items: center;
}

.go-back .pages {
  margin-top: 0;
}
</style>
