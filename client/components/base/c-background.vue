<template>
  <div class="c-background">
    <slot></slot>
  </div>
</template>

<style>
.c-background {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  background: var(--bgLight);
  text-align: center;
  padding:20px;
  letter-spacing: 0.1em;

  & .c-icon{
    font-size:80px;
    line-height: 70px;
  }

  & .title{
    margin-top:10px;
  }

  & .description{
    margin-top: 10px;
    color:var(--textLight);
  }
}
</style>