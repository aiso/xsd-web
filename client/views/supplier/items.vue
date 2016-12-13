<template>
  <c-page :state="state">
    <c-background v-if="items.length==0">
      <h3 class="title">还没有产品？</h3>
  		<div class="p20">
  			<c-button class="primary" @click="newItem=1">添加产品</c-button>	
  		</div>
    </c-background>

    <div class="p10 bg-white" v-if="items.length>0">
      <c-cell v-for='item in items'>
        <router-link :to="{ name: 'supplier/item', params: { id: item.id }}">
          <c-xsd-item :item='item'></c-xsd-item>
        </router-link>
      </c-cell>
    </div>

    <c-xsd-toolbar>
      <router-link class="btn" to="/supplier/item/new">
        <c-icon name='material-add'></c-icon>
      </router-link>
    </c-xsd-toolbar>
  </c-page>
</template>

<script>
import {CPage, CPane, CCell, CIcon, CBackground, CButton, CLoading} from '../../components/base'
import { CXsdItem, CXsdToolbar } from '../../components/xsd'
export default {
  data(){
  	return {
      state:this.xsd.state.normal,
  	  items: []
  	}
  },
  created(){
    if(this.$store.getters.items == null){
      this.state = this.xsd.state.loading
      this.xsd.sync.load('items').then(()=>{
        this.items = this.$store.getters.items
        this.state = this.xsd.state.normal
      })
    }else{
      this.items = this.$store.getters.items
    }
  },
  components: {
    CPage,
  	CPane,
    CCell,
    CIcon,
  	CBackground,
  	CButton,
    CLoading,
    CXsdItem,
    CXsdToolbar
  }
}
</script>