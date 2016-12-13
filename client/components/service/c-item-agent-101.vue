<template>
  <div>
    <c-price :amount="cost" class="c-red big"></c-price>
    <c-service :sid="item.service"></c-service>
  </div>
</template>

<script>
import PropsItemAgent from './props-item-agent'
import { CPrice } from '../base'
import CService from './c-service'

export default {
  mixins: [PropsItemAgent],
  data(){
  	return{
  		service:this.xsd.service.config(this.item.service),
  	}
  },
  computed: {
    cost(){
      return parseFloat(this.item.price)+parseFloat(this.agent.fee)
    }
  },
  components:{
  	CPrice,
    CService
  }
}
</script>
