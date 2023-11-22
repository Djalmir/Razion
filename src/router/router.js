import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store/store.js'
import Home from '@/views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('@/views/Profile.vue'),
		authRequired: true
	},

	{
		path: '/:pathMatch(.*)',
		component: Home
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

function isAuthenticated() {
	return store.state.userProfile
}

router.beforeEach((to, from, next) => {
	to.authRequired = routes.find((route) => route.name == to.name).authRequired
	if (to.authRequired && !isAuthenticated()) next({ name: 'Home' })
	else next()
})

export default router