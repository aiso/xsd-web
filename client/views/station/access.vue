<template>
  <c-page :state="state">

    <div class="page-content" >
      <div class="flex-row page-header">
        <div class="flex-auto pl20">
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

    </div>

  </c-page>
</template>


<script>
import {CPage, CPane, CIcon, CPrice} from '../../components/base'


export default {
  data(){
    return {
      //state:this.xsd.state.loading,
      state:this.xsd.state.normal,
      users:[],
      token:null
    }
  },
  activated(){

  },
  methods:{
    getToken(){
      this.xsd.api.get('station/access/token').then(data=>{
        this.token = data.token
      })
    }
  },
  components: {
    CPage,
    CPane,
  	CIcon,
    CPrice,
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