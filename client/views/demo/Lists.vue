<template>
  <div class="page-wrapper">
    <c-list-item class="highlighted">
      <c-icon class="list-icon" name="material-person"></c-icon>
      <div class="list-title">
        主持人 中宣部副部长蒋建国：
      </div>
    </c-list-item>
    <a @click="toast">
      <c-list-item class="btn">
        <c-icon class="list-icon" name="material-notifications"></c-icon>
        <div class="list-title">toast</div>
      </c-list-item>
    </a>
    <a @click="maskShow=true">
      <c-list-item class="btn">
        <c-icon class="list-icon" name="material-person"></c-icon>
        <div class="list-title">mask test</div>
      </c-list-item>
    </a>
    <a @click="modalShow=true">
      <c-list-item class="btn">
        <c-icon class="list-icon" name="material-person"></c-icon>
        <div class="list-title">modal test</div>
      </c-list-item>
    </a>
    <a @click="alert">
      <c-list-item class="btn">
        <c-icon class="list-icon" name="material-notifications"></c-icon>
        <div class="list-title">alert test</div>
      </c-list-item>
    </a>
    <a @click="confirm">
      <c-list-item class="btn">
        <c-icon class="list-icon" name="material-notifications"></c-icon>
        <div class="list-title">confirm test</div>
      </c-list-item>
    </a>
    <a @click="showFrame=true">
      <c-list-item class="btn">
        <c-icon class="list-icon" name="material-notifications"></c-icon>
        <div class="list-title">frame test</div>
      </c-list-item>
    </a>
    <a @click="textbox">
      <c-list-item class="btn">
        <c-icon class="list-icon" name="material-edit"></c-icon>
        <div class="list-title">textbox test</div>
      </c-list-item>
    </a>

    <c-mask :show="maskShow" @maskClicked="maskShow=false"></c-mask>
    <c-modal :show="modalShow" @maskClicked="modalShow=false">
      <div class="p20 bg-white"> test modal </div>
    </c-modal>

    <c-frame :toggle="showFrame" @frameClose="showFrame=false">
      <div class="p20 bg-white"> test frame </div>
    </c-frame>
  </div>
</template>

<script>
import router from '../../router'
import { CListItem, CIcon, CMask, CModal, CFrame } from '../../components/base'

export default {
  data(){
    return {
      maskShow:false,
      modalShow:false,
      showFrame:false,
    }
  },
  created(){
    //console.log(router)
    //console.log(this.$router)
  },
  methods: {
    toast(){
      this.$store.dispatch('addToast', '测试数据')
    },
    alert(){
      this.$alert.open('决战“超级周”，10.31原油，白银，天然气精准操作建议')
    },
    confirm(){
      this.$confirm.open('测试确认MODAL！').then(()=>{
        console.log('confirm')
      }).catch(()=>{
        console.log('cancel')
      })
    },
    textbox(){
      this.$textbox.open('test box').then(data=>{
        console.log(data)
      })
    }
  },
  components: {
    CListItem,
    CIcon,
    CMask,
    CModal,
    CFrame
  }
}
</script>
