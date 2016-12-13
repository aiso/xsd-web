<template>
  <span v-if="profile">{{profile.name}}</span>
</template>

<script>

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
  }
}
</script>

