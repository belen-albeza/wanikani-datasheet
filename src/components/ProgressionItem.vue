<template>
  <details class="level">
    <summary
      >Level {{ level }} ({{ levelTime.days }} days,
      {{ levelTime.hours }} hours)
    </summary>
    <ul>
      <li>Unlocked at: {{ unlockedAt.toLocaleString('en-GB') }}</li>
      <li>
        Passed at:
        {{ passedAt ? passedAt.toLocaleString('en-GB') : 'in progress' }}
      </li>
    </ul>
  </details>
</template>

<script>
import { timeDiff } from '@/lib/utils';

export default {
  name: 'ProgressionItem',
  props: {
    level: {
      type: Number,
      required: true,
    },
    unlockedAt: {
      type: Date,
      required: true,
    },
    passedAt: Date,
  },
  computed: {
    levelTime() {
      const referenceDate = this.passedAt || new Date();
      return timeDiff(referenceDate, this.unlockedAt);
    },
  },
};
</script>

<style></style>
