<template>
	<div>
		<img :src="props.src" :alt="alt">
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	src: {
		type: String,
		required: true
	},
	alt: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		default: 1
	}
})

const size = computed(() => {
	return props.size + 'em'
})

const src = computed(() => {
	return `url('${ props.src }')`
})

</script>

<style scoped>
div {
	width: v-bind(size);
	height: v-bind(size);
	/* background-image: v-bind(src);
	background-position: center;
	background-size: cover; */
}

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>