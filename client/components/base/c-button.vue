<template>
  <button class="c-button" :disabled="_disabled" @click="_click">
    {{_label}}
  </button>
</template>

<script>
import promisify from './promisify'

export default {
  mixins: [promisify],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '确定'
    },
    loading: {
      type: String,
      default: '请求中...'
    },
    submit: {
      type: Function,
      default: ()=>{ return true }
    }  
  },
  data(){
    return{
      progress:false
    }
  },
  computed:{
    _label(){
      return this.progress?this.loading:this.label
    },
    _disabled(){
      return this.progress || this.disabled
    }
  },
  methods: {
    _click(){
      this.progress = true
      this.promisify(this.submit()).then(() => { 
        this.progress = false 
      })
    }
  },
}
</script>

<style>
.c-button {
  white-space: nowrap;
  width: 100%;
  line-height: 3;
  color: white;
  background-color: color(white lightness(70%));
  border-radius: 0.15rem;

  &.fit{
    padding-right: 1.5em;
    padding-left: 1.5em;
    width: auto;
  }

  &:active {
    background-color: color(white lightness(80%));
  }

  &.x-large {
    line-height: 4.2;
  }

  &.large {
    line-height: 3.6;
  }

  &.small {
    line-height: 2.4;
  }

  &.x-small {
    line-height: 1.8;
  }

  &.primary {
    background-color: var(--primary);

    &:active {
      background-color: color(var(--primary) lightness(+10%));
    }

    &:disabled {
      cursor: not-allowed;
      color: color(white lightness(70%));
      background-color: color(white lightness(80%));
    }
  }

  &.warning {
    background-color: var(--error);

    &:active {
      background-color: color(var(--error) lightness(+10%));
    }

    &:disabled {
      cursor: not-allowed;
      color: color(white lightness(70%));
      background-color: color(white lightness(80%));
    }
  }

  &.default {
    color: color(white lightness(-80%));
    background-color: color(white lightness(-20%));

    &:active {
      background-color: color(white lightness(-10%));
    }

    &:disabled {
      cursor: not-allowed;
      color: color(white lightness(70%));
      background-color: color(white lightness(80%));
    }
  }
}

</style>
