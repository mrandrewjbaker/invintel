import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {},
		leftNavBarOpen: false,
		leftNavBarVisible: true,
		darkmode: true,
	},
	mutations: {
		setUser(state, payload){
			state.user = payload
		},
		setLeftNavBarOpen(state, payload){
			state.leftNavBarOpen = payload
		},
		setLeftNavBarVisible(state, payload){
			state.leftNavBarVisible = payload
		},
		setDarkmode(state, payload){
			state.darkmode = payload
		}

	},
	actions: {
		setUser(context, payload){
			context.commit('setUser', payload)
		},
		setLeftNavBarOpen(context, payload){
			context.commit('setLeftNavBarOpen', payload)
		},
		setLeftNavBarVisible(context, payload){
			context.commit('setLeftNavBarVisible', payload)
		},
		setDarkmode(context, payload){
			context.commit('setDarkmode', payload)
		}
	},
	getters: {
		leftNavBarOpen(state){
			return state.leftNavBarOpen
		},
		leftNavBarVisible(state){
			return state.leftNavBarVisible
		},
		user(state){
			return state.user
		},
		darkmode(state){
			return state.darkmode
		}
	}
})
