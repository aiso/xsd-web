<template>
  <div class="flex-row">
    <h4 class="flex-auto">{{statement}}</h4>
    <a :class="statement.class" @click="onAction">{{statement.text}}</a>
  </div>
</template>

<script>
import actionMixin from './action-mixin'

export default {
  mixins: [actionMixin],
  computed: {
    statement(){
      return (this.action.stat == 0)?'待处理...':'已完成'
    }
  },
  methods: {
    onAction(){

    }
  }
}

</script>