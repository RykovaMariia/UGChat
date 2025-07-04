<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title slot="start">UGChat</ion-title>
        <ion-buttons slot="end">
          {{ currentUser }}
          <LogoutButton />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content
      :fullscreen="true"
      ref="contentRef"
    >
      <div
        id="container"
        class="ion-padding"
      >
        <ion-grid>
          <Message
            v-for="(msg, index) in messages"
            :key="index"
            :msg="msg"
          />
        </ion-grid>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <MessageInput />
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonFooter } from '@ionic/vue';

import { signalRService } from '@/services/signalr.service';
import LogoutButton from '@/views/components/LogoutButton.vue';

import { ChatMessage } from '@/types/ChatMessage';
import Message from './components/Message.vue';
import { authService } from '@/services/auth.service';
import MessageInput from './components/MessageInput.vue';

const messages = ref<ChatMessage[]>([]);
const currentUser = authService.getUserName();

const contentRef = ref<InstanceType<typeof IonContent> | null>(null);

const scrollToBottom = async () => {
  if (contentRef.value) {
    await contentRef.value.$el.scrollToBottom(300);
  }
};

onMounted(async () => {
  try {
    await signalRService.connect();

    signalRService.onMessage((msg) => {
      messages.value.push(msg);
      nextTick(() => {
        scrollToBottom();
      });
    });
  } catch (err) {
    console.error('Failed to connect to SignalR:', err);
  }
});

onUnmounted(() => {
  signalRService.disconnect();
});
</script>

<style scoped></style>
