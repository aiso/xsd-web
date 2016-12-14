<template>
  <c-page :state="state">
    <div class="page-content" v-if="item">
      <div class="flex-row page-header">
        <div class="page-title flex-auto">产品</div>  
        <div>
          <a class="btn p10" @click="removeItem">
            <c-icon name='material-delete_forever'></c-icon>
          </a>
          <router-link class="btn p10" :to="{ name: 'supplier/item/edit', params: { id: item.id }}">
            <c-icon name='material-edit'></c-icon>
          </router-link>
        </div>
      </div>

      <v-xsd-item :item="item" v-if="!!item"></v-xsd-item>
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
  methods: {
    removeItem(){
      this.$confirm.open('你确定要删除此产品？').then(() => {
        this.xsd.api.delete('item/'+this.$route.params.id).then(() => {
          this.$store.dispatch('removeItem', {id: this.$route.params.id})
          this.xsd.nav.back()
        })
      })
    },
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