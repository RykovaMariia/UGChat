<template>
  <ion-row>
    <ion-col
      :offset="isMine ? '3' : '0'"
      size="9"
      class="message"
      :class="{ my_message: isMine }"
    >
      <span
        v-if="!isMine"
        class="sender"
        >{{ msg.sender }}</span
      ><br />
      <span class="text">{{ msg.text }}</span>
      <div class="time">{{ time }}</div>
    </ion-col>
  </ion-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChatMessage } from '@/types/ChatMessage';
import { authService } from '@/services/auth.service';
import { IonCol, IonRow } from '@ionic/vue';

const { msg } = defineProps<{ msg: ChatMessage }>();
const currentUser = authService.getUserName();

const isMine = computed(() => msg.sender === currentUser);

const time = computed(() =>
  new Date(msg.timestamp).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }),
);
</script>

<style scoped>
.message {
  padding: 10px;
  border-radius: 10px;
  background-color: var(--ion-color-medium);
  margin-bottom: 8px;
}

.my_message {
  background-color: var(--ion-color-primary);
  color: var(--ion-color-light-shade);
}

.sender {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--ion-color-light-shade);
}

.text {
  font-size: 1rem;
  color: var(--ion-color-light-shade);
}

.time {
  text-align: right;
  font-size: 0.65rem;
  color: var(--ion-color-light-shade);
  margin-top: 5px;
}
</style>
