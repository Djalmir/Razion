<template>
	<div id="authCube">
		<transition name="leftRoll">
			<Login v-if="hasAccount" @goToSignup="hasAccount = false" />
		</transition>
		<transition name="rightRoll">
			<Signup v-if="!hasAccount" @goToLogin="hasAccount = true" />
		</transition>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/components/viewElements/Home/Login.vue'
import Signup from '@/components/viewElements/Home/Signup.vue'

const hasAccount = ref(true)
</script>

<style scoped>
#authCube {
	width: 100%;
	perspective: 1000px;
	display: flex;
	gap: 0;
	justify-content: center;
	align-items: flex-start;
}

.leftRoll-enter-active,
.leftRoll-leave-active,
.rightRoll-enter-active,
.rightRoll-leave-active {
	transition: .5s ease-in-out;
	backface-visibility: hidden;
	position: absolute;
	transform-origin: center;
}

.leftRoll-enter-from,
.leftRoll-leave-to {
	transform: scale(0) translate(-100%, 0%) rotateY(-90deg);
}

.rightRoll-enter-from,
.rightRoll-leave-to {
	transform: scale(0) translate(100%, 0%) rotateY(90deg);
}
</style>