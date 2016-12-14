<template>
  <div>
    <c-mask :show="show" @maskClicked="$emit('maskClicked')"></c-mask>
    <transition name="bottom-in" mode="out-in">
      <div v-show="show" class="c-modal">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import CMask from './c-mask'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CMask
  }
}
</script>

<style>
.c-modal {
  position: fixed;
  z-index: 1001;
  top: 150px;
  left:50%;
  margin-left: -250px;
  width: 500px;
}
</style>
