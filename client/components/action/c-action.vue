<template>
  <div class="c-action">
    <div class="flex-row">
      <div class="thumbnail pl15">
        <c-avatar :src="action.user.img" size=40></c-avatar>
      </div>
      <div class="flex-auto pl15">
        <a class="text-ls">{{action.user.name}}</a>
        <h5 class="c-text-light">{{action.ctime|timeago}}</h5>
      </div>
      <h5 class="text-ls c-text-light">{{config.name}}</h5>
      <c-icon :name="config.icon" class="block c-text-light"></c-icon>
    </div>
    <div style="padding:0 15px 0 70px">
      <component :is="'CAction'+this.action.action" :action="action" :user="user" :config="config"></component>
    </div>
  </div>
</template>

<script>
import { CCell, CIcon, CAvatar } from '../base'
import CAction10010 from './c-action-10010'
import CAction10020 from './c-action-10020'
import CAction10030 from './c-action-10030'
import CAction20010 from './c-action-20010'

export default {
  props: {
    action: {
      type: Object
    },
  },
  data(){
    return{
      config:this.xsd.action.config(this.action.action),
      user:this.$store.getters.user
    }
  },
  components:{
    CCell,
    CIcon,
    CAvatar,
  	CAction10010,
    CAction10020,
    CAction10030,
  	CAction20010,
  }
}

</script>

<style>
  .c-action{
    border-top: 1px solid var(--border);
    padding:10px 0 10px 0;
    
    &:first-child {
      border-top: none;
      border-radius: inherit;
    }
  }

  .c-action-component{
    padding:0 15px;
  }

</style>