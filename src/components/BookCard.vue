<template>
	<div class="book-card" @click="$emit('view', book)">
		<img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.title" class="book-cover">
		<div class="book-info">
			<h3>{{ book.title }}</h3>
			<p>Author: {{ book.author }}</p>
			<p>Genre: {{ book.genre || 'Not specified' }}</p>
			<p>Pages: {{ book.pages || 'Unknown' }}</p>
			<p>Date Finished: {{ book.dateFinished }}</p>
		</div>
		<div class="actions" @click.stop>
			<button @click="$emit('edit', book)">Edit</button>
			<button @click="$emit('delete', book.id)">Delete</button>
			<button @click="shareToBluesky(book)">Share to Bluesky</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Book } from "../types/Book"

defineProps<{
	book: Book
}>();

defineEmits<{
	(e: 'delete', id: number): void
	(e: 'edit', book: Book): void
	(e: 'view', book: Book): void
}>();

const shareToBluesky = (book) => {
	const text = `📚💙 ${book.title} by ${book.author}\n\n`;
	const url = `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;
	window.open(url, '_blank');
};
</script>

<style scoped>
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