<template>
  <div class="c-toolbar">
    <slot></slot>
  </div>
</template>

<style>
.c-toolbar {
  height: var(--footerHeight);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items:center;

  & .center{
    flex:auto;
  }

  & .btn{
    display: inline-block;
    width: var(--footerHeight);
    height: var(--footerHeight);
    color:#666;
    text-align: center;

    &:active{
      background-color: color(var(--secondary) alpha(10%));
      color:var(--primary);;
    }

    & .c-icon{
      font-size:24px;
      line-height: var(--footerHeight);
    }
  }

  & .c-button{
    width:auto;
    padding:0 1rem;
    line-height: 1rem;
    height: 2rem;
  }

  & .title{
    line-height: var(--footerHeight);
    width:100%;
    font-size:14px;
  }
}

</style>
