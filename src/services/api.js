import axios from 'axios'
import router from '@/router/router.js'
import { store } from '@/store/store.js'
import { dispatchEvent } from '@/utils/events.js'

export const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		common: {
			'X-Requested-With': 'XMLHttpRequest'
		}
	}
})

api.interceptors.request.use((config) => {
	dispatchEvent('setLoading', true)
	return config
}, (err) => {
	dispatchEvent('setLoading', false)
	let error = err.response?.data.error
	if (error) {
		dispatchEvent('showMessage', { error: error })
	}
	else
		dispatchEvent('showMessage', { error: 'Erro inesperado' })
	return Promise.reject(err)
})

api.interceptors.response.use((res) => {
	if (store.state.loaderLock != 'on')
		dispatchEvent('setLoading', false)
	return res
}, (err) => {
	dispatchEvent('setLoading', false)
	let error = err.response?.data.error
	if (error) {
		if (error == 'Token inválido.') {
			dispatchEvent('showMessage', { error: 'Sua sessão expirou. Por favor, faça o login novamente.' })
			store.dispatch('setUserProfile', null)
			router.push({ name: 'Home' })
		}
		else
			dispatchEvent('showMessage', { error: error })
	}
	else
		dispatchEvent('showMessage', { error: 'Erro inesperado' })
	return Promise.reject(err)
})

const configs = () => {
	return {
		headers: {
			Authorization: `${ store.state.userProfile.token }`
		}
	}
}

export default {
	signup({ name, email, password }) {
		return api.post('/auth/signup', { name, email, password })
	},
	login({ email, password }) {
		return api.post('/auth/login', { email, password })
	},
	getProfile() {
		return api.get('/auth/profile', configs())
	},
	updateProfile(body) {
		return api.put('/auth/updateProfile', body, { headers: { ...configs().headers, 'Content-Type': 'multipart/form-data' } })
	},
	deleteAccount({ password }) {
		return api.delete(`/auth/deleteAccount/${ password }`, configs())
	}
}