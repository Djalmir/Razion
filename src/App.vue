<template>
	<Header @toggleTheme="changeTheme" />
	<router-view />
	<Dialog ref="dialog" />
</template>

<script setup>
import { onMounted, ref, provide, computed, watch } from 'vue'
import Header from '@/components/uiElements/Header.vue'
import Dialog from '@/components/uiElements/Dialog.vue'

const dialog = ref()
provide('Dialog', dialog)

onMounted(() => {
	document.addEventListener('showMessage', showMessage)
	document.addEventListener('confirm', confirm)
	if (window.matchMedia("(prefers-color-scheme: light)").matches) {
		changeTheme()
	}
})

function showMessage(msg) {
	dialog.value.showMessage(msg.detail.error ?
		{ error: `<b style="white-space: wrap; display: block; color: #ff5757">${ msg.detail.error }</b>` } :
		msg.detail.success ?
			{ success: `<b style="white-space: wrap; display: block; color: #00921d">${ msg.detail.success }</b>` } :
			{ message: msg.detail })
}

function changeTheme() {
	if (Array.from(document.documentElement.classList).includes('light-theme')) {
		document.documentElement.classList.replace('light-theme', 'dark-theme')
		document.querySelector("[name=theme-color]").setAttribute("content", "#242424")
	}
	else {
		document.documentElement.classList.replace('dark-theme', 'light-theme')
		document.querySelector("[name=theme-color]").setAttribute("content", "#dddddd")
	}
}
</script>

<style scoped></style>
