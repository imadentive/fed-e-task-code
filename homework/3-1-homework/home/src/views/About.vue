<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{id}}</h1>
  </div>
</template>

<script>
export default {
  props: ['id'],
  mounted() {
    console.log(this);
  },
};
</script>>
