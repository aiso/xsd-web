<template>
  <div :class="['c-action-status', stat]" v-if="!!cfg">
    <c-icon :name="cfg.icon" size=30></c-icon>
    <h5>{{cfg.name}}</h5>
  </div>
</template>

<script>
import { CIcon } from '../base'

export default {
  props: {
    action: {
      type: Object
    },
  },
  data(){
    return {
      cfg:this.xsd.action.config(this.action.action),
      stat:this.action.stat?'c-green':'c-orange'
    }
  },
  components:{
  	CIcon,
  }
}

</script>

<style>
.c-action-status{
  text-align: center;
}
</style>