import { defineStore } from 'pinia';
import axios from 'axios';
import type { photo } from '~/models/photo';

const API_URL = "https://jsonplaceholder.typicode.com/photos"; // Tu API

export const usePhotoStore = defineStore('photos', {
  state: () => ({
    photos: [] as photo[], // Todas las fotos
    displayedPhotos: [] as photo[], // Fotos que se muestran actualmente
    currentIndex: 0, // Índice actual de donde empezar a mostrar las fotos
    isLoading: false, // Indicador de carga
  }),

  actions: {
    async searchPhotos(albumQuery: []) {
      if (this.isLoading) return; // Si ya estamos cargando, no hacemos otra petición

      this.isLoading = true;
      const albumQueryUrl = albumQuery
        .map((album) => `&albumId=${album}`)
        .join("");

      try {
        const response = await axios.get(`${API_URL}?${albumQueryUrl}`); // Consulta para todas las fotos
        this.photos = response.data; // Guardamos todas las fotos
        this.loadMorePhotos(); // Cargamos las primeras fotos para mostrar
      } catch (error) {
        console.error("Error fetching photos", error);
      } finally {
        this.isLoading = false; // Terminamos de cargar
      }
    },

    loadMorePhotos() {
      const photosToShow = this.photos.slice(this.currentIndex, this.currentIndex + 20); // Seleccionamos un bloque de fotos para mostrar
      this.displayedPhotos = [...this.displayedPhotos, ...photosToShow]; // Añadimos esas fotos a las que ya se están mostrando
      this.currentIndex += 20; // Actualizamos el índice
    },
  },
});
