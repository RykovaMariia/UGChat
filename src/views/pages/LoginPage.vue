<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <form @submit.prevent="submit">
        <RequiredInput
          label="Name"
          v-model.trim="name"
          label-placement="stacked"
          placeholder="Enter your name"
          :autofocus="true"
        />

        <ion-button expand="block" type="submit" :disabled="!name"
          >Login</ion-button
        >
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { routeNames } from '@/router/route-names';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  onIonViewWillEnter,
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RequiredInput from '../components/RequiredInput.vue';

const router = useRouter();

const name = ref('');

const submit = () => {
  console.log(name.value);
  router.push({ name: routeNames.chat });
};

onIonViewWillEnter(() => {
  if (name.value) {
    name.value = '';
  }
});
</script>

<style scoped></style>
