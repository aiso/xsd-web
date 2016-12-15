<template>
  <div class="c-textfield">
    <validity :field="model.name" :validators="validators">
      <input :id="model.name" class="c-textfield-input" type="text"
        v-bind="attrs"
        :value="model.value"
        @input="_validate"
        @focusout="_validate"
        debounce="500">
    </validity>
    <slot></slot>
  </div>
</template>

<script>
import mField from './m-field'

export default {
  mixins: [mField],
}
</script>

<style>
.c-textfield{
  position: relative;

  & .right-hint{
    position: absolute;
    line-height: var(--formHeight);
    right:0;
    top:0;
    font-size: 12px;
    letter-spacing: 1px;
  }
}
/*
.c-textfield-input{
  @mixin w-input;

}
*/


</style>
