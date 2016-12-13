<template>
	<transition name="fade" mode="out-in">
		<div v-show="show" tabindex="-1" class="c-mask" @click="_click"><slot></slot></div>
	</transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  	_click(){
  		this.$emit('maskClicked')
  	}
  }
}
</script>

<style>
.c-mask {
  position: fixed;
  z-index: 101;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
