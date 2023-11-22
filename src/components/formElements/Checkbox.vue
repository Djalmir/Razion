<template>
	<input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" :class="`${props.class ? props.class : ''} ${props.pin ? 'pin' : ''}`" v-bind="$attrs" />
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	rounded: {
		type: Boolean,
		default: false
	},
	class: {
		type: String,
	},
	pin: {
		type: Boolean,
		default: false
	}
})
const borderRadius = computed(() => {
	if (props.rounded || props.pin)
		return '50%'
	return '0.15em'
})
</script>

<style scoped>
input {
	appearance: none;
	background: var(--bg-2);
	margin: 0;
	font: inherit;
	width: 1.15em;
	min-width: 1.15em;
	height: 1.15em;
	min-height: 1.15em;
	border: 0.1em solid var(--color-3);
	border-radius: v-bind(borderRadius);
	transform: translateY(-0.075em);
	display: grid;
	place-content: center;
	transition: .2s;
	cursor: pointer;
}

input:hover,
input:focus {
	box-shadow: 1px 2px 5px var(--shadow-2);
	border: .1em solid var(--primary);
}

input:active {
	box-shadow: 1px 2px 5px -2px var(--shadow-2);
}

input:checked {
	background: var(--primary);
	border: .1em solid var(--primary);
}

input::before {
	content: "";
	width: .85em;
	height: .85em;
	transform: scale(0);
	transition: 120ms transform ease-in-out;
	box-shadow: inset 1em 1em var(--bg-2);
	clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input.pin:checked {
	background: radial-gradient(var(--primary) 33%, var(--bg-2)33%);
}

input.pin::before {
	clip-path: none;
	box-shadow: none;
	width: .5em;
	height: .5em;
}

input:checked::before {
	transform: scale(.8);
}
</style>