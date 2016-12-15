<template>
  <c-page>
    <div class="page-content">
      <div class="page-title mb20 flex-auto">产品发布</div>  
      <div v-if="!!item">
        <c-xsd-item :item='item' style="margin-bottom:40px"></c-xsd-item> 
        <div v-if="!!posts&&posts.length>0">
          <div class="flex-row mb10">
            <h4 class="c-field-header flex-auto">服务站</h4>
            <h4 class="c-field-header field-price">发布价格</h4>
            <h4 class="c-field-header field-fee">代理费率</h4>
            <h4 class="c-field-header field-state">状态</h4>
            <h4 class="c-field-header field-actions"></h4>
          </div>
          <c-cell v-for="(post,index) in posts" class="flex-row">
            <a class="flex-auto btn" @click="showMap(post.station)">
              <h3>{{post.station.name}}</h3>
              <h5 class="c-text-light">{{post.station.address}}</h5>
            </a>
            <div class="field-price">
              <c-price :amount="post.price"></c-price>
            </div>
            <div class="field-fee">
              <h4 class="font-montserrat">{{post.fee}}%</h4>
            </div>
            <div class="field-state">
              <h4 v-show="post.status==0" class="c-text-light text-bold">待批</h4>
              <h5 v-show="post.status==1" class="c-green text-bold">代理中</h5>
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

    <c-modal :show="!!postModal" @maskClicked="postModal=null">
      <div class="bg-white p20">
        <h3 class="mb15 pl5">发布</h3>
        <div class="flex-row input-cell mb10">
          <h4 class="c-text-light">发布价格：</h4>
          <c-textfield :model="price" class="flex-auto"></c-textfield>
          <h4>元</h4>
        </div>
        <div class="flex-row input-cell mb20">
          <h4 class="c-text-light">代理费率：</h4>
          <c-textfield :model="fee" class="flex-auto"></c-textfield>
          <h4>%</h4>
        </div>
        <div class="flex-row">
          <div class="flex-auto">
            <p class="right-hint c-red text-bold" v-if="validations.priceRequred">价格不能空</p>
            <p class="right-hint c-red text-bold" v-if="validations.pricePattern">价格格式错误</p>

            <p class="right-hint c-red text-bold" v-if="validations.feeRequred">费率不能空</p>
            <p class="right-hint c-red text-bold" v-if="validations.feePattern">费率格式错误</p>
          </div>
          <div>
            <c-button label="提交" class="primary fit" :disabled="!formValid" :submit="submitPost"></c-button>  
          </div>
          
        </div>
      </div>
    </c-modal>

  </c-page>
</template>

<script>
import { CPage, CPane, CCell, CIcon, CPrice, CButton, CModal, CFormCell, CTextfield } from '../../components/base'
import { CXsdItem, CXsdMap } from '../../components/xsd'

export default {
  data(){
    return {
      map:null,
      postModal:null,
      stations:[],
      item:null,
      price:{
        name:'price',
        value:null,
        attrs: {
          placeholder: '0.00'
        },
        validators: {
          required: true,
          pattern: {
            rule: '/^[0-9]{1,7}(\.[0-9]{1,2})?$/',
            message: '价格格式错误'
          }          
        },
        validation: result=>{
          this.validations.priceValid = result.valid
          this.validations.priceRequred = result.required
          this.validations.pricePattern = result.pattern
        }
      },   
      fee:{
        name:'fee',
        value:null,
        attrs: {
          placeholder: '百分比'
        },
        validators: {
          required: true,
          pattern: {
            rule: '/^[0-9]{1,2}(\.[0-9]{1,2})?$/',
            message: '价格格式错误'
          }       
        },
        validation: result=>{
          this.validations.feeValid = result.valid
          this.validations.feeRequred = result.required
          this.validations.feePattern = result.pattern
        }
      }, 
      validations: {
        priceValid:false,
        priceRequred:false,
        pricePattern:false,

        feeValid:false,
        feeRequred:false,
        feePattern:false
      },
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
      /*
      this.$textbox.open('发布价格：').then(price=>{
        this.xsd.api.post('supplier/item/'+this.$route.params.id+'/post', {price, station:station.id}).then(data=>{
          this.item.posts.push(data.post)
        })
      })*/
      this.price.value = this.fee.value = null
      this.postModal = {idx:-1, station:station.id}

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
      this.price.value = post.price
      this.fee.value = post.fee
      this.postModal = {idx}
    },
    submitPost(){
      if(this.postModal.idx < 0){
        this.xsd.api.post('supplier/item/'+this.$route.params.id+'/post', {price:this.price.value, fee:this.fee.value, station:this.postModal.station}).then(data=>{
          this.item.posts.push(data.post)
        }).finally(()=>this.postModal=null)
      }else{
        const post = this.item.posts[this.postModal.idx]
        this.xsd.api.post('supplier/post/'+post.id, {price:this.price.value, fee:this.fee.value}).then(data=>{
          this.item.posts[this.postModal.idx].price = data.post.price
          this.item.posts[this.postModal.idx].fee = data.post.fee
        }).finally(()=>this.postModal=null)
      }

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
    },
    formValid(){
      return this.validations.priceValid && this.validations.feeValid
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
    CFormCell,
    CTextfield,
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
  .field-fee{
    width: 100px;
    text-align: center;
  }
  .field-state{
    width: 100px;
    text-align: center;
  }
  .field-actions{
    width: 100px;
    text-align: center;
  }
</style>
