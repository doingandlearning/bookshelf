<template>
	<div class="book-list">
		<BookCard v-for="book in books" :key="book.id" :book="book" @delete="$emit('delete', $event)"
			@edit="$emit('edit', $event)" @view="$emit('view', $event)" />
	</div>
</template>

<script lang="ts" setup>
import type { Book } from "../types/Book"
import BookCard from './BookCard.vue'

defineProps<{
	books: Book[]
}>();

defineEmits<{
	(e: 'delete', id: number): void
	(e: 'edit', book: Book): void
	(e: 'view', book: Book): void
}>();
</script>

<style scoped>
.book-list {
	list-style-type: none;
	padding: 0;
}
</style>
