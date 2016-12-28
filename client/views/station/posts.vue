<template>
  <c-page :state="state">

    <div class="page-content" >
      <div class="flex-row page-header">
        <div class="flex-auto">
          <div class="page-title mb5">产品代理</div>  
          <h4 class="c-text-light">管理代理产品：查看、添加代理、取消代理等。</h4>
        </div>
        <div>

        </div>
      </div>

      <div class="flex-row border-top pt20" >

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
      this.xsd.api.get('station/posts').then(data=>{

      })
  },
  methods:{

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