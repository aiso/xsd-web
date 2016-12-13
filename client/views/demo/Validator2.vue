<template>
  <div class="page-wrapper">
    <c-validation :validation="$validation"></c-validation>
    <c-pane>
      <c-textfield :model="testInput"></c-textfield>

    </c-pane>

    <c-pane>
      <c-button class="primary" :submit="test"></c-button>
    </c-pane>

  </div>
</template>

<script>
import { CValidation, CPane, CIcon, CLabel, CButton, CTextfield } from '../../components/base'

export default {
  data(){
    console.log(this.$validator)
    console.log(this.$validation)
    return{
      result: {},
      testInput:{
        name:'testInput',
      	value:'dd3',
      	attrs: {
          placeholder: '只能包含小写英文字母'
      	},
        validate: {
          required: {
            rule: true,
            message: '请输入账号'
          },
          minlength: {
            rule: 4,
            message: '账号不能少于 4 个字符'
          },
          maxlength: {
            rule: 32,
            message: '账号不能多于 32 个字符'
          },
          pattern: {
            rule: '/^[a-zA-Z0-9]{4,32}$/',
            message: '账号不符合规则'
          }
        }
      }
    }
  },

  methods: {
    test(){

    },
  },
  components: {
  	CValidation,
    CPane,
  	CIcon,
    CLabel,
    CButton,
    CTextfield
  }
}
</script>