<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Chat</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-list>
          <ion-item v-for="(msg, index) in messages" :key="index">
            <ion-label>
              <h2>{{ msg.sender }}</h2>
              <p>{{ msg.text }}</p>
              <small>{{ new Date(msg.timestamp).toLocaleTimeString() }}</small>
            </ion-label>
          </ion-item>
        </ion-list>

        <ion-input
          v-model="newMessage"
          placeholder="Введите сообщение"
          @keydown.enter="send"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { signalRService } from '@/services/signalr.service';
import { ChatMessage } from '@/types/ChatMessage';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/vue';
import { onMounted, onUnmounted, ref } from 'vue';

const messages = ref<ChatMessage[]>([]);

const newMessage = ref('');

const send = async () => {
  const text = newMessage.value.trim();
  if (!text) return;

  try {
    await signalRService.sendMessage('User1', text);
    newMessage.value = '';
  } catch (err) {
    console.error('Ошибка при отправке сообщения:', err);
  }
};

onMounted(async () => {
  try {
    await signalRService.connect();

    signalRService.onMessage((msg) => {
      messages.value.push(msg);
      console.log(msg);
    });
  } catch (err) {
    console.error('Не удалось подключиться к SignalR:', err);
  }
});

onUnmounted(() => {
  signalRService.disconnect();
});
</script>

<style scoped></style>
