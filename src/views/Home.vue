<template>
	<section>
		<AuthBox />
	</section>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AuthBox from '@/components/viewElements/Home/AuthBox.vue'
const store = useStore()
const router = useRouter()

onMounted(() => {
	if (store.state.userProfile) {
		router.push({ name: 'Profile' })
	}
})


</script>

<style scoped>
section {
	width: 90%;
	margin: 70px auto 0;
	display: grid;
	place-items: center;
	padding: 0 17px;
	gap: 17px;
}
</style>