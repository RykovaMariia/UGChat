import { toastController, ToastOptions } from '@ionic/vue';

export function useToast() {
  const showToast = async (options: ToastOptions) => {
    const { message, color, icon, duration } = options;

    const toast = await toastController.create({ message, duration, color, icon });
    await toast.present();
  };

  const showSuccessToast = (message: string) =>
    showToast({ message, color: 'success', icon: 'checkmark-circle', duration: 3000 });

  const showErrorToast = (message: string) =>
    showToast({ message, color: 'danger', icon: 'close-circle-outline', duration: 5000 });

  return {
    showSuccessToast,
    showErrorToast,
  };
}
