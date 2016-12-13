<template>
  <div class="c-price">
    <slot></slot>
    <span class="c-price-currency">{{pref}}</span><span class="c-price-amount">{{ amount | currency('') }}</span>
  </div>
</template>


<script>
export default {
  props: {
    pref: {
      type: String,
      default: '￥'
    },
    amount: {
      type: [String, Number],
      default: '0.00'
    }
  }
}
</script>

<style>
.c-price-currency {
  font-weight: bold;
}

.c-price-amount{
  font-family: Montserrat,sans-serif;
}

.c-price.big{
  font-size: 18px;
}

.c-price.small{
  font-size: 10px;
}
</style>

