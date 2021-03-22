import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css';
import { loadScript, loadCss } from 'esri-loader'

// preload some esri stuff
loadScript()
loadCss()

createApp(App).mount('#app')
