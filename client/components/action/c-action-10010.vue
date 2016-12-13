<template>
  <a class="xsd-action flex-row bg-blue-light c-white" @click="statement.click">
    <div class="pl10">
      <h4>金额：</h4>
    </div>
    <div  class="flex-auto">
      <c-price :amount="action.content" style="font-size:18px"></c-price>
    </div>
    <h5>{{statement.label}}</h5>
    <c-icon :name="statement.icon" class="action-icon"></c-icon>  
  </a>
</template>

<script>
import actionMixin from './action-mixin'
import { CIcon, CPrice, CButton } from '../base'

export default {
  mixins: [actionMixin],
  computed: {
    statement(){
      if(this.user.role == this.xsd.static.role.client){
        return (this.action.stat == 0)?{
          label:'点击付款', icon:'material-chevron_right',click:this.goAction
        }:{
          label:'已付款', icon:'material-done'
        }
      }else if(this.user.role == this.xsd.static.role.station){
        return (this.action.stat == 0)?{
          label:'等待付款...', icon:'material-hourglass_empty', click:this.doNothing
        }:{
          label:'已付款', icon:'material-done', click:this.doNothing
        }
      }
    }
  },
  methods: {
    doNothing(){

    },
    goAction(){
      this.$router.push({ name:'/actions/10010' })
    }
  },
  components:{
    CIcon,
    CPrice,
    CButton
  }
}

</script>