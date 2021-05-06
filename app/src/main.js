import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'



import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);
import theme from 'muse-ui/lib/theme';

theme.use('dark');

import {Howl, Howler} from 'howler';

import io from 'socket.io-client'

// import sort from 'fast-sort'
 
// new Vue({
//   sockets: {
//       connect: function () {
//           console.log('socket connected')
//       },
//       customEmit: function (data) {
//           console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
//       }
//   },
//   methods: {
//       clickButton: function (data) {
//           // $socket is socket.io-client instance
//           this.$socket.emit('emit_method', data)
//       }
//   }
// })


Vue.use({
	install (Vue) {
		Vue.prototype.Howl = Howl,
		Vue.prototype.Howler = Howler,
    Vue.prototype.io = io,
    Vue.prototype.socket = io("https://andrewjamesbaker.me:9090")
	}
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
