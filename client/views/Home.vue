<template>
  <div class="page-wrapper">
    <div class="page-content">
      <div class="page-title">
        鲜时达引导页面
      </div>
      <c-cell>
        <router-link to="login">login</router-link>
      </c-cell>
      <c-cell>
        <router-link to="demo/lists">demo/lists</router-link>
      </c-cell>
      <c-cell>
        <router-link to="demo/validator">demo/validator</router-link>
      </c-cell>
      <c-cell>
        <router-link to="utils/md5">utils/md5</router-link>
      </c-cell>
    </div>
  </div>
</template>

<script>
import {CPane, CCell} from '../components/base'
import Counter from '../components/Counter'

export default {
  components: {
    CPane,
    CCell,
    Counter
  }
}
</script>
