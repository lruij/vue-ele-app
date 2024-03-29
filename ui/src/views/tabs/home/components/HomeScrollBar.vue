<script setup lang='ts'>
import type { IScrollBarInfo } from '@/types'
import { ref, onMounted } from 'vue'
import { useInterval } from '@/use/useInterval'
import { useTimeout } from '@/use/useTimeout'

interface IProps {
  intervalTime?: number
  transitionTime?: number
  height?: number
  data: IScrollBarInfo[]
}

const props = withDefaults(defineProps<IProps>(), {
  intervalTime: 3000,
  transitionTime: 1000,
  height: 40
})

const heightPx = `${props.height}px`
const containerRef = ref()

onMounted(() => {
  // 轮播方向为列表整体向上 容器为 containerRef
  // 移动一个元素距离(heightPx)
  // 移动动画时间 (transitionTime)
  // 每个元素都会停留一定时间（intervalTime）
  // 当列表移动到最后一个元素后 第一个元素移动到列表尾部(index >= count)

  // 挂载 container ref
  const container = containerRef.value
  // 列表数量
  const count = container.children.length
  // 第一个元素
  const firstSwipeItem = container.children[0]
  // container 高度
  container.style.height = `${count * props.height}px`
  let index = 0

  useInterval(() => {
    index++
    if (index >= count) {
      firstSwipeItem.style.transform = `translateY(${index * props.height}px)`
      const timer = setTimeout(() => {
        firstSwipeItem.style.transform = ''
        container.style.transform = ''
        container.style.transition = ''
        clearTimeout(timer)
      }, props.transitionTime)
    }
    container.style.transform = `translateY(-${index * props.height}px)`
    container.style.transition = `all linear ${props.transitionTime}ms`
    index = index % count
  }, props.intervalTime)

})
</script>

<template>
  <div class="home-scroll-bar">
    <div class="home-scroll-bar__swipe">
      <div ref="containerRef">
        <div class="swipe-item" v-for="item in props.data" :key="item.type">
          <div class="scroll-bar__info" :class="`scroll-bar__info__${item.type}`">
            <span class="info-badge">{{ item.badge }}</span>
            <span class="info-detail" v-html="item.detail"></span>
            <span class="info-btn j-thin-border">{{ item.btn }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.home-scroll-bar {
  --bean-color: rgb(252, 164, 40);
  --hongbao-color: rgb(252, 68, 25);

  &__swipe {
    background: white;
    border-radius: 8px;
    margin: 5px 10px;
    font-size: 13px;
    position: relative;
    overflow: hidden;
    height: v-bind(heightPx);

    .swipe-item {
      height: v-bind(heightPx);
    }
  }

  .scroll-bar__info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
    height: 100%;

    .info-badge {
      border-radius: 5px;
      padding: 2px 6px;
      color: white;
      margin-right: 6px;
      font-size: 12px;
    }

    .info-detail {
      flex: 1;
    }

    .info-btn {
      padding: 3px 14px;
      font-size: 12px;

      &.op-thin-border:before {
        border-radius: 50px;
      }
    }

    .info-num {
      font-weight: bold;
      margin: 0 2px;
    }

    &__bean {
      .info-badge {
        background: var(--bean-color);
      }

      .info-btn {
        color: var(--bean-color);

        &:before {
          border-color: var(--bean-color);
        }
      }

      .info-num {
        color: var(--bean-color);
      }
    }

    &__hongbao {
      .info-badge {
        background: var(--hongbao-color);
      }

      .info-btn {
        color: var(--hongbao-color);

        &:before {
          border-color: var(--hongbao-color);
        }
      }

      .info-num {
        color: var(--hongbao-color);
      }
    }
  }
}
</style>
