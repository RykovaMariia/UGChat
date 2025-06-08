<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content
      :fullscreen="true"
      class="ion-padding"
    >
      <form @submit.prevent="login(name)">
        <RequiredInput
          label="Name"
          v-model.trim="name"
          label-placement="stacked"
          placeholder="Enter your name"
          :autofocus="true"
        />

        <ion-button
          expand="block"
          type="submit"
          :disabled="!name || isConnecting"
        >
          <ion-spinner
            v-if="isConnecting"
            name="dots"
          />
          <span v-else>Login</span>
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner } from '@ionic/vue';
import { ref } from 'vue';

import { useLogin } from './composables/use-login';
import RequiredInput from '@/views/components/RequiredInput.vue';

const { isConnecting, login } = useLogin();

const name = ref('');
</script>

<style scoped></style>
