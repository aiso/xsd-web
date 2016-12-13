<template>
  <c-page :state="state">

  	<c-background v-if="transes.length==0">
  		<h3>没有进行中的服务单</h3>
  	</c-background>

    <c-pane v-if="items.length>0">
      <c-cell v-for='item in items'>
      	<router-link :to="{name:'/station/transes/client', params:{id:item.uid}}">
	        <c-client-trans :uid="item.uid">
	          <h2 class="font-montserrat">{{item.transes.length}}</h2>
	        </c-client-trans>
      	</router-link>
      </c-cell>
    </c-pane>

  </c-page>
</template>

<script>
import { CPage, CBackground, CPane, CCell, CIcon } from '../../components/base'
import { CClientTrans } from '../../components/station'
import syncTrans from '../../mixins/sync-trans'

export default {
  mixins:[syncTrans],
  computed: {
    clients(){
      const clients = this.transes.map(trans=>trans.client)
      return Array.from(new Set(clients))
    },
    items(){
      return this.clients.map(client=>{
        const item = { uid:client }
        item.transes = this.transes.filter(trans=>trans.client==client)
        return item
      })
    }
  },
  components: {
  	CPage,
  	CBackground,
  	CPane,
  	CCell,
  	CIcon,
  	CClientTrans
  }
}
</script>
