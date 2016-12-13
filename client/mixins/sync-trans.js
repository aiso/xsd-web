export default {
  data(){
  	return {
      state:this.xsd.state.normal,
  	  transes: []
  	}
  },
  created(){
    if(this.$store.getters.transes == null){
      this.state = this.xsd.state.loading
      this.xsd.sync.load('transes').then(()=>{
        this.transes = this.$store.getters.transes
        this.state = this.xsd.state.normal
      })
    }else{
      this.transes = this.$store.getters.transes
    }
  },
}