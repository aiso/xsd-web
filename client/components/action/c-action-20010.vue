<template>
  <h4>{{action.content}}</h4>
</template>

<script>
import actionMixin from './action-mixin'

export default {
  mixins: [actionMixin],
  methods: {
    onAction(){
      if(this.action.user.id == this.user.id){
        console.log('owner')
      }

    }
  }
}

</script>