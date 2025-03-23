<template>
  <div>
   <HeaderComponent />
   <TableComponent :photos="photosToShow" />
  </div>
</template>


<script setup>
import { computed, ref, watch } from "vue";
import { usePhotoStore } from "~/store/store.ts";


const photo = usePhotoStore();
const isInitialLoad = ref(true);


const photosToShow = computed(() => {
  if (isInitialLoad.value) {
    return [];
  }
  return photo.displayedPhotos;
});

watch(
  () => photo.displayedPhotos,
  (newPhotos) => {
    if (isInitialLoad.value && newPhotos.length > 0) {
      isInitialLoad.value = false;
    }
  }
);

</script>

