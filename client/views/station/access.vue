<template>
  <c-page :state="state">

  </c-page>
</template>


<script>
import {CPage, CIcon, CPrice} from '../../components/base'


export default {
  data(){
    return {
      state:this.xsd.state.loading,
      item:null
    }
  },
  activated(){
    
    this.xsd.item.get(this.$route.params.id).then(item=>{
      this.item = item
      this.state=this.xsd.state.normal
    })
  },
  components: {
    CPage,
  	CIcon,
    CPrice,
  }
}
</script>