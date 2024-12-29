<template>
	<div class="book-list">
		<div v-for="book in books" :key="book.id" class="book-card">
			<img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.title" class="book-cover">
			<div class="book-info">
				<h3>{{ book.title }}</h3>
				<p>Author: {{ book.author }}</p>
				<p>Genre: {{ book.genre || 'Not specified' }}</p>
				<p>Pages: {{ book.pages || 'Unknown' }}</p>
				<p>Date Finished: {{ book.dateFinished }}</p>
			</div>
			<button @click="editBook(book)">Edit</button>
			<button @click="deleteBook(book.id)">Delete</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Book } from "../types/Book"

defineProps(["books"]);
const emit = defineEmits(["edit", "delete"]);

function editBook(book: Book) {
	emit("edit", book);
}

function deleteBook(bookId: number) {
	emit("delete", bookId);
}
</script>

<style scoped>
.book-list {
	list-style-type: none;
	padding: 0;
}

.book-card {
	display: flex;
	gap: 1rem;
	padding: 1rem;
	border: 1px solid #ddd;
	margin-bottom: 1rem;
}

.book-cover {
	width: 100px;
	height: 150px;
	object-fit: cover;
}

.book-info {
	flex: 1;
}
</style>
