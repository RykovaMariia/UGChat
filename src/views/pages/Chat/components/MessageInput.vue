<template>
  <form @submit.prevent="sendMessage">
    <ion-row class="ion-align-items-center">
      <ion-col size="9">
        <ion-item lines="none">
          <ion-textarea
            v-model.trim="message"
            placeholder="Please enter your message"
            :auto-grow="true"
            :rows="1"
            class="input"
            autofocus
            @keydown.enter="handleEnter"
          />
        </ion-item>
      </ion-col>
      <ion-col size="3">
        <ion-button
          expand="block"
          color="primary"
          type="submit"
          :disabled="!message"
        >
          Send
        </ion-button>
      </ion-col>
    </ion-row>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonTextarea, IonButton, IonItem, IonCol, IonRow } from '@ionic/vue';
import { authService } from '@/services/auth.service';
import { signalRService } from '@/services/signalr.service';

const currentUser = authService.getUserName();
const message = ref('');

const sendMessage = async () => {
  const text = message.value;
  if (!text || !currentUser) return;

  try {
    await signalRService.sendMessage(currentUser, text);
    message.value = '';
  } catch (err) {
    console.error('Failed to send message:', err);
  }
};

const handleEnter = (event: KeyboardEvent) => {
  if (event.shiftKey) return;
  event.preventDefault();
  sendMessage();
};
</script>

<style scoped>
.input {
  max-height: 10rem;
  overflow-y: auto;
}
</style>
