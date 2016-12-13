<template>
  <div id="app" class="container">
    <c-toast class="toast" :toasts="$store.getters.toasts"></c-toast>
    <c-alert ref="xsdAlert"></c-alert>
    <c-confirm ref="xsdConfirm"></c-confirm>
    <c-textbox ref="xsdTextbox"></c-textbox>
    <xsd-header></xsd-header>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view class="router-view"></router-view>  
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { CToast, CAlert, CConfirm, CTextbox } from './base'
import XsdHeader from './Header'

export default {
  components: {
  	CToast,
    CAlert,
    CConfirm,
    CTextbox,
    XsdHeader
  }
}
</script>


<style src="../assets/app"></style>
