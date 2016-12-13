<template>
  <div class="c-validation">
    <ul class="c-validation-errors"
      v-if="validation.errors">
      <li class="c-validation-error"
        v-for="error in validation.errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    validation: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>


<style>
.c-validation {
}

.c-validation-error {
  margin: 0.5rem 0;
  padding: 0.3rem 0.3rem 0.3rem 0.8rem;
  cursor: default;
  color: var(--warning);
  border-radius: 0.25rem;
  background-color: color(var(--warning) lightness(90%));
  list-style-type: disc;
  list-style-position: inside;
}

</style>
