<template>
  <ion-row>
    <ion-col
      :offset="isMine ? '3' : '0'"
      size="9"
      class="message"
      :class="{ my_message: isMine }"
    >
      <span class="sender">{{ msg.sender }}</span
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
import { formatDateTime } from '../utils/format-date-time';

const { msg } = defineProps<{ msg: ChatMessage }>();
const currentUser = authService.getUserName();

const isMine = computed(() => msg.sender === currentUser);

const time = computed(() => formatDateTime(msg.timestamp));
</script>

<style scoped>
.message {
  position: relative;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--ion-color-light);
  margin-bottom: 0.75rem;
  font-size: 1rem;
  line-height: 1.4;
  word-wrap: break-word;
}

/* Tail on the left side */
.message::after {
  content: '';
  position: absolute;
  bottom: 0.1rem;
  width: 0;
  height: 0;
  border: 1rem solid transparent;
  left: -1.6rem;
  border-right-color: var(--ion-color-light);
}

.my_message {
  background-color: var(--ion-color-primary);
  color: var(--ion-color-light-shade);
}

/* Tail on the right side */
.my_message::after {
  right: -0.5rem;
  left: auto;
  border-left-color: var(--ion-color-primary);
  border-right: 0;
}

.sender {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--ion-color-primary-shade);
}

.my_message .sender {
  color: var(--ion-color-light-shade);
}

.text {
  font-size: 1rem;
  color: var(--ion-color-light-medium-shade);
  white-space: pre-line;
}

.my_message .text {
  color: var(--ion-color-light-tint);
}

.time {
  text-align: right;
  font-size: 0.65rem;
  color: var(--ion-color-medium-tint);
  margin-top: 0.25rem;
}

.my_message .time {
  color: var(--ion-color-light-shade);
}
</style>
