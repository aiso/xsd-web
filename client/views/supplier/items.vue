<template>
  <c-page :state="state">
    <c-background v-if="items.length==0">
      <h3 class="title">还没有产品？</h3>
  		<div class="p20">
  			<c-button class="primary" @click="newItem=1">添加产品</c-button>	
  		</div>
    </c-background>


    <div class="page-content" v-if="items.length>0">
      <div class="flex-row page-header">
        <div class="page-title flex-auto">我的产品</div>  
        <div>
          <router-link class="btn-round primary" to="/supplier/item/new">
            <c-icon name='material-add'></c-icon>
          </router-link>
        </div>
      </div>
      
      <c-cell v-for='item in items'>

        <c-xsd-item :item='item' @xsd-item-click="itemClick">
          <div slot="right" class="text-center plr5">
            <router-link :to="{ name: 'supplier/item/post', params: { id: item.id }}">
              <h2 class="text-bold">{{item.posts.length}}</h2>
              <h5>发布</h5>
            </router-link>
          </div>
        </c-xsd-item>

      </c-cell>
    </div>



  </c-page>
</template>

<script>
import {CPage, CPane, CCell, CIcon, CBackground, CButton, CLoading} from '../../components/base'
import { CXsdItem } from '../../components/xsd'
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
  methods: {
    itemClick(item){
      this.$router.push({name:'supplier/item', params:{id:item.id}})
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
    CXsdItem
  }
}
</script>