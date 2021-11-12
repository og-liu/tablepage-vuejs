<!-- Vue Single File Component, Created by liukun on 2021/7/2. -->
<template>
  <div v-if="show" class="panel-footer" v-sticky  sticky-offset="offset" sticky-side="bottom">
    <div style="position: relative;" class="go-back">
      <el-button style="margin-left: 15px;" v-if="backButton" size="medium" @click="goBack">返回</el-button>
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
  data() {
    return {
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
    }
  },
  methods: {
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
.go-back {
  display: flex;
  align-items: center;
}

.go-back .pages {
  margin-top: 0;
}
</style>
