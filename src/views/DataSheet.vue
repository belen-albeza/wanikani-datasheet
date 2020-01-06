<template>
  <article>
    <TokenInput v-if="!user.username && !isLoading" v-bind="api" />
    <UserTag v-if="user.username" v-bind="user"></UserTag>
    <Progression v-if="progression" :progression="progression"></Progression>
    <p v-if="isLoading">Loading…</p>
  </article>
</template>

<script>
import { mapState } from 'vuex';
import Progression from '@/components/Progression.vue';
import TokenInput from '@/components/TokenInput.vue';
import UserTag from '@/components/UserTag.vue';

export default {
  name: 'datasheet',
  components: {
    Progression,
    TokenInput,
    UserTag,
  },
  computed: {
    ...mapState(['api', 'user', 'progression']),
    isLoading() {
      return this.shallFetchUser || this.shallFetchProgression;
    },
    shallFetchUser() {
      return this.api.token && !this.user.username && !this.api.error;
    },
    shallFetchProgression() {
      return (
        this.api.token &&
        this.user.username &&
        this.progression === null &&
        !this.api.error
      );
    },
  },
  watch: {
    shallFetchProgression() {
      if (this.shallFetchProgression) {
        this.$store.dispatch('fetchProgression');
      }
    },
  },
  mounted() {
    if (this.shallFetchUser) {
      this.$store.dispatch('fetchUserData');
    }
  },
};
</script>
