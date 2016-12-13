<template>
  <c-modal :show="show" @maskClicked="close">
    <div class="c-confirm">
      <div class="p20">
        <h3>{{message}}</h3>  
      </div>
      <div class="border-top pt10 flex-row">
        <c-button class="primary" label="确定" :submit="_confirm"></c-button>
        <c-button class="warning" label="取消" :submit="_cancel"></c-button>
      </div>
    </div>
  </c-modal>
</template>

<script>
import Promise from 'nd-promise'
import CModal from './c-modal'
import CButton from './c-button'

export default {
  data(){
    return {
      show:false,
      message:null,
      deferred:null
    }
  },
  methods: {
    open(message){
      this.message = message
      this.show = true
      return new Promise((resolve, reject) => {
        this.deferred = { resolve, reject }
      })
    },
    close(){
      this.show=false
    },
    _cancel(){
      this.close()
      this.deferred.reject()
    },
    _confirm(){
      this.close()
      this.deferred.resolve()
    }
  },
  components: {
    CModal,
    CButton
  }
}
</script>

<style>
.c-confirm {
  background: white;
  padding:10px;
  text-align: center;

  & .c-button{
    flex: auto;
    margin:5px;
    display: inline-block;
    letter-spacing: .1rem;
  }
}
</style>
