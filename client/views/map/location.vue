<template>
  <c-page>
    <c-xsd-item :item="location" class="bg-white p20 marker-info">
      <p slot="subTitle">{{location.subTitle}}</p>
    </c-xsd-item>
		<c-xsd-map :markers="markers" :options="options" class="map-wrapper"></c-xsd-map>
  </c-page>
</template>

<script>
import { CPage, CIcon } from '../../components/base'
import { CXsdItem, CXsdMap } from '../../components/xsd'

export default {
  data(){
    return{
      markers:[{
        label:this.location.title, 
        geohash:this.location.geohash, 
      }],
      options:{
        geohash:this.location.geohash, 
        zoom:14
      }
    }
  },
  created(){

  },
  components: {
  	CPage,
    CIcon,
    CXsdItem,
    CXsdMap
  }
}
</script>

<style>
.marker-info{
  position: absolute;
  top: 0;
  width: 100%;
  z-index:2;
}
</style>
