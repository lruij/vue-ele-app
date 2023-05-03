<script setup lang='ts'>

interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
}

defineProps<IProps>()

</script>

<template>
  <div v-if="loading" class="j-loading-view">
    <slot name="template">
      <div v-if="type === 'loading'" class="loading-wrapper">
        <VanLoading />
      </div>
      <div v-if="type === 'skeleton'" class="skeleton-wrapper">
        <VanSkeleton :row="10" />
        <VanSkeleton :row="5" title avatar/>
        <VanSkeleton :row="5" title />
      </div>
    </slot>
  </div>
  <slot v-else></slot>
</template>

<style lang='scss' scoped>
.j-loading-view {
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }

  .skeleton-wrapper {
    padding: 20px 10px;
  }
}
</style>
