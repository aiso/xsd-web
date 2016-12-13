<template>
  <div class="c-avatar">
    <c-thumbnail :src="img" :width="size" :height="size"></c-thumbnail>
  </div>
</template>

<script>
import CThumbnail from './c-thumbnail'

export default {
  props: {
    size: {
      type: [Number, String],
      default: 80
    },
    src: {
      type: String,
      default: ''
    }
  },
  computed:{
    img () {
      return this.src||'../../assets/images/avatar.jpg'
    }
  },
  components: {
    CThumbnail
  }
}
</script>

<style>
.c-avatar {
  -webkit-transform:rotate(0deg);
  
  & .c-thumbnail{
    -webkit-border-radius: 10rem;
    -moz-border-radius: 10rem;
    -ms-border-radius: 10rem;
    -o-border-radius: 10rem;
    border-radius: 10rem;
  }
}
</style>