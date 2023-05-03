<script setup lang='ts'>
import type { IHomeInfo, ICountdown } from '@/types'
import HomeHeader from './components/HomeHeader.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import JLoadingView from '@/components/JLoadingView.vue'
import HomeTransformer from './components/HomeTransformer.vue'

const recomments = [
  {
    value: 1,
    label: '奶茶'
  },
  {
    value: 2,
    label: '烤肉'
  }
]

const [isSearchViewShown, toggleSearchView] = useToggle(false)

const { data, pending}  = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: [],
} as IHomeInfo)


</script>

<template>
  <div class="home-page">
    <HomeHeader :recomments="recomments" @searchClick="toggleSearchView" />
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <JLoadingView :loading="pending" type="skeleton">
      <div class="home-page__banner">
        <img v-for="item in data.banner" :key="item.imgUrl" src="item.imgUrl" alt="">
      </div>
      <HomeTransformer :data="data.transformer" />
    </JLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh
}

.fade {
  &-enter-active, &-leave-active {
    transition: opacity 0.5s ease;
  }
  &-enter-form, &-leave-to {
    opacity: 0;
  }
}
</style>
