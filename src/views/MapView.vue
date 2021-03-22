<template>
  <div id="esri-map" ref="esriMap"></div>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import { loadModules } from 'esri-loader'


export default defineComponent({
  
  async setup() {
    /**
     * do we really want vue to make these reactive? Are they really going to change?
     * this will add extra overhead. If we need to handle reactive changes on esri stuff,
     * we can take advantage by using "esri/core/watchUtils" or by using the Accessor.watch()
     */
    // let layer = ref(null);
    // let view = ref(null);

    //same issues with reactive object as well
    ///let app = reactive({ zones: null, view:null });
    try {
      const [Map, MapView, FeatureLayer] = await loadModules(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"])
    
      // work with esri modules here
      // instead declare them as static data properties
      const map = new Map({
        basemap: "topo-vector",
      });

      const view = new MapView({
        container: "esri-map", // just pass this here to set required property
        map,
        zoom: 5,
        center: [-95, 39],
        popup: {
          autoOpenEnabled: false,
        },
      });

      const layer = new FeatureLayer({
        portalItem: {
          id: "9e2f2b544c954fda9cd13b7f3e6eebce",
        },
        outFields: ["*"],
        title: "Recent Earthquakes",
      });

      map.add(layer)

      return {
        view,
        map,
        layer
      }

    
    } catch (error) { 
      // handle any script or module loading errors
      console.error(error)
    }

    
  },

  created(){
    // verify we have access to view, layer
    console.log('view: ', this.view)
    console.log('map: ', this.map)
    
    /**
     * the map actually won't render from our setup() because the
     * "esri-map" div does not exist yet, so we must re-set it here 
     */
    nextTick(()=> {
      // I was having issues with race conditions here, had to set a small timeout
      setTimeout(()=> {
        this.view.container = this.$refs.esriMap
        console.log('view container: ', this.view.container)
      }, 150)
    })

    // here is where we can actually test things out
    this.view.whenLayerView(this.layer).then((layerView) => {
      console.log("layerview generated");
      console.log(layerView);
    });
  }
});
</script>

<style scoped>
#esri-map{
  height: calc(100vh);
  width: 100%;
}
</style>