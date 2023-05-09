<script setup lang='ts'>
import type { IHomeInfo, ICountdown } from '@/types'
import HomeHeader from './components/HomeHeader.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import JLoadingView from '@/components/JLoadingView.vue'
import HomeTransformer from './components/HomeTransformer.vue'
import HomeScrollBar from './components/HomeScrollBar.vue'
import HomeCountDown from './components/HomeCountDown.vue'
import JSwipe from '@/components/swipe/JSwipe'
import JSwipeItem from '@/components/swipe/JSwipeItem'

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

const { data, pending } = useAsync(fetchHomePageData, {
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
      <HomeScrollBar :data="data.scrollBarInfoList" />
      <div class="home-page__activity">
        <HomeCountDown :data="data.countdown" />

        <JSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
          <JSwipeItem v-for="v in data.activities" :key="v">
            <img :src="v" />
          </JSwipeItem>
        </JSwipe>
      </div>
    </JLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: var(--j-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }

  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.fade {

  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }

  &-enter-form,
  &-leave-to {
    opacity: 0;
  }
}
</style>
