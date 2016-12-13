<template>
  <c-modal :show="show" @maskClicked="close">
    <div class="c-alert">
      <div class="p20">
        <h3>{{message}}</h3>  
      </div>
      <div class="border-top pt10">
        <a class="btn" @click="close">知道了</a>  
      </div>
    </div>
  </c-modal>
</template>

<script>
import CModal from './c-modal'

export default {
  data(){
    return {
      show:false,
      message:null
    }
  },
  methods: {
    open(message){
      this.message = message
      this.show = true
    },
    close(){
      this.show=false
    }
  },
  components: {
    CModal,
  }
}
</script>

<style>
.c-alert {
  background: white;
  padding:10px;
  text-align: center;

  & .btn{
    display: inline-block;
    width: 100%;
    padding: 10px;
    color:var(--textLight);
    letter-spacing: .1rem;
  }
}
</style>
