import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('../views/dashboard.vue')
	},
	{
		path: '/locations',
		name: 'locations',
		component: () => import('../views/locations.vue')
	},
	{
		path: '/inventory',
		name: 'inventory',
		component: () => import('../views/inventory.vue')
	},
	{
		path: '/scangun',
		name: 'scangun',
		component: () => import('../views/scangun.vue')
	},
	{
		path: '/demos',
		name: 'demos',
		component: () => import('../views/demos.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
