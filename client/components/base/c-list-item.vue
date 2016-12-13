<template>
  <div class='c-list-item'><slot></slot></div>
</template>

<style>
.c-list-item {
	border-left: 3px solid transparent;
    height: 60px;
    border-bottom: 1px solid #e7e7e9;

	&.highlighted{
		border-left: 3px solid var(--primary);
	}

	& .list-icon {
	    display: inline-block;
	    width: 50px;
	    height: 50px;
	    float: left;
	    color: #ddd;
	    font-size: 32px;
	    line-height: 60px;
	    text-align: center;
	}

	& .list-title {
	    display: inline-block;
	    float: left;
	    font-size: 14px;
	    line-height: 60px;
	}
}
</style>
