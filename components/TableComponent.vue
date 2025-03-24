<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div
        class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center"
      >
        <div
          class="inline-block max-w-[600px] h-[600px] overflow-auto py-2 align-middle sm:px-6 lg:px-8"
        >
          <div
            v-if="isLoading"
            class="w-full h-full flex justify-center items-center"
          >
            <CircularProgress />
          </div>
          <table v-else class="divide-y table-fixed w-[1251px] divide-gray-300">
            <thead class="sticky -top-2 z-10">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0 w-16"
                >
                  <a href="#" class="group inline-flex">
                    Id
                    <span
                      class="ml-2 flex-none rounded group-hover:bg-gray-500"
                      @click="sort('id', photos)"
                    >
                      <ChevronDownIcon class="size-5" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold w-26"
                >
                  <a href="#" class="group inline-flex"> AlbumId </a>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold"
                >
                  <a href="#" class="group inline-flex"> Title </a>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold"
                >
                  <a href="#" class="group inline-flex"> Url </a>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold"
                >
                  <a href="#" class="group inline-flex"> Thumbnail Url </a>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200" @scroll="handleScroll">
              <tr v-for="photo in photos" :key="photo.id">
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0 truncate"
                >
                  {{ photo.id }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate"
                >
                  {{ photo.albumId }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate"
                  :title="photo.title"
                >
                  {{ photo.title }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate"
                  :title="photo.url"
                >
                  {{ photo.url }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate"
                  :title="photo.thumbnailUrl"
                >
                  {{ photo.thumbnailUrl }}
                </td>
              </tr>
              <tr ref="target" class="h-10 w-full dis" />
              <tr
                v-if="photoStore.isLoading"
                class="w-[600px] flex justify-center mt-4"
              >
                <CircularProgress />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useIntersectionObserver } from "@vueuse/core";
import { usePhotoStore } from "~/store/store.ts";
import { useTemplateRef } from "vue";
import CircularProgress from "./CircularProgress.vue";
import { stringToAlbumList } from "~/helpers/albumsId.ts";

const target = useTemplateRef("target");

const photoStore = usePhotoStore();
const isLoading = ref(true);
const searchQuery = ref("");
const sortOrder = ref("asc");

useIntersectionObserver(target, ([entry]) => {
  if (entry?.isIntersecting && !photoStore.isLoading) {
    isLoading.value = true;
    photoStore.loadMorePhotos();
    isLoading.value = false;
  }
});

onMounted(async () => {
  searchQuery.value = localStorage.getItem("albumIds");
  const ids = stringToAlbumList(searchQuery.value);
  await photoStore.searchPhotos(ids);
  isLoading.value = false;
});

const sort = (key, photosToSort) => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  photosToSort.sort((a, b) => {
    if (sortOrder.value === "asc") {
      return a[key] - b[key];
    } else {
      return b[key] - a[key];
    }
  });
};

defineProps({
  photos: {
    type: Array,
    required: true,
  },
});
</script>
