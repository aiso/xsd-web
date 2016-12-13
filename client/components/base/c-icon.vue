<template>
    <icon v-if="name" class="c-icon" :name="name"></icon>
</template>


<script>
export default {
  props: {
    name: String,
  },
  components: {
    "icon": require("vue-icons")
  }
}
</script>

<style>
.c-icon {
  display: inline-block;
  font-size :20px;

  &.block{
  	text-align: center;
  	width: var(--blockSize);
  	height: var(--blockSize);
  }
}
</style>