<template>
  <transition name="right-in" mode="out-in">
    <div v-if="toggle" class="c-frame">
      <slot></slot>
      <c-toolbar>
        <div slot="left">
          <a class="btn" @click="close">
            <c-icon name='material-arrow_back'></c-icon>
          </a>
        </div>
      </c-toolbar>
    </div>
  </transition>
</template>

<script>
import CToolbar from './c-toolbar'
import CIcon from './c-icon'

export default {
  props:{
    toggle:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    close(){
      this.$emit("frameClose")
    }
  },
  components: {
    CToolbar,
    CIcon
  }
}
</script>

<style>
.c-frame{
  top:0;
  position: absolute;
  z-index: 20;
  width:100%;
  height: 100%;
  background: white;
}
</style>
