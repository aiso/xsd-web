<template>
  <c-page :state="state">
    <div class="p20">
      <h3 class="ptb10 c-text-light">供应商</h3>
      <router-link v-for="supplier in suppliers" :to="{name:'/station/agent/supplier', params:{id:supplier.id}}">
        <div class="ptb20 flex-row border-top btn">
          <c-avatar :src="supplier.avatar" size=50></c-avatar>
          <div class="flex-auto plr10">
            <h3>{{supplier.name}}</h3>
            <h5 class="c-text-light mt5">{{supplier.address}}</h5>
          </div>
          <c-icon name="material-chevron_right"></c-icon>
        </div>
      </router-link>
    </div>

  </c-page>
</template>

<script>
import { CPage, CPane, CCell, CIcon, CAvatar } from '../../components/base'

export default {
  data(){
    return {
      state:this.xsd.state.normal,
      suppliers:null,
    }
  },
  created(){
  	this.state = this.xsd.state.loading
    this.xsd.api.get('region/1/suppliers').then(data=>{
	  this.suppliers = data.suppliers.map(supplier=>{
        return {
          id:supplier.id,
          avatar:supplier.img,
          name:supplier.name,
          address:supplier.address
        }
      })
      this.state = this.xsd.state.normal
    })
  },
  components: {
  	CPage,
    CPane,
    CCell,
    CIcon,
    CAvatar
  }
}
</script>
