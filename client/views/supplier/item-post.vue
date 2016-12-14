<template>
  <c-page>
    <div class="page-content">
      <div class="page-title mb20 flex-auto">产品发布</div>  
      <div v-if="!!item">
        <c-xsd-item :item='item' class="mb20"></c-xsd-item> 
        <div v-if="!!posts&&posts.length>0">
          <div class="flex-row mb10">
            <h3 class="c-field-header flex-auto">服务站</h3>
            <h3 class="c-field-header field-price">发布价格</h3>
            <h3 class="c-field-header field-actions"></h3>
          </div>
          <c-cell v-for="(post,index) in posts" class="flex-row">
            <a class="flex-auto btn" @click="showMap(post.station)">
              <h3>{{post.station.name}}</h3>
              <h5 class="c-text-light">{{post.station.address}}</h5>
            </a>
            <div class="field-price">
              <c-price :amount="post.price"></c-price>
            </div>
            <div class="field-actions">
              <a class="btn-icon" @click="removePost(post)"><c-icon name="material-delete_forever"></c-icon></a>
              <a class="btn-icon" @click="editPost(index)"><c-icon name="material-edit"></c-icon></a>
            </div>
          </c-cell>
        </div>
      </div>
      

    </div>
    <div class="page-sidebar bg-gray-light">
      <h2 class="c-text-light mb20">服务站列表</h2>
      <c-pane class="flex-row" v-for="station in avaStations">
        <a class="flex-auto btn pr10" @click="showMap(station)">
          <h3>{{station.name}}</h3>
          <h5 class="c-text-light">{{station.address}}</h5>
        </a>
        <div>
          <a class="btn-round primary" @click="addPost(station)"><c-icon name="material-add"></c-icon></a>
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
import { CPage, CPane, CCell, CIcon, CPrice, CButton, CModal } from '../../components/base'
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
  activated(){
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
      this.$textbox.open('发布价格：').then(price=>{
        this.xsd.api.post('supplier/item/'+this.$route.params.id+'/post', {price, station:station.id}).then(data=>{
          this.item.posts.push(data.post)
        })
      })
    },
    removePost(post){
      this.$confirm.open('确定要删除此发布？').then(()=>{
        this.xsd.api.delete('supplier/post/'+post.id).then(()=>{
          this.item.posts = this.item.posts.filter(p=>p.id!=post.id)
        })
      })
    },
    editPost(idx){
      const post = this.item.posts[idx]
      this.$textbox.open('发布价格：', post.price).then(price=>{
        this.xsd.api.post('supplier/post/'+post.id, {price}).then(data=>{
          this.item.posts[idx].price = price
        })
      })
    }
  },
  computed:{
    avaStations(){
      return this.stations.filter(station=>{
        return !this.item || this.item.posts.findIndex(post=>post.station==station.id)<0
      })
    },
    posts(){
      return this.item.posts.map(post=>{
        const p = Object.assign({}, post)
        p.station = this.stations.find(s=>s.id==post.station)
        return p
      })
    }

  },
  components: {
  	CPage,
    CPane,
    CCell,
    CIcon,
    CPrice,
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

  .field-price{
    width: 100px;
    text-align: center;
  }
  .field-actions{
    width: 100px;
    text-align: center;
  }
</style>
