<template>
  <c-page :state="state">
    <div v-if="item">
      <div class="flex-row p10 border-bottom">
        <div class="flex-auto">
        </div>
        <h5 class="c-text-light plr10">售价</h5>
        <div>
          <c-price :amount="item.price" class="c-red"></c-price>
        </div>
      </div>
      <v-xsd-item :item="item" v-if="!!item"></v-xsd-item>
      <c-xsd-toolbar>
        <a class="btn" @click="removeItem">
          <c-icon name='material-delete_forever'></c-icon>
        </a>
        <router-link class="btn" :to="{ name: 'supplier/item/edit', params: { id: item.id }}">
          <c-icon name='material-edit'></c-icon>
        </router-link>
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