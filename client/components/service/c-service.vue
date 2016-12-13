<template>
  <div class="c-service">
    <span class="i-text small nowrap text-small c-text-light"><c-icon :name="service.icon"></c-icon>{{service.title}}</span>
  </div>
</template>

<script>
import { CIcon } from '../base'

export default {
  props: {
    sid: {
      type: Number
    },
    class: {
      type: String,
      default: ''
    },
  },
  data(){
    return{
      service:this.xsd.service.config(this.sid),
    }
  },
  components:{
    CIcon
  }
}
</script>

