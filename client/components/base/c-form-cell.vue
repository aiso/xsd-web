<template>
  <div class="c-form-cell"><slot></slot></div>
</template>


<style>

.c-form-cell {
  padding: .5rem 0;
  position: relative;
  display: flex;

  &:active {
    background-color: color(var(--secondary) alpha(10%))
  }

  & .c-icon{
    display: block;
    width: var(--formHeight);
    height: var(--formHeight);
    line-height: var(--formHeight);
    text-align: center;
    font-size:28px;
    color:var(--textLight);
  }

  & .c-textfield{
    flex:auto;
    padding:0 .5rem;
  }
}

</style>
