<template>
  <c-toolbar class="c-xsd-toolbar">
    <div class="container">
      <a class="btn" @click="back">
        <c-icon name='material-arrow_back'></c-icon>
      </a>
      <div class="center"></div>
      <slot></slot>
    </div>
  </c-toolbar>
</template>

<script>
import {CToolbar, CIcon} from '../base'

export default {
  props : {
    uid : {
      type: Number
    }
  },
  methods: {
    back(){
      this.xsd.nav.back()
    }
  },
  components: {
    CToolbar,
    CIcon
  }
}
</script>

<style>
.c-xsd-toolbar{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 11;

  & .container{
    border-top:1px solid #e7e7e9;
  }
}
</style>