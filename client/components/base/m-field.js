export default {
  props: {
    model: Object
  },
  data(){
    return {
      $validator:null,
      attrs: Object.assign({ }, this.model.attrs),
      validators: Object.assign({ }, this.model.validators)
    }   
  },
  methods: {
    _validate (e) {
      const $validity = e.target.$validity
      $validity.validate(()=>{
        this.model.value = e.target.value
        this.model.validation($validity.result)
        //this.$validator = $validity.result
      })
    }
  },
}
