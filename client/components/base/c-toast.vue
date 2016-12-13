<template>
  <div class="c-toast">
    <transition-group name="top-in" mode="out-in">
      <div :class="['toast', toast.class]" v-for="toast in toasts" :key="toast._id">
        <div class="toast-content">
          <h4 v-if="toast.title" class="title">{{toast.title}}</h4>
          <p class="message">{{toast.message}}</p>
        </div>
        <a class="remove" v-if="!!toast.remove" @click="toast.remove" >
          <c-icon name="material-clear"></c-icon>
        </a>
      </div>
    </transition-group>
  </div>

</template>

<script>
import CIcon from './c-icon'

export default {
  props: {
    toasts: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    CIcon
  }
}
</script>

<style>
.c-toast {
  position: fixed;
  z-index: 10001;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;

  & .toast {
    display: flex;
    margin: 0 0 0.25rem;
    padding: 1rem;
    min-width: 12rem;
    color:white;

    &.info{
      background-color: var(--primary);
    }
    &.error{
      background-color: var(--error);
    }

    & .toast-content{
      flex: auto;
      padding-right:10px;
    }

    & .title {

    }
    & .message {
      max-height: 16rem;
      overflow: auto;
    }

    & a.remove{
      color:white;
      &:active{
        color:#666;
      }
    }
  }
}

</style>
