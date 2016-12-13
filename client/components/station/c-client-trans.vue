<template>
  <div class="flex-row" v-if="!!profile">
    <c-avatar :src="profile.img" size=44></c-avatar>  
    <div class="flex-auto pl20">
      <h4 class="c-text text-ls">{{profile.name}}</h4>
      <h5 class="c-text-light  text-lh2">服务站：<c-xsd-profile-name :uid="profile.station"></c-xsd-profile-name></h5>
    </div>
    <div class="plr10">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { CAvatar } from '../base'
import { CXsdProfileName } from '../xsd'

export default {
  props : {
    uid : {
      type: Number
    }
  },
  data(){
    return {
      profile:null
    }
  },
  created(){
    this.xsd.api.getCache('user/profile/'+this.uid).then(data=>{
      this.profile = data.profile
    })
  },
  components: {
    CAvatar,
    CXsdProfileName
  }
}
</script>

