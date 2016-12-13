<template>
  <div :class="['c-pane', dir]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    dir: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.c-pane {
  margin: 1rem 0;

  &.vertical {
    margin: 1rem 0;
  }

  &.horizontal {
    margin: 0 1rem;
  }
}

</style>
