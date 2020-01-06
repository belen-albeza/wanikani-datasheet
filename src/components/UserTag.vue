<template>
  <p>
    <b>{{ username }}</b
    >, level {{ level }}
  </p>
</template>

<script>
export default {
  name: 'UserTag',
  props: {
    username: String,
    level: Number,
  },
};
</script>

<style></style>
