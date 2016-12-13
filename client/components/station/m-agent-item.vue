<template>
  <c-modal :show="!!item" @maskClicked="close">
    <div v-if="!!item" class="p15 bg-white">
      <div class="flex-row">
        <h3 class="text-left p10 text-ls flex-auto">代理产品</h3>  
        <a @click="removeAgent" class="c-red" v-if="!!item.agent"><c-icon name="material-delete_forever" class="block"></c-icon></a>
      </div>
      <div class="divider"></div>
      <div class="flex-row">
        <c-thumbnail :src="item.img" width=50 height=50></c-thumbnail>
        <div class="flex-auto text-left plr10">
          <h4>{{item.title}}</h4>
        </div>
        <div>
          <h5 class="c-text-light mb5">产品价格</h5>
          <c-price :amount="item.price" class="c-red"></c-price>
        </div>
        
      </div>
      <div class="divider"></div>
      <div class="flex-row mb20 pl10">
        <h4 class="c-text-light">代理费用</h4>
        <div class="flex-auto">
          <input class="input-simple text-center font-montserrat full-width" v-model="fee" placeholder="0.00" style="font-size:16px" />
        </div>
        <div>
          <h5 class="c-text-light mb5">销售价格</h5>
          <c-price :amount="price" class="c-red"></c-price>
        </div>
      </div>
      <c-button class="primary plr20" label="提交" :submit="_submit" :disabled="_disabled"></c-button>
    </div>
  </c-modal>
</template>


<script>
import { CModal, CIcon, CThumbnail, CPrice, CLabel, CButton } from '../base'

export default {
  props:{
    item: {
      type: Object,
      default:null
    }
  },
  data(){
    return {
      fee:null
    }
  },
  watch: {
    item(val){
      if(!!val) this.fee = (!!val.agent)?val.agent.fee:''
    }
  },
  computed: {
    price(){
      return this._disabled?0.00:(parseFloat(this.item.price)+parseFloat(this.fee))
    },
    _disabled(){
      return !this.xsd.regex.price.test(this.fee)
    }
  },
  methods: {
    close(){
      this.$emit('mutate', 'close')
    },
    _submit(){
      this.xsd.api.post('station/agent', { item:this.item.id, fee:this.fee }).then(data=>{
        this.$emit('mutate', 'update', data.agent)
      })
    },
    removeAgent(){
      this.xsd.api.delete('station/agent/'+this.item.agent.id).then(data=>{
        this.$emit('mutate', 'delete', data.agent)
      })
    }
  },
  components: {
    CModal,
    CIcon,
    CThumbnail,
    CPrice,
    CLabel,
    CButton
  }
}

</script>