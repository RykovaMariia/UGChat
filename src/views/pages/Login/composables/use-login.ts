import { readonly, ref } from 'vue';
import { useRouter } from 'vue-router';
import { routeNames } from '@/router/route-names';
import { authService } from '@/services/auth.service';
import { signalRService } from '@/services/signalr.service';
import { useToast } from '@/composables/use-toast';

export function useLogin() {
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();

  const isConnecting = ref(false);

  const login = async (name: string) => {
    if (!name) return;

    isConnecting.value = true;

    try {
      authService.login(name);
      await signalRService.connect();

      showSuccessToast('Successfully logged in');

      router.replace({ name: routeNames.chat });
    } catch (error) {
      await signalRService.disconnect();

      showErrorToast('Failed to connect. Please try again.');

      authService.logout();
    } finally {
      isConnecting.value = false;
    }
  };

  return {
    isConnecting: readonly(isConnecting),
    login,
  };
}
