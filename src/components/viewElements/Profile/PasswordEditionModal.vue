<template>
	<Modal ref="modal" @close="close">

		<b>Alterar senha</b>

		<Input class="input" label="Senha atual" type="password" v-model="currentPassword" @keypress.enter="updatePassword" />
		<Input class="input" label="Nova senha" type="password" v-model="newPassword" @keypress.enter="updatePassword" />
		<Input class="input" label="Confirmar nova senha" type="password" v-model="confirmNewPassword" @keypress.enter="updatePassword" />

		<footer>
			<Button class="secondary" @click="close">Cancelar</Button>
			<Button type="submit" @click="updatePassword">Confirmar</Button>
		</footer>

	</Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/uiElements/Modal.vue'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import { dispatchEvent } from '@/utils/events.js'
import api from '@/services/api.js'

const modal = ref()

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

function show() {
	modal.value.show()
}

function updatePassword() {
	if (!currentPassword.value || !newPassword.value || !confirmNewPassword.value)
		return dispatchEvent('showMessage', { error: 'Preencha todos os campos' })
	if (newPassword.value != confirmNewPassword.value)
		return dispatchEvent('showMessage', { error: 'As senhas não correspondem' })
	api.updateProfile({
		password: currentPassword.value,
		newPassword: newPassword.value
	})
		.then(() => {
			dispatchEvent('showMessage', { success: 'Senha alterada com sucesso!' })
			close()
		})
}

function close() {
	currentPassword.value = ''
	newPassword.value = ''
	confirmNewPassword.value = ''

	modal.value.close()
}

defineExpose({
	show
})

</script>

<style scoped>
form {
	background: transparent;
	box-shadow: none;
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}

b {
	font-size: 1.2rem;
	font-weight: bold;
	display: block;
	margin-bottom: 17px;
}

.input {
	width: 100%;
}

footer {
	display: flex;
	gap: 17px;
	flex-wrap: wrap;
	margin-top: 33px;
}

footer>* {
	flex: 1;
}
</style>