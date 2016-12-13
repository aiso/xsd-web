<template>
  <div class="page-wrapper">
    <div class="page-content">
      <div class="page-title border">
        <div class="flex-row">
          <h2 class="flex-auto">MD5</h2>  
          <c-button class="primary fit" label="转换" :submit="convert"></c-button>
        </div>
      </div>
      
      <c-pane>
          <c-label>字符串：</c-label>
          <input @input="textInput" :value="text" class="input-gray" placeholder='' />
      </c-pane>
      <c-pane>
          <c-label>转换结果：</c-label>
          <h4 class="p5">{{ctext}}</h4>
      </c-pane>
    </div>
  </div>
</template>

<script>
import {CPane, CCell, CLabel, CButton} from '../../components/base'
import md5 from 'md5'

export default {
  data(){
    return{
      text:'',
      ctext:''
    }
  },
  methods: {
    textInput(e){
      this.text = e.target.value
    },
    convert(){
      this.ctext = md5(this.text)
    },

  },
  components: {
    CPane,
    CCell,
    CLabel,
    CButton
  }
}
</script>
