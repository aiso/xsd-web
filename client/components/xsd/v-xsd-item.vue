<template>
  <div>
    <c-swipe :bus="swipeBus" v-if="!!item.images && item.images.length" class='swipe' :auto="4000">
      <c-swipe-item v-for="image in item.images" :bus="swipeBus">
        <c-thumbnail :src='image.url' :width="slideWidth" height=200 style="overflow: visible"></c-c-thumbnail>
      </c-swipe-item>
    </c-swipe>
    <c-pane>
      <div class="flex-row" style="align-items: flex-start">
        <h3 class="text-ls flex-auto">{{item.title}}</h3>    
        <slot></slot>
      </div>
      <div class="divider"></div>
      <div class="mt10 mb10">
        <c-xsd-profile :uid="item.user"></c-xsd-profile>
      </div>
      <p class="c-text text-ls">{{item.content}}</p>
    </c-pane>
  </div>
</template>


<script>
import Vue from 'vue'
import { CPane, CSwipe, CSwipeItem, CThumbnail } from '../base'
import CXsdProfile from './c-xsd-profile'

export default {
  props : {
    item : {
      type: Object,
      default: null
    }
  },
  data () {
    return { 
      slideWidth: 400,
      swipeBus: new Vue()
    }
  },
  mounted () {
    this.slideWidth = this.$el.clientWidth
  },
  components: {
    CPane,
    CSwipe,
    CSwipeItem,
    CThumbnail,
    CXsdProfile
  }
}
</script>

<style>
  .swipe {
      height: 200px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
    }
</style>