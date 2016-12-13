<template>
  <c-page :state="state">
    <div v-if="item">
      <v-xsd-item :item="item" v-if="!!item"></v-xsd-item>
      <c-xsd-toolbar>
      </c-xsd-toolbar>
    </div>
  </c-page>
</template>


<script>
import {CPage, CIcon, CPrice} from '../../components/base'
import {VXsdItem, CXsdToolbar} from '../../components/xsd'

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
    VXsdItem,
    CXsdToolbar
  }
}
</script>