<template>
  <div id="map-container" class="relative h-screen w-full">
    <div id="map" class="absolute z-0"></div>
    <FormShape v-if="modalStore.showModal" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"/>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FormShape from './FormShapes.vue'
import { useModalStore } from '../store.js';
import { useCheckboxStore } from '../store.js';
import { ref, onMounted } from 'vue';

export default {
  components:{
    FormShape
  },
  name: 'MyMap',
  setup() {
    const modalStore = useModalStore();
    const checkboxStore = useCheckboxStore();
    const geoJsonLayers = ref({});

    const loadShapesFromIndexedDB = async () => {
      const map = L.map('map').setView([-20.519, -56.7217], 10);

      L.control.zoom({
        position: 'topright'
      }).addTo(map);

      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Instituto Homem Pantaneiro',
      }).addTo(map);

      const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenTopoMap',
      });

      const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; '
      });

      const Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy;  ',
        maxZoom: 16
      });

      const layerControl = L.control.layers({
        'OpenStreetMap': osmLayer,
        'Topográfico': topoLayer,
        'Esri World Imagery': Esri_WorldImagery,
        'Esri NatGeo World Map': Esri_NatGeoWorldMap
      }, {}, {
        position: 'topright'
      }).addTo(map);

     
     

    };

    onMounted(loadShapesFromIndexedDB);

    return { modalStore};
  }
};
</script>

<style scoped>
#map-container {
  position: relative;
}

#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}
</style>
