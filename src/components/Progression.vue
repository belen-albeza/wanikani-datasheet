<template>
  <section>
    <h2>Level progression</h2>
    <h3>Current level</h3>
    <p>
      Level {{ currentLevel.level }} ({{ currentLevel.levelTime.days }} days,
      {{ currentLevel.levelTime.hours }} hours)
    </p>
    <h3>All levels</h3>
    <ul v-for="item in progression" :key="item.level" class="level-list">
      <li><ProgressionItem v-bind="item" /></li>
    </ul>
  </section>
</template>

<script>
import { timeDiff } from '@/lib/utils';
import ProgressionItem from '@/components/ProgressionItem.vue';

export default {
  name: 'Progression',
  components: {
    ProgressionItem,
  },
  props: {
    progression: Array,
  },
  computed: {
    currentLevel() {
      const level = this.progression[this.progression.length - 1];

      const referenceDate = level.passedAt || new Date();
      const levelTime = timeDiff(referenceDate, level.unlockedAt);

      return Object.assign({}, level, { levelTime });
    },
  },
};
</script>

<style lang="scss" scoped>
.level-list {
  list-style: none;
  padding-left: 0;
}
.level > ul {
  list-style-type: disc;
}
</style>
