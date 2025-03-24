<template>
  <header>
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://www.svgrepo.com/show/354527/vuetifyjs.svg"
            alt=""
          >
        </a>
      </div>
      <div class="relative">
        <label
          for="name"
          class="absolute -top-4 inline-block rounded-lg px-1 text-xs font-medium"
          >Albums Ids</label
        >
        <input
          id="name"
          v-model="searchQuery"
          type="text"
          name="name"
          class="block w-full rounded-md px-3 py-1.5 text-base outline -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="1 2 3..."
        >
      </div>

      <form class="flex flex-1 justify-end gap-10" @submit.prevent="onSubmit">
        <button
          class="ml-5"
          @click="
            setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          type="submit"
          :class="[
            '-m-2.5 inline-flex items-center justify-center rounded-md p-2.5',
            isLoading
              ? 'text-gray-400 bg-gray-300 cursor-not-allowed'
              : 'rounded-md bg-[#1B72BF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
          ]"
          :disabled="isLoading"
        >
          Search
        </button>
      </form>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { usePhotoStore } from "~/store/store.ts";
import { stringToAlbumList } from "~/helpers/albumsId.ts";

const setColorTheme = (newTheme) => {
  useColorMode().preference = newTheme;
};

const store = usePhotoStore();
const searchQuery = ref("");
const isLoading = ref(false);

onMounted(() => {
  const storedIds = localStorage.getItem("albumIds");
  if (storedIds) {
    searchQuery.value = storedIds;
  } else {
    localStorage.setItem("albumIds", "");
  }
  onSubmit();
});

watch(searchQuery, (newQuery) => {
  localStorage.setItem("albumIds", newQuery);
});

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const ids = stringToAlbumList(searchQuery.value);

    await store.searchPhotos(ids);
  } catch (error) {
    console.error("Error searching books:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
