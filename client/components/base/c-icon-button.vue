<template>
	<a class="c-icon-button" >
		<c-icon :name="icon"></c-icon>
	</a>
</template>


<script>
import CIcon from './c-icon'

export default {
  props: {
    icon: String,

  },
  components: {
    CIcon
  }
}
</script>

<style>
.c-icon-button {
	display: inline-block;
	width:var(--blockSize);
	height: var(--blockSize);
	text-align: center;

	& .c-icon{
		font-size:24px;
		line-height: var(--blockSize);
	}

	&:active{
		background: var(--bgLight);
		color:var(--primary);
	}
}
</style>