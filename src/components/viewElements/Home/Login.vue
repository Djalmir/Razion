<template>
	<form action="javascript:void(0)" @submit="login">
		<div>
			<h2>Login</h2>
			<Input class="input" type="email" label="Email" v-model="email" required />
			<Input class="input" type="password" label="Senha" v-model="password" required />
			<Button class="submitBt" type="submit">Entrar</Button>
			<span class="link">
				<b>Ainda não tem uma conta Razion?</b><br />
				<a href="#" @click="$emit('goToSignup')">
					Cadastre-se gratuitamente
				</a>
			</span>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import api from '@/services/api.js'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')

function login() {
	api.login({
		email: email.value,
		password: password.value
	})
		.then((res) => {
			let userProfile = res.data
			store.dispatch('setUserProfile', userProfile)
			router.push({ name: 'Profile' })
		})
}
</script>

<style scoped>
form {
	display: grid;
	place-items: center;
}

div {
	width: 100%;
}

h2 {
	text-align: center;
}

.input {
	width: 100%;
}

.submitBt {
	width: 100%;
	margin-top: 7px;
	height: 37px;
	font-weight: bold;
}

.link {
	display: block;
	margin-top: 7px;
	text-align: center;
	font-size: .8rem;
}

.link a {
	color: var(--primary-light);
}

.link a:hover {
	filter: brightness(1.2);
}

.link a:active {
	filter: brightness(0.8);
}
</style>