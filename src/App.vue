<template>
  <div id="container">
    <Suspense>
      <template #default>
        <!-- main async content goes here -->
        <map-view />
      </template>

      <template #fallback>
        <!-- fallback content goes here while component is loading -->
        <h3 class="loader">Loading...</h3>
      </template>

    </Suspense>
  </div>
</template>

<script>
import MapView from '@/views/MapView'
import { defineComponent } from 'vue'

export default defineComponent({

  components: {
    MapView
  }
  
});
</script>

<style scoped>

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

</style>