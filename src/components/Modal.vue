<template>
	<div v-if="show" class="modal-backdrop" @click="$emit('close')">
		<div class="modal-content" @click.stop>
			<button class="modal-close" @click="$emit('close')">&times;</button>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	show: boolean
}>();
</script>

<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
}

.modal-content {
	background-color: white;
	padding: 2rem;
	border-radius: 8px;
	position: relative;
	max-width: 90%;
	max-height: 90vh;
	overflow-y: auto;
}

.modal-close {
	position: absolute;
	top: 1rem;
	right: 1rem;
	border: none;
	background: none;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 0.5rem;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal-close:hover {
	background-color: #f0f0f0;
}
</style>