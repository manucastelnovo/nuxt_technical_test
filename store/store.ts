import { defineStore } from 'pinia';
import axios from 'axios';
import type { photo } from '~/models/photo';

const API_URL = "https://jsonplaceholder.typicode.com/photos"; 

export const usePhotoStore = defineStore('photos', {
  state: () => ({
    photos: [] as photo[], 
    displayedPhotos: [] as photo[], 
    currentIndex: 0, 
    isLoading: false, 
  }),

  actions: {
    async searchPhotos(albumQueryUrl: string) {
      if (this.isLoading) return; 
      this.isLoading = true;
      this.displayedPhotos = []
      this.currentIndex = 0
      try {
        const response = await axios.get(`${API_URL}?${albumQueryUrl}`); 
        this.photos = response.data; 
        this.loadMorePhotos();

      } catch (error) {
        console.error("Error fetching photos", error);
      } finally {
        this.isLoading = false; 
      }
    },

    loadMorePhotos() {
      const photosToShow = this.photos.slice(this.currentIndex, this.currentIndex + 20); 
      this.displayedPhotos = [...this.displayedPhotos, ...photosToShow]; 
      this.currentIndex += 30; 
    },
  },
});
