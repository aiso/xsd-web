<template>
   <component :is="'CItemAgent'+item.service" :item="item" :agent="agent"></component>
</template>

<script>
import PropsItemAgent from './props-item-agent'
import CItemAgent101 from './c-item-agent-101'

export default {
  mixins: [PropsItemAgent],
  components:{
  	CItemAgent101
  }
}
</script>

