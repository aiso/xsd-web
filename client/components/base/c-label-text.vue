<template>
  <div class="c-label-text">
    <h4 class="label">{{label}}</h4>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.c-label-text{
  display: flex;

  & .label{
    padding:.25rem;
    color:var(--textLight);
    width: 30%;
  }

  & .text{
    padding:.25rem;
    flex: auto;
  }
}
</style>
