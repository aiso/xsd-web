<template>
  <div class="page-wrapper">

    <div class="page-content" style="width:400px;">
      <h2 class="mb10 text-ls">鲜时达生活店</h2>
      <h3 class="c-text-light">
        我们致力于改善你的生活方式，放心的网购，贴心的服务，方便的生活。
      </h3>

      <c-pane>
        <c-form-cell>
          <c-icon name="material-person"></c-icon>
          <c-textfield :model="username">
            <p class="right-hint c-red text-bold" v-if="validations.usernameRequred">必填项</p>
            <p class="right-hint c-red text-bold" v-if="!validations.usernameRequred&&validations.usernameMinlength">最小4位</p>
          </c-textfield>
        </c-form-cell>
        <c-form-cell>
          <c-icon name="material-vpn_key"></c-icon>
          <c-textfield :model="password">
            <p class="right-hint c-red text-bold" v-if="validations.passwordRequired">必填项</p>
            <p class="right-hint c-red text-bold" v-if="!validations.passwordRequired&&validations.passwordMinlength">最小4位</p>
          </c-textfield>
        </c-form-cell>
      </c-pane>
      <c-pane style="padding-left:44px;">
        <c-button class="primary" style="width:auto;padding:0 2rem" :submit="loginSubmit" label="登 录" :disabled="!formValid"></c-button>
      </c-pane>
    </div>
  </div>
</template>

<script>
import { CPane, CFormCell, CIcon, CTextfield, CButton } from '../components/base'
import createPersist from '../utils/store'

export default {
  data(){
    return{
      validations: {
        usernameValid:false,
        usernameRequred:false,
        usernameMinlength:false,

        passwordValid:false,
        passwordRequired:false,
        passwordMinlength:false,
      },
      username:{
        name:'username',
        value:null,
        attrs: {
          placeholder: '用户号'
        },
        validators: {
          required: true,
          minlength: 4
        },
        validation: result=>{
          this.validations.usernameValid = result.valid
          this.validations.usernameRequred = result.required
          this.validations.usernameMinlength = result.minlength
        }
      },
      password:{
        name:'password',
        value:null,
        attrs: {
          placeholder: '密码',
          type:'password'
        },
        validators: {
          required: true,
          minlength: 6
        },
        validation: result=>{
          this.validations.passwordValid = result.valid
          this.validations.passwordRequired = result.required
          this.validations.passwordMinlength = result.minlength
        }
      }      
    }
  },
  activated(){
    const localStore = createPersist('AUTH_KEY')
    const store = localStore.get()
    if(!!store.user){
      this.username.value = store.user.uid
    }
  },
  computed: {
    formValid(){
      return this.validations.usernameValid && this.validations.passwordValid
    }
  },
  methods: {
    loginSubmit(){
      this.xsd.user.login({ uid:this.username.value, pwd:this.password.value }).then(()=>{
        if(!!this.$route.query.redirect)
          this.$router.replace(this.$route.query.redirect)
        else
          this.$router.replace(this.$store.getters.navigation.home)
      })
      /*
      .then(()=>{
        return this.xsd.sync.load('transes')
      })
      .then(()=>{
        this.$route.router.go(this.navMainRoutes.home)
      })*/
    }
  },
  components: {
    CPane,
    CFormCell,
  	CIcon,
    CTextfield,
    CButton,
  }
}
</script>