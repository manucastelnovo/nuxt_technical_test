<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div
        class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center"
      >
        <div
          class="inline-block max-w-[600px] h-[600px] overflow-auto py-2 align-middle sm:px-6 lg:px-8"
        >
          <table class="divide-y table-fixed w-[1251px] divide-gray-300">
            <thead class="bg-white">
              <tr>
                <th
                  scope="col"
                  class="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-16"
                >
                  <a href="#" class="group inline-flex">
                    Id
                    <span
                      class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                    >
                      <ChevronDownIcon class="size-5" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-26"
                >
                  <a href="#" class="group inline-flex">
                    AlbumId
                    <span
                      class="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200"
                    >
                      <ChevronDownIcon class="size-5" aria-hidden="true" />
                    </span>
                  </a>
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <a href="#" class="group inline-flex">
                    Title
                    <span
                      class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                    >
                      <ChevronDownIcon
                        class="invisible ml-2 size-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <a href="#" class="group inline-flex">
                    Url
                    <span
                      class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                    >
                      <ChevronDownIcon
                        class="invisible ml-2 size-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <a href="#" class="group inline-flex">
                    Thumbnail Url
                    <span
                      class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                    >
                      <ChevronDownIcon
                        class="invisible ml-2 size-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-gray-200 bg-white"
              @scroll="handleScroll"
            >
              <tr v-for="photo in photos" :key="photo.id">
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 truncate"
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
              <tr ref="target" class="h-10 w-full" />
              <tr  class="text-center p-4 w-full flex justify-center">

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

// Referencia al div del "infinite scroll" (último elemento de la lista)
const target = useTemplateRef("target");

// Usamos el store de fotos
const photoStore = usePhotoStore();

// Detectamos la intersección del último elemento de la lista
useIntersectionObserver(target, ([entry]) => {
  if (entry?.isIntersecting && !photoStore.isLoading) {
    photoStore.loadMorePhotos();
    console.log("entre");
  }
});

// Cargamos las primeras fotos cuando el componente se monta
// photoStore.loadPhotos([1, 2, 3])

defineProps({
  photos: {
    type: Array,
    required: true,
  },
});
</script>
