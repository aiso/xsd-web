<template>
  <c-page>
		businesses123
  </c-page>
</template>

<script>
import { CPage } from '../../components/base'

export default {
  beforeRouteEnter : (to, from, next) => {
  	console.log('11111')
  	next()
  },
  components: {
  	CPage
  }
}
</script>
