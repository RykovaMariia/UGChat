<template>
  <ion-button
    fill="clear"
    @click="logout"
  >
    <ion-icon
      slot="icon-only"
      icon="log-out-outline"
    ></ion-icon>
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/auth.service';
import { signalRService } from '@/services/signalr.service';
import { routeNames } from '@/router/route-names';

const router = useRouter();

const logout = async () => {
  await signalRService.disconnect();
  authService.logout();
  router.replace({ name: routeNames.login });
};
</script>
