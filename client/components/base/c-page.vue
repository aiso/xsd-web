<template>
  <div class="c-page">
    <c-background v-if="state=='loading'">
      <c-loading></c-loading>
      <h3 class="c-text-light text-ls mt10">加载数据中...</h3>
    </c-background>
    <slot v-if="state=='normal'"></slot>

  </div>
</template>

<script>
import CBackground from './c-background'
import CLoading from './c-loading'

export default {
  props: {
    state: {
      type: String,
      default: 'normal'
    }
  },
  components: {
    CBackground,
    CLoading
  }
}
</script>

<style>
.c-page{
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin-top: var(--header);

  & .notice-fillter{
    margin-top: var(--header);
  }
}

</style>
