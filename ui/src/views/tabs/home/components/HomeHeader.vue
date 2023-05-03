<script setup lang='ts'>
import { ref } from 'vue'
import type { ISearchRecomment } from '@/types'
import JSearch from '@/components/JSearch.vue'

interface IProps {
  recomments: ISearchRecomment[]
}

defineProps<IProps>()

interface IEmits {
  (e: 'searchClick'): void
}

const emits = defineEmits<IEmits>()

const searchValue = ref('test')

</script>

<template>
  <div class="header">
    <VanNavBar :border="false">
      <template #left>
        <VanIcon name="location-o" size="18" />
        <span>广州天河城二楼</span>
      </template>
      <template #right>
        <VanIcon name="cart-o" size="18" />
        <VanIcon name="comment-o" badge="9" size="18" />
      </template>
    </VanNavBar>
    <!-- <Search shape="round" placeholder="奶茶 满35减8">
       <template #right-icon>
        <div>搜索</div>
      </template>
    </Search> -->
    <JSearch v-model="searchValue" shape="round" placeholder="奶茶 满35减8" @inputClick="emits('searchClick')">
      <template #right-icon>
        <div @click="emits('searchClick')">搜索</div>
      </template>
    </JSearch>
    <div class="header-recommend">
      <VanTag v-for="rec in recomments" :key="rec.value" round size="medium">{{ rec.label }}</VanTag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  span {
    color: white
  }

  .van-icon:nth-child(1) {
    margin-right: 12px;
  }

  .van-icon:nth-child(2) {
    margin-right: 8px;
  }

  &-recommend {
    background: var(--ele-header-main-background);
    padding: 4px 10px;

    span {
      margin: 5px;
      background: var(--ele-header-tag-background);
    }
  }
}
</style>
