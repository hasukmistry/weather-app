<script setup lang="ts">
defineProps<{
  id: string
  name: string
  modelValue: string
  isReadOnly: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const update = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>

<template>
  <div
    class="wa-form-control flex flex-col rounded-lg px-1 py-[9px]"
    :class="isReadOnly ? 'bg-[#F5F5F5]' : 'bg-[#FFFFFF] border border-[#F5F5F5]'"
  >
    <label class="text-[8px] leading-[100%]" :for="id">{{ name }}</label>
    <input
      :id="id"
      type="text"
      class="text-[14px] mt-2 outline-0 leading-[100%] font-[510px]"
      :value="modelValue"
      @input="update"
      :disabled="isReadOnly"
    />
  </div>
</template>
