<template>
	<header>
		<img v-if="darkTheme" src="/logo.svg" alt="Logo" class="logo" />
		<img v-else src="/white-logo.svg" alt="Logo" class="logo" />
		<h1>Razion</h1>
		<div style="margin-left: auto; display: flex; gap: 17px">
			<Button class="headerBt" @click="e => { dropdown.toggleShowing(e.target.getBoundingClientRect(), 'right') }">
				<Icon class="more-vertical" :size="1.25" style="pointer-events: none;" />
			</Button>
		</div>
	</header>
	<DropDown :list="dropdownList" ref="dropdown" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import DropDown from '@/components/uiElements/DropDown.vue'

const darkTheme = ref(window.matchMedia("(prefers-color-scheme: dark)").matches)
const emit = defineEmits(['toggleTheme'])
watch(darkTheme, () => {
	emit('toggleTheme')
})

const prefersDark = ref(window.matchMedia("(prefers-color-scheme: dark)"))
prefersDark.value.addEventListener('change', e => {
	darkTheme.value = e.matches
})

const store = useStore()
const userProfile = computed(() => { return store.state.userProfile })
const router = useRouter()
const dropdown = ref()
const dropdownList = ref([
	{
		label: 'Tema',
		rightComponent: 'Switch',
		leftIcon: 'moon',
		rightIcon: 'sun',
		vModel: darkTheme,
		action: () => {
			darkTheme.value = !darkTheme.value
		}
	},
	{
		vIf: userProfile,
		label: 'Sair',
		rightComponent: 'Icon',
		class: 'logout',
		action: () => {
			store.dispatch('setUserProfile', null)
			router.replace({ name: 'Home' })
			document.body.click()
		}
	}
])

</script>

<style scoped>
header {
	background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg2-transparent));
	backdrop-filter: blur(5px);
	width: 100%;
	padding: 7px 17px;
	box-shadow: var(--dark-box-shadow);
	display: flex;
	align-items: center;
	gap: 17px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 2;
}

.logo {
	display: block;
	height: 48px;
	width: 48px;
	-webkit-user-drag: none;
}

.light-theme header {
	background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg2-transparent));
	box-shadow: var(--light-box-shadow);
}

.headerBt {
	border-radius: 50%;
	width: 37px;
	height: 37px;
	display: grid;
	place-items: center;
	padding: 0;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg2));
}

.light-theme .headerBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg2));
	color: var(--light-font2);
}
</style>