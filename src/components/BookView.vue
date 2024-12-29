<template>
	<div class="book-view">
		<div class="book-header">
			<img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.title" class="book-cover">
			<h2 class="book-title">{{ book.title }}</h2>
		</div>
		<BookForm :book="book" :edit="true" @save="saveChanges" @close="cancel" @update="saveChanges" />
	</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { Book } from "../types/Book";
import BookForm from './BookForm.vue';

const props = defineProps<{
	book: Book
}>();

const emit = defineEmits<{
	(e: 'save', book: Book): void
	(e: 'cancel'): void
}>();

function saveChanges(updatedBook: Book) {
	emit('save', updatedBook);
}

function cancel() {
	emit('cancel');
}
</script>

<style scoped>
.book-view {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

.book-header {
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-bottom: 2rem;
}

.book-cover {
	width: 200px;
	height: 300px;
	object-fit: cover;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.book-title {
	font-size: 2rem;
	margin: 0;
	color: #333;
}
</style>