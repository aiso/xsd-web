<template>
  <c-page :state="state">
    <c-background v-if="clientTranses.length==0">
      <h3>没有进行中的服务单</h3>
    </c-background>

    <c-pane >
      <div class="flex-row p15" v-if="client">
        <c-avatar :src="client.img" size=50></c-avatar>
        <div class="plr20 flex-auto">
          <h4>{{client.name}}</h4>
          <h5 class="c-text-light text-lh20">服务站：<c-xsd-profile-name :uid="client.station"></c-xsd-profile-name></h5>
        </div>
      </div>
      <c-cell v-for='trans in clientTranses' class="padding-tb">
        <router-link :to="{name:trans.surl, params:{id:trans.id}}">
          <c-xsd-item :item='trans.item'>
            <h5 slot="detail" class="c-text-light">{{trans.ctime|timeago}}</h5>
            <div slot="right" class="pl10 valign-top">
              <c-action-status :action="trans.current"></c-action-status>
            </div>
          </c-xsd-item>
        </router-link>
      </c-cell>
    </c-pane>

    <c-xsd-toolbar></c-xsd-toolbar>

  </c-page>
</template>


<script>
import {CPage, CBackground, CPane, CAvatar, CCell, CIcon} from '../../components/base'
import {CXsdToolbar, CXsdItem, CXsdProfileName} from '../../components/xsd'
import {CActionStatus} from '../../components/action'
import syncTrans from '../../mixins/sync-trans'

export default {
  mixins:[syncTrans],
  data(){
    return {
      client:null,
      clientTranses:[]
    }
  },
  activated(){
    this.xsd.api.get('user/profile/'+this.$route.params.id).then(data=>{
      this.client = data.profile
    })
  },
  watch: {
    transes(v){
      if(!!v&&v.length){
        this.clientTranses = this.transes.filter(trans=>trans.client==this.$route.params.id)
          .map(trans=>{
            return Object.assign({surl:this.xsd.service.get(trans.item.service).surl('trans')}, trans)
          })
      }
    }
  },
  components: {
    CPage,
    CBackground,
    CPane,
    CAvatar,
    CCell,
    CIcon,
    CXsdToolbar,
    CXsdItem,
    CXsdProfileName,
    CActionStatus
  }
}
</script>