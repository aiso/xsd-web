<template>
  <c-modal :show="show" @maskClicked="close">
    <div class="c-textbox">
      <h3 class="mb15 pl5">{{title}}</h3>
      <c-autosize-textarea ref="textBox"
        :handle-change="handleChange" 
        :value="textMessage">
      </c-autosize-textarea>
      <div class="flex-row">
        <c-icon-button icon="material-clear" @click.native="close"></c-icon-button>
        <c-icon-button icon="material-backspace" @click.native="clean" :class="{'c-text-light':_disabled}"></c-icon-button>
        <div class="flex-auto"></div>
        <c-button label="提交" class="fit small primary" :disabled="_disabled" :submit="_submit"></c-button>
      </div>
    </div>
  </c-modal>

</template>

<script>
import Promise from 'nd-promise'
import CModal from './c-modal'
import CIconButton from './c-icon-button'
import CButton from './c-button'
import CAutosizeTextarea from './c-autosize-textarea'

export default {
  data(){
    return {
      show:false,
      title:'',
      textMessage:null,
      deferred:null
    }
  },
  methods: {
    handleChange (e) {
      this.textMessage = e.target.value
    },
    open(title, text){
      this.title = title
      this.show=true
      !!text && (this.textMessage = text)

      return new Promise((resolve, reject) => {
        this.deferred = { resolve, reject }
      })
    },
    close(){
      this.show=false
      this.deferred.reject()
    },
    clean(){
      this.textMessage = null
      this.$refs.textBox.$el.value=''
    },
    _submit(){
      this.show=false
      this.deferred.resolve(this.textMessage)
    }    
  },
  computed: {
    _disabled(){
      return !this.textMessage || this.textMessage.length<1
    },
  },
  components: {
    CModal,
    CIconButton,
    CButton,
    CAutosizeTextarea
  }
}
</script>

<style>
.c-textbox{
  background: white;
  width:100%;
  padding:20px 10px 10px;

  & .c-button{
    display: inline-block;
  }
}
</style>
