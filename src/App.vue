<template>
  <div id="container">
    <Suspense>
      <async-map />
    </Suspense>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import Loader from './components/Loader'

const AsyncMap = defineAsyncComponent({
  loader: ()=> import('@/views/MapView'),
  loadingComponent: Loader,
  // delay: 100,
  suspensible: false
})
export default defineComponent({

  components: {
    AsyncMap
  },

  mounted(){
    console.log('mounted app: ', this)
  }
  
  
});
</script>

<style scoped>
#esri-map{
  padding:0;
  margin:0;
  height:100%;
}
</style>