<template>
  <c-page>
    <div class="page-content">
      <div class="page-title mb20 flex-auto">产品发布</div>  
      <c-xsd-item :item='item' v-if="!!item">
      </c-xsd-item>

    </div>
    <div class="page-sidebar">
      <h2 class="c-text-light mb20">服务站列表</h2>
      <c-pane class="flex-row" v-for="station in avaStations">
        <a class="flex-auto btn" @click="showMap(station)">
          <h3>{{station.name}}</h3>
          <h5 class="c-text-light">{{station.address}}</h5>
        </a>
        <div>
          <a class="btn-icon" @click="addPost(station)"><c-icon name="material-add"></c-icon></a>
        </div>
      </c-pane>
    </div>

    <c-xsd-map v-if="!!map" :markers="map.markers" :options="map.options">
      <div class="c-xsd-map-actions">
        <a class="btn-round white" @click="map=null"><c-icon name="material-clear"></c-icon></a>
      </div>
    </c-xsd-map>


  </c-page>
</template>

<script>
import { CPage, CPane, CIcon, CButton, CModal } from '../../components/base'
import { CXsdItem, CXsdMap } from '../../components/xsd'

export default {
  data(){
    return {
      map:null,
      postModal:null,
      stations:[],
      item:null
    }
  },
  created(){
    this.xsd.api.get('stations').then(data=>{
      this.stations = data.stations
    })
    this.xsd.api.get('supplier/item/'+this.$route.params.id+'/posts').then(data=>{
      this.item = data.item
    })
  },
  methods:{
    showMap(station){
      this.map = {
        markers:[{label:station.name, geohash:station.geohash}],
        options:{geohash:station.geohash, zoom:14}
      }
    },
    addPost(station){
      console.log(station)
      this.$textbox.open('发布价格：').then(data=>{
        console.log(data)
      })
    }
  },
  computed:{
    avaStations(){
      return this.stations.filter(station=>{
        return !this.item || this.item.posts.findIndex(post=>post.station==station.id)<0
      })
    }

  },
  components: {
  	CPage,
    CPane,
    CIcon,
    CButton,
    CModal,
    CXsdMap,
    CXsdItem
  }
}
</script>

<style>
  .c-xsd-map{
    top:0;
    width: 100%;
    height: 100%;
  }
</style>
