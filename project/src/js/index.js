
window.Vue = require('vue');

window.axios = require('axios');

/*****************************************************************************************************/



/***********************
**
* *
*  Import all dependencies
* *
**
***********************/


/*****
/
/ import scss
/
**/
import css from '../scss/main.scss';

/*****
/
/ import jquery
/
**/
import $ from 'jquery';

/*****
/
/ import and use VueRouter
/
**/
import VueRouter from 'vue-router';
import {routes} from './routes';
Vue.use( VueRouter );

/*****
/
/ import and use Vuex
/
**/
import Vuex from 'vuex';
Vue.use( Vuex );
import StoreData from './plugins/store';

/*****
/
/ import MainComponent
/
**/
import MainComponent from '../vue/main.component.vue';

/*****
/
/ import and use my BinancePlugin
/
**/
import Binance from './plugins/binance.js';
Vue.use( Binance );

/*****************************************************************************************************/



/***********************
**
* *
*  Creating new Vuex store
* *
**
***********************/

const store = new Vuex.Store(StoreData);

/*****************************************************************************************************/



/***********************
**
* *
*  Creating new Router instance
* *
**
***********************/

const router = new VueRouter({

	routes,

	mode: 'history',

});

/*****************************************************************************************************/



/***********************
**
* *
*  Creating new Vue instance
* *
**
***********************/

const vm = new Vue({
  
	el: '#app',

	router,

	store,

	components: {

		MainComponent,

	},

});

/*****************************************************************************************************/