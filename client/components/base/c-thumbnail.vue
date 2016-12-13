<template>
  <div class="c-thumbnail">
    <img class="c-thumbnail-img"
      :src="src"
      :width="width"
      :height="height"
      :alt="alt"
      :title="title"
      @load="_load">
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: '../../assets/images/noimg.jpg'
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    ratio: {
      type: [String, Number],
      default: ''
    },
    letterBox: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _load ($event) {
      //console.log('width='+this.width+',height='+this.height);
      if(this.width) this.$el.style.width = this.width+'px'
      if(this.height) this.$el.style.height = this.height+'px'

      const img = $event.path[0]
      const w = this.width||img.parentNode.style.width||img.parentNode.clientWidth
      const h = (!!this.ratio)?(w*this.ratio):(this.height||img.parentNode.style.height||img.parentNode.clientHeight)
      const cRatio = w/h;
      //console.log('w='+w+',h='+h+',cRatio='+cRatio);

      getSize(img.src).then(({ width, height }) => {
        const ratio = width / height
        if(this.letterBox){
          const scale = (ratio > cRatio)?(h/height):(w/width) // ratio > cRatio 原图宽比例较大，以高度比例缩放
          //console.log(scale)
          const imgWidth = width*scale
          const imgHeight = height*scale

          img.style.width = imgWidth+'px'
          img.style.height = imgHeight+'px'

          if(ratio > cRatio){ // 宽位移
            img.style.left = -(imgWidth - w)/2+'px';
            img.style.top = '0px';
          }else{
            img.style.top = -(imgHeight - h)/2+'px';
            img.style.left = '0px';
          }

        }else{
          img.style.width = w+'px'
          img.style.height = (img.width / ratio) + 'px'
        }
      })
    }
  }
}

function getSize (src) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = function () {
      reject(null)
    }
    img.src = src
  })
}
</script>

<style>
.c-thumbnail {
  position: relative;
  overflow: hidden;
}

.c-thumbnail-img {
  position: absolute;
  display: inline-block;
  vertical-align: middle;
}

</style>
