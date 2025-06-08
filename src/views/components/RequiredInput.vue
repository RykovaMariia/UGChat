<template>
  <ion-input
    ref="inputRef"
    v-model="name"
    required
    :placeholder
    :label-placement
    :autofocus
    :error-text="`${label} is required`"
    @ionInput="validate"
    @ionBlur="markTouched"
  >
    <div v-if="label" slot="label">
      {{ label }} <ion-text color="danger">*</ion-text>
    </div>
  </ion-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonInput, IonText } from '@ionic/vue';
import { InputInputEventDetail } from '@ionic/core';
import { IonInputCustomEvent } from '@ionic/core/components';

type IonInputProps = InstanceType<typeof IonInput>['$props'];

const { label, placeholder } = defineProps<{
  label: string;
  placeholder: string;
  labelPlacement: IonInputProps['labelPlacement'];
  autofocus: IonInputProps['autofocus'];
}>();

const name = defineModel<string | null>();

const inputRef = ref<InstanceType<typeof IonInput> | null>(null);

const validate = (event: IonInputCustomEvent<InputInputEventDetail>) => {
  const value = event.target.value;
  const el = inputRef.value?.$el;

  if (!el) return;

  el.classList.remove('ion-valid', 'ion-invalid');

  if (value) return;

  el.classList.add('ion-invalid');
};

const markTouched = () => {
  inputRef.value?.$el.classList.add('ion-touched');
};
</script>
