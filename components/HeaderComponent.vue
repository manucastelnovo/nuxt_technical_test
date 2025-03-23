<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          >
        </a>
      </div>
      <div class="relative">
        <label
          for="name"
          class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >Books Ids</label
        >
        <input
          id="name"
          v-model="searchQuery"
          type="text"
          name="name"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="1 2 3..."
        >
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>

      <form
        class="hidden lg:flex lg:flex-1 lg:justify-end"
        @submit.prevent="onSubmit"
      >
        <div>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>
      </form>
    </nav>

  </header>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { usePhotoStore } from "~/store/store.ts";

const mobileMenuOpen = ref(false);
const store = usePhotoStore();
const searchQuery = ref("");
const isLoading = ref(false);

// Cargar IDs almacenados en localStorage al inicio
onMounted(() => {
  const storedIds = localStorage.getItem("albumIds");
  if (storedIds) {
    searchQuery.value = storedIds;
  }
  onSubmit()
});

// Guardar los IDs en localStorage cuando cambien
watch(searchQuery, (newQuery) => {
  localStorage.setItem("albumIds", newQuery);
});

const onSubmit = async () => {
  isLoading.value = true;
  try {

    const ids = searchQuery.value
      .split(" ")
      .map((id) => parseInt(id))
      .filter((id) => !isNaN(id));

    await store.searchPhotos(ids);

  } catch (error) {
    console.error("Error searching books:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
