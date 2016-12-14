<template>
  <c-page :state="state">
  <div class="page-content">
    <div class="flex-row page-header">
      <div class="page-title flex-auto">编辑产品</div>  
      <div>
        <c-button class="mr10 primary fit" label="保存" :submit="save" :disabled="invalid"></c-button>
      </div>
    </div>
    <c-pane v-if="item">
      <div class="divider"></div>
      <div>
        <c-label>产品名称：</c-label>
        <c-autosize-textarea 
          :attrs="{placeholder:'长度不小于10'}"
          :handle-change="hangeTitle" 
          :value="item.title">
        </c-autosize-textarea>
      </div>
      <div class="divider"></div>
      <div>
        <c-label class="flex-auto">产品价格：</c-label>
        <input @input="handlePrice" :value="item.price" class="input-gray" placeholder='0.00'>
      </div>
      <div class="divider"></div>
      <div>
        <c-label>产品描述：</c-label>
        <c-autosize-textarea
          :handle-change="hangeContent" 
          :value="item.content">
        </c-autosize-textarea>
      </div>
      <div class="divider"></div>
      <div>
        <div class="flex-row">
          <c-label class="flex-auto">产品图片：</c-label>  
          <a @click="addImage"><c-icon name="material-add" class='btn'></c-icon></a>  
        </div>
        <div v-for="img in images">
          <div class="table-row mt10" v-show="img.delete!==true">
            <div class="plr20">
              <c-thumbnail :src="img.url" class="image-square" width=40 height=40></c-thumbnail>  
            </div>
            <div class="extend pr10">
              <h4>{{img.name}}</h4>
              <p>{{img.size}}</p>
            </div>
            <div>
              <a class="warning" @click="img.delete=true"><c-icon name="material-clear" class="block"></c-icon></a>
            </div>
          </div>
        </div>
      </div>
    </c-pane>
  </div>

  </c-page>
</template>


<script>
import { CPage, CPane, CCell, CLabel, CButton, CIcon, CThumbnail, CFormCell, CAutosizeTextarea } from '../../components/base'
import ImageUtil from '../../utils/image'

export default {
  data () {
    return {
      state:this.xsd.state.normal,
      item: { id:0, title:null, content:null, price:null },
      images: [],
    }
  },
  activated(){
    if(!!this.itemId){
      this.state = this.xsd.state.loading
      this.xsd.item.get(this.itemId).then(item=>{
        this.initData(item);
         this.state = this.xsd.state.normal
      })
    }else{
      this.item = { id:0, title:null, content:null, price:null }
      this.images = []
    }
  },
  computed:{
    itemId(){
      return !!this.$route.params.id?this.$route.params.id:0
    },
    invalid(){
      return !this.item.title || this.item.title.length < 10 
        || !this.item.price || !this.xsd.regex.price.test(this.item.price)
    },
  },
  methods: {
    initData(item){
      const images = []
      !!item.images  && item.images.forEach( img =>{
        images.push({ id:img.id, url:img.url, name:img.name, size:img.size, delete:false })
      } )
      this.item = item
      this.images = images
    },
    hangeTitle(e){
      this.item.title = e.target.value
    },
    hangeContent(e){
      this.item.content = e.target.value
    },
    handlePrice(e){
      console.log(e)
      this.item.price = e.target.value
    },
    addImage () {
        ImageUtil.select().then( img => {
            this.images.push({ id:0, url:img.dataUrl, name:img.file.name, size:img.file.size,delete:false })
        })
    },
    removeImage(idx){
      this.images[idx].delete = true;
    },
    save () {
      if (this.invalid) {
        return
      }

      var modify = Object.assign({ }, this.item, { images:this.images })
      this.xsd.api.post('item/'+this.itemId, modify).then( data => {
        if(!!this.itemId){
          this.$store.dispatch('updateItem',data.item)
          this.xsd.item.dirty(this.itemId)
        }
        else{
          this.$store.dispatch('addItem',data.item)
        }
        this.xsd.nav.back()

      })
    }
  },
  components: {
    CPage,
    CPane, 
    CCell, 
    CLabel, 
    CButton, 
    CIcon, 
    CThumbnail,
    CFormCell,
    CAutosizeTextarea
  }
}
</script>

