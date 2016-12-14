<template>
  <div>
    <div ref="xsdMap" class="c-xsd-map"></div>
    <slot></slot>
  </div>
</template>

<script>
import bmap from '../../utils/baidu-map'
import {CIcon} from '../base'

export default {
  props:{
    options: {
      type: Object
    },
    markers: {
      type: Array,
      default:[]
    },
    markerClick:{
      type: Function
    }
  },
  data(){
    return {
      map:null
    }
  },
  created(){
    const opts = Object.assign({
      lat:24.46,
      lng:118.1
    }, this.options)
    
    setTimeout(() => {
      bmap.init(this.$refs.xsdMap, opts).then( map => {
        //pin = map.createPin('images/marker_red_sprite.png', { width:36,height:36 });
        this.markers.forEach( m => {
            const marker = map.addMarker({ label:m.label, geohash:m.geohash });
            marker.addEventListener("click", e => {
              map.centerAndZoom(e.target.point,16);
              if(!!this.markerClick) this.markerClick(m)
            });
        })

      })
    }, 100);
  },
  components: {
    CIcon,
  }
}
</script>

<style>
.c-xsd-map{
  z-index: 2;
  position: absolute !important;
}
.c-xsd-map-actions{
  z-index: 3;
  position: absolute;
  top:10px;
  right:10px;
}
</style>
