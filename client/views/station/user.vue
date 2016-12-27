<template>
  <c-page>
  	<div class="page-content">
		<div class="table-row p20">
			<c-avatar :src="profile.img"></c-avatar>	
			<div class="extend pl20">
				<h2>{{profile.name}}</h2>
				<h5 class="mt5 c-text-light">{{$store.getters.user.uid}}</h5>
			</div>
		</div>
		<div class="border-bottom pb10 bg-gray-light"></div>
		<c-list-item class="btn" @click.native="logout">
			<c-icon class="list-icon" name="material-exit_to_app"></c-icon>
			<div class="list-title text-ls">安全退出</div>
		</c-list-item>
  	</div>
  </c-page>
</template>

<script>
import { CPage, CCell, CIcon, CListItem, CAvatar } from '../../components/base'

export default {
  computed: {
  	profile(){
  		return this.$store.getters.profile
  	}
  },
  methods: {
	logout() {
	  this.$confirm.open('确实要退出登录？').then(()=>{
		this.xsd.user.logout()
		this.$router.go('/')
	  })
	}
  },
  components: {
  	CPage,
  	CCell,
  	CIcon,
  	CAvatar,
  	CListItem
  }
}
</script>
