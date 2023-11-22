<template>
	<div id="modalWrapper">
		<transition name="fade">
			<div id="modalShadow" v-if="showing" @click="$emit('close')"></div>
		</transition>
		<transition name="grow">
			<div id="modal" v-if="showing" @keydown.escape="$emit('close')" tabindex="0">
				<Button id="closeModalBt" class="secondary" @click="$emit('close')">
					<Icon class="x" :size="1.5" />
				</Button>
				<section>
					<slot></slot>
				</section>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const showing = ref(false)

function show() {
	showing.value = true
	setTimeout(() => {
		let input = document.querySelector('#modal section input')
		if (input) {
			input.focus()
		}
		else
			document.querySelector('#modal').focus()
	}, 200)
}

function close() {
	showing.value = false
}

defineExpose({
	show,
	close
})

</script>

<style scoped>
#modalWrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	z-index: 3;
	pointer-events: none;
}

#modalShadow {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--dark-bg1-transparent);
	backdrop-filter: blur(2px);
	pointer-events: all;
}

.light-theme #modalShadow {
	background: var(--light-bg1-transparent);
}

#modal {
	position: relative;
	width: 77%;
	max-width: 500px;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
	border-radius: .3rem;
	pointer-events: all;
}

.light-theme #modal {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

#modal section {
	padding: 17px;
	width: 100%;
	max-height: 90vh;
	overflow: auto;
}

#closeModalBt {
	position: absolute;
	top: 0;
	right: 0;
	padding: 2px;
	transform: translate(17%, -17%);
	display: grid;
	place-items: center;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	color: var(--danger-light);
}

.light-theme #closeModalBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
}
</style>