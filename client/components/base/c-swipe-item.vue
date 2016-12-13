<template>
    <div class="c-swipe-item">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'c-swipe-item',
    props: {
      bus: {
        type: Object,
      },
    },
    mounted () {
      this.bus.$emit('swipeItemCreated', this)
    },

    deactivated () {
      this.bus.$emit('swipeItemDestroyed', this)
    },

    destroyed () {
      this.bus.$emit('swipeItemDestroyed', this)
    }
  }
</script>