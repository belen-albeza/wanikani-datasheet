<template>
  <form @submit.prevent="onSubmitToken">
    <p>
      <label
        >Input your
        <a
          href="https://www.wanikani.com/settings/personal_access_tokens"
          rel="external"
        >
          API token</a
        >.<br />
        <input
          type="text"
          name="userToken"
          :value="token"
          placeholder="2607fff0-7f0f-4615-ad88-1d3c24ecc3da"
          required
          size="36"/></label
      ><button>Submit</button>
    </p>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
// pattern="[a-f\d\-]{36}"
export default {
  props: {
    error: String,
    token: String,
  },
  methods: {
    onSubmitToken(e) {
      const userToken = e.target.userToken.value;
      this.$store.dispatch('updateToken', userToken);
    },
  },
};
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
