<template>
  <div class="xsd-item">
	  <c-thumbnail v-if="!!item.img" :src="item.img" width=50 height=50></c-thumbnail>
	  <div class="item-content" @click="_click">
	  	<h4 v-if="!!item.title" class="title">{{item.title}}</h4>
      <div class="detail">
        <slot name="detail"></slot> 
      </div>
	  </div>
    <div class="filler"></div>
    <slot name="right"></slot>
  </div>
</template>

<script>
import CThumbnail from '../base/c-thumbnail'

export default {
  props: {
    item: {
    	type: Object
    }
  },
  methods: {
    _click(){
      this.$emit('xsd-item-click', this.item)
    }
  },
  components: {
    CThumbnail,
  }
}
</script>

<style>
.xsd-item {
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items:center;


  & .c-thumbnail{
    display: inline-block;
    width:50px;
    height:50px;
    position: relative;
    overflow: hidden;

    & img{
      margin: 0;
      padding: 0;
      max-width: none;
    }
  }

  & .item-content{
    width:65%;
    padding-left: 10px;

    & .title{
      color:var(--text);
      font-weight: normal;
      text-overflow:ellipsis;white-space:nowrap;overflow:hidden;
      //line-height: 1.6em
    }

    &.active, &:active{
      opacity: .6
    }
  }
  & .filler{
    flex: auto;
  }

  & .c-button{
    padding:0 .5rem;
  }
}

</style>