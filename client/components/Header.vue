<template>
  <div class="xsd-header">
    <div class="container">
      <a class="header-title">{{title}}</a>
      <div class="filler"></div>
      <router-link :to="nav.path" class="nav" v-for="nav in navigators"><c-icon :name="nav.icon"></c-icon></router-link>
      <div v-if="!user">
        <router-link to="/login" class="nav"><c-icon name="material-person"></c-icon></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { CIcon } from '../components/base'

export default {
  data(){
    return {
      title:'鲜时达',
      user:this.$store.getters.user
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    },
    navigators(){
      if(!!this.$store.getters.navigation){
        const routes = this.$store.getters.navigation.routes
        return routes.map(route=>{
          const rinfo = this.$router.options.routes.find(r=>r.path==route)
          return {path:rinfo.path, icon:rinfo.meta.icon}
        })
      }else{
        return []
      }
    },
  },
  /*
  watch: {
    $route(){
      this.title = this.$router.currentRoute.meta.title
    }
  },*/
  components: {
    CIcon,
  }
}
</script>

<style>
.xsd-header{
  position: fixed;
  top:0;
  left:0;
  border-bottom: 1px solid var(--border);
  color:var(--primary);

  height: var(--header);
  width:100%;
  z-index: 11;


  & .container{
    display: flex;
  }

  & .filler{
    flex:auto;
  }

  & .header-title{
    line-height: var(--header);
    letter-spacing: 1.5px;
    font-size: 22px;
  }

  & .nav{
    & .c-icon{
      color:#444;
      display: block;
      width: var(--header);
      height: var(--header);
      line-height: var(--header);
      font-size:28px;
      text-align: center;
      color:var(--grayLight);
    }

    &:active{
      & .c-icon{
        background: #ebebeb;
        color:var(--primary);
      }
    }

    &.active{
      & .c-icon{
        color:var(--primary);
      }
    }

    &.router-link-active .c-icon{
      color:var(--primary);
    },

    &.notice.router-link-active{
      display: none
    }
  }
}
</style>