<template>
  <div v-if="profile">
    <c-thumbnail :src="profile.img" :size="size"></c-thumbnail>
  </div>
</template>

<script>
import {CThumbnail} from '../base'

export default {
  props : {
    size: {
      type: String,
      default: 40
    },
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
        console.log(this.uid)
    this.xsd.api.getCache('user/profile/'+this.uid).then(data=>{
      this.profile = data.profile
    })
  },
  components:{
    CThumbnail
  }
}
</script>

