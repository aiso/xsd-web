<template>
  <div :class="['c-cell', direction]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.c-cell {
  padding: 1rem;
  border-top: 1px solid var(--border);

  &.padding-tb {
    padding:1rem 0;
  }

  &.row {
    display: flex;
    flex-direction: row;

    & .extend{
      flex: auto;
    }
  }

  &.column {
    display: flex;
    flex-direction: column;
  }

  &:first-child {
    border-top: none;
    border-radius: inherit;
  }

  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  &:active {
    background-color: color(var(--secondary) alpha(10%))
  }
}

</style>
