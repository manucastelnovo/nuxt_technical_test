<template>
    <div class="flex items-center justify-center h-full w-full">
      <div class="w-12 h-12 border-4 border-t-4 border-[#1B72BF] rounded-tr-md animate-spin"/>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'IndeterminateProgress',
  });
  </script>
  
  <style scoped>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  </style>