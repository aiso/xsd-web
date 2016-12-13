<template>
  <c-page :state="state">
    <div class="p20">
      <div class="p10 text-center bg-gray-light" v-if="supplier">
        <c-avatar :src="supplier.img" class="ib"></c-avatar>
        <h3>{{supplier.name}}</h3>
      </div>
      <div v-if="items">
        <c-xsd-item :item='item' v-for="item in items" @xsd-item-click="showItem(item.id)" class="list-cell">
          <div slot="detail" class="mt5 flex-row">
            <c-price :amount="item.price" class="c-text-light">价格：</c-price>
            <div class="flex-auto"></div>
          </div>
          <div slot="right" >
            <a class="btn ib" @click="agentItem=item">
              <div v-if="!item.agent"><c-icon name="material-add" class="block c-green-dark"></c-icon></div>
              <div v-if="item.agent" class="text-center c-orange">
                <c-price :amount="item.agent.fee" ></c-price>
                <h5>代理费</h5>
              </div>
            </a>
          </div>
        </c-xsd-item>      
      </div>
    </div>

    <c-xsd-toolbar>
      <a class="btn" @click="reload">
        <c-icon name='material-refresh'></c-icon>
      </a>
    </c-xsd-toolbar>

    <m-agent-item :item="agentItem" @mutate="agentItemMutate"></m-agent-item>
  </c-page>
</template>

<script>
import { CPage, CPane, CCell, CIcon, CPrice, CAvatar } from '../../components/base'
import { CXsdItem, CXsdToolbar } from '../../components/xsd'
import { MAgentItem } from '../../components/station'


export default {
  data(){
    return {
      state:this.xsd.state.loading,
      supplier:null,
      items:null,
      agentItem:null
    }
  },
  activated(){
    this.loadData()
  },
  methods: {
    loadData(){
      this.state = this.xsd.state.loading
      this.xsd.api.getCache('station/agent/supplier/'+this.$route.params.id).then(data=>{
        this.supplier = data.supplier
        this.items = data.items
        this.state = this.xsd.state.normal
      })
    },
    reload(){
      this.xsd.api.dirty('station/agent/supplier/'+this.$route.params.id)
      this.loadData()
    },
    showItem(id){
      this.$router.push({name:'/station/item', params:{id}})
    },
    agentItemMutate(event, agent){
      if(event == 'update'){
        const idx = this.items.findIndex(item=>item.id == agent.item)
        this.items.splice(idx, 1, Object.assign({ }, this.items[idx], { agent }))
      }else if(event == 'delete'){
        const idx = this.items.findIndex(item=>item.id == agent.item)
        this.items.splice(idx, 1, Object.assign({ }, this.items[idx], { agent:null }))
      }

      this.agentItem=null
    }
  },
  components: {
  	CPage, 
  	CPane, 
  	CCell, 
  	CIcon, 
  	CPrice,
    CAvatar,
    CXsdItem,
    CXsdToolbar,
    MAgentItem
  }
}
</script>
