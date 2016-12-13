<template>
  <div class="page-wrapper">

    <c-pane>
      <c-form-cell>
        <c-icon name="material-person"></c-icon>
        <c-textfield :model="testInput">
          <p class="right-hint c-red text-bold" v-if="validations.testInputRequred">必添项</p>
          <p class="right-hint c-red text-bold" v-if="!validations.testInputRequred&&validations.testInputMinlength">最小4位</p>
        </c-textfield>
      </c-form-cell>
      <c-form-cell>
        <c-icon name="material-vpn_key"></c-icon>
        <c-textfield :model="testInput">
          <p class="right-hint c-red text-bold" v-if="validations.testInputRequred">必添项</p>
          <p class="right-hint c-red text-bold" v-if="!validations.testInputRequred&&validations.testInputMinlength">最小6位</p>
        </c-textfield>
      </c-form-cell>
    </c-pane>

    <c-pane>
      <c-button class="primary" :submit="test"></c-button>
    </c-pane>

  </div>
</template>

<script>
import { CValidation, CPane, CIcon, CFormCell, CButton, CTextfield } from '../../components/base'
import { mapValidation } from 'vue-validator'

export default {
  data(){
    return{
      result: {},
      validations: {
        testInputRequred:false,
        testInputMinlength:false
      },
      testInput:{
        name:'testInput',
      	value:null,
      	attrs: {
          placeholder: '只能包含小写英文字母'
      	},
        validators: {
          required: true,
          minlength: 4
        },
        validation: result=>{
          this.validations.testInputRequred = result.required
          this.validations.testInputMinlength = result.minlength
        }
      }
    }
  },

  methods: {
    test(){
      console.log(this.testInput.validations)
      //console.log(this.testInput.value)
    },
    handleValidate: function (e) {
      e.target.$validity.validate()
    }
  },
  components: {
  	CValidation,
    CPane,
  	CIcon,
    CFormCell,
    CButton,
    CTextfield
  }
}
</script>