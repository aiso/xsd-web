<template>
  <c-page :state="state">

    <div class="page-content" >
      <div class="flex-row page-header">
        <div class="flex-auto">
          <div class="page-title mb5">微信客户端接入</div>  
          <h4 class="c-text-light">通过微信客户端接入管理日常交易</h4>
        </div>
        <div>
          <a class="btn btn-token" @click="getToken">
            <h3 v-if="!token">获取接入码</h3>
            <h3 v-if="!!token">{{token.token}}</h3>
          </a>
        </div>
      </div>

      <div class="flex-row border-top pt20" v-for="role in roles">
        <c-avatar :src="role.user.img" size="60"></c-avatar>
        <div class="flex-auto plr20">
          <h3>{{role.user.name}}</h3>
          <h4 class="c-text-light">最后登录：{{role.user.last_login}}</h4>
        </div>
        <div>
          <a class="btn-icon" @click="unlink(role)">
            <c-icon name="material-clear"></c-icon>  
          </a>
          
        </div>
      </div>

    </div>

  </c-page>
</template>


<script>
import {CPage, CPane, CIcon, CPrice, CAvatar} from '../../components/base'


export default {
  data(){
    return {
      //state:this.xsd.state.loading,
      state:this.xsd.state.normal,
      roles:[],
      token:null
    }
  },
  created(){
      this.xsd.api.get('station/access/roles').then(data=>{
        this.roles = data.roles
      })
  },
  methods:{
    getToken(){
      this.xsd.api.get('station/access/token').then(data=>{
        this.token = data.token
      })
    },
    unlink(role){
      this.$confirm.open('确实删除该接入？').then(()=>{
        this.xsd.api.delete('station/role/'+role.id).then(data=>{
          this.roles = this.roles.filter(c=>c.id!=role.id)
        })
      })
    }
  },
  components: {
    CPage,
    CPane,
  	CIcon,
    CPrice,
    CAvatar
  }
}
</script>

<style>
.btn-token{
  display: inline-block;
  padding:15px;
  text-align: center;
  background: var(--primary);
  color:white;
  width:240px;
}
</style>