<script setup lang='ts'>
import { Icon } from 'vant'

interface IProps {
  showAction?: boolean
  background?: string
  placeholder?: string
  shape?: string
  modelValue?: string | number
}

const props = defineProps<IProps>()

interface IEmits {
  (e: 'search', v?: string | number): void
  (e: 'cancel'): void
  (e: 'clear'): void
  (e: 'update:modelValue', v?: string | number): void
  (e: 'inputClick'): void
}

const emits = defineEmits<IEmits>()

const onKeyPress = (e: KeyboardEvent) => {
  const ENTER_CODE = 13
  if (e.keyCode == ENTER_CODE) {
    e.preventDefault()
    emits('search', props.modelValue)
  }
}

const onClear = () => {
  emits('update:modelValue', '')
  emits('clear')
}

</script>

<template>
  <div class="j-search" :class="{ 'j-search-show-action': showAction }" :style="{ background }">
    <div class="j-search__content" :class="shape ? `j-search__content--${shape}` : ''">
      <div class="j-cell j-search__field">
        <div class="j-field__left-icon">
          <Icon name="search"  />
        </div>
        <div class="j-cell__value">
          <div class="j-field__body">
            <input type="search" class="j-field__control" :value="modelValue" :placeholder="placeholder"
              @keypress="onKeyPress" @click="emits('inputClick')" @input="(e: any) => emits('update:modelValue', (e.target as HTMLInputElement).value)" />
            <div class="j-field__right-icon" v-if="$slots['right-icon']">
              <slot name="right-icon"></slot>
            </div>
            <Icon name="clear" class="j-field__clear-icon" v-else-if="modelValue" @click="onClear"></Icon>
          </div>
        </div>
      </div>
    </div>
    <div class="j-search__action" v-if="showAction">
      <slot name="action">
        <div @click="emits('cancel')">取消</div>
      </slot>
    </div>
  </div>
</template>

<style lang='scss'>

:root {
  --j-search-padding: 10px var(--van-padding-sm);
  --j-search-background: var(--ele-header-main-background);
  --j-search-content-background: var(--van-gray-1);
  --j-search-left-icon-color: var(--van-gray-6);
  --j-search-action-padding: 0 var(--van-padding-xs);
  --j-search-action-text-color: var(--van-text-color);
  --j-search-action-font-size: var(--van-font-size-md);
  --j-search-input-height: 34px;
}


.j-search {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: var(--j-search-padding);
  background: var(--j-search-background);

  &--show-action {
    padding-right: 0;
  }

  &__content {
    display: flex;
    flex: 1;
    padding-left: var(--van-padding-sm);
    background: var(--j-search-content-background);
    border-radius: var(--van-radius-sm);

    &--round {
      border-radius: var(--van-radius-max);
    }
  }

  &__action {
    padding: var(--j-search-action-padding);
    color: var(--j-search-action-text-color);
    font-size: var(--j-search-action-font-size);
    line-height: var(--j-search-input-height);
    cursor: pointer;
    user-select: none;
  }

  &__field {
    flex: 1;
    padding: 5px var(--van-padding-xs) 5px 0;
    background-color: transparent;

    .j-field__left-icon {
      color: var(--j-search-left-icon-color);
      margin-right: var(--van-padding-base);

      .van-icon {
        font-size: var(--van-field-icon-size);
      }
    }
  }

}

.j-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  color: var(--van-cell-text-color);
  font-size: var(--van-cell-font-size);
  line-height: var(--van-cell-line-height);

  &__value {
    flex: 1;
    color: var(--van-cell-text-color);
    vertical-align: middle;
    word-wrap: break-word;
  }
}

.j-field {
  &__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--van-field-input-text-color);
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    resize: none;
    user-select: none;

    &::placeholder {
      color: var(--van-field-placeholder-text-color);
    }
  }


  &__body {
    display: flex;
    align-items: center;
  }

  &__right-icon {
    color: var(--van-field-right-icon-color);
    padding: 0 var(--van-padding-xs);
    line-height: inherit;
    flex-shrink: 0;
  }

  &__clear {
    color: var(--van-field-clear-icon-color);
    font-size: var(--van-field-clear-icon-size) !important;
    cursor: pointer;
  }
}

input {
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
}
</style>
