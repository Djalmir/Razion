<template>
	<form action="javascript:void(0)" @submit="signup">
		<div>
			<h2>Cadastro</h2>
			<Input class="input" type="text" label="Nome" v-model="name" required />
			<Input class="input" type="email" label="Email" v-model="email" required />
			<Input class="input" type="password" label="Senha" v-model="password" required />
			<Input class="input" type="password" label="Confirme a Senha" v-model="confirmPassword" required />
			<Button class="submitBt" type="submit">Criar Conta</Button>
			<span class="link">
				<b>Já tem uma conta?</b><br />
				<a href="#" @click="$emit('goToLogin')">
					Fazer Login
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
import { dispatchEvent } from '@/utils/events.js'

const store = useStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function signup() {
	if (password.value != confirmPassword.value)
		return dispatchEvent('showMessage', { error: 'As senhas não correspondem' })
	api.signup({
		name: name.value,
		email: email.value,
		password: password.value
	})
		.then((res) => {
			let userProfile = res.data
			store.dispatch('setUserProfile', userProfile)
			router.push({ name: 'Profile' })
			dispatchEvent('showMessage', { success: 'Conta criada com sucesso!' })
		})
}
</script>

<style scoped>
form {
	display: grid;
	place-items: center;
}

div{
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
	height: 39px;
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