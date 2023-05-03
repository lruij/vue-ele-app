<script setup lang="ts">
import JSearch from '@/components/JSearch.vue'
import { ref, computed, watch } from 'vue'
import { fetchSearchData } from '@/api/search'
import type { ISearchResult } from '@/types'
import { useToggle } from '@/use/useToggle'
import { useDebounce } from '@/use/useDebounce'

interface IEmits {
  (e: 'cancel'): void
}

const emits = defineEmits<IEmits>()

const searchValue = ref('')
const searchResult = ref([] as ISearchResult[])

const [INIT, DONE, DOING] = [-1, 0, 1]
const searchStatus = ref(INIT)

const [isHistoryTagShown, toggleHistoryTags] = useToggle(false)
const HISTORY_TAGS = [
  '比萨',
  '栗子',
  '切果NOW',
  '炒饭',
  '出前一丁',
  '玉米',
  '牛腩',
  '土豆焗饭',
  '烧烤',
  '水果'
]

const historyTags = computed(() => {
  return isHistoryTagShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)
})

const onSearch = async (v?: string | number) => {

  try {
    searchStatus.value = DOING
    const { list } = await fetchSearchData(v as string)
    searchResult.value = list
  } finally {
    searchStatus.value = DONE
  }
}

const onTagClick = (v: string) => {
  searchValue.value = v
  onSearch(v)
}

const debounceValue = useDebounce(searchValue, 1000)

watch(debounceValue, (newVal) => {
    if (!newVal) {
      searchResult.value = []
      return
    }
    onSearch(newVal)
  })

</script>

<template>
  <div class="search-view">
    <JSearch show-action v-model="searchValue" shape="round" placeholder="请输入关键字" @search="onSearch"
      @cancel="emits('cancel')">
    </JSearch>
    <div v-if="!searchValue" class="search-view__history">
      <div class="label">历史搜索</div>
      <TransitionGroup name="list">
        <div class="history-tag" v-for="item in historyTags" :key="item" @click="onTagClick(item)">
          {{ item }}
        </div>
        <div class="history-tag" key="arrow" @click="toggleHistoryTags">
          <VanIcon name="arrow-up" v-if="isHistoryTagShown" />
          <VanIcon name="arrow-down" v-else />
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="search-view__result">
      <div class="searching" v-if="searchStatus == DOING">正在搜索中～</div>
      <template v-if="searchStatus == DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ v.label }}</div>
          <div class="count">约 {{ v.resultCount }} 个结果</div>
        </div>
        <div class="no-result" v-if="!searchResult.length">暂无结果</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;

  &__history {
    padding: var(--van-padding-sm);

    .label {
      margin-bottom: var(--van-padding-xs);
    }

    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);

      .name {
        flex: 1;
        padding-left: 6px;
      }

      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }

    .no-result,
    .searching {
      font-size: 12px;
      padding: 100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}

.list {

  &-enter-active,
  &-leave-active {
    transition: all 1s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
