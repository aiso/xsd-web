<template>
  <textarea class="c-autosize-textarea" @input="handleChange" v-bind="attrs" placeholder="...">{{ value }}</textarea>
</template>

<script>
import autosize from '../../utils/autosize'

export default {
  props: ['handle-change', 'value', 'attrs'],
  mounted(){
    autosize(this.$el)
  }
}
</script>

<style>
  .c-autosize-textarea{
    background: var(--bgLight);
    width:100%;
    border:0;
    padding:10px;
    font-size:14px;
    resize: none;
  }
</style>