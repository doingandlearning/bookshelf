<template>
	<div class="bookshelf">
		<div class="shelf">
			<div v-for="book in books" :key="book.id" class="book" @click="viewBook(book)">
				<img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.title" class="book-cover">
				<div v-else class="book-spine">
					<span class="book-title">{{ book.title }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Book } from "../types/Book"

defineProps<{
	books: Book[]
}>();

const emit = defineEmits<{
	(e: 'view', book: Book): void
}>();

function viewBook(book: Book) {
	emit('view', book);
}
</script>

<style scoped>
.bookshelf {
	padding: 20px;
}

.shelf {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	padding: 20px;
	background: #8b4513;
	border-bottom: 15px solid #5c2c0c;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.book {
	cursor: pointer;
	transition: transform 0.2s;
}

.book:hover {
	transform: translateY(-10px);
}

.book-cover {
	width: 120px;
	height: 180px;
	object-fit: cover;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.book-spine {
	width: 30px;
	height: 180px;
	background: #444;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.book-title {
	writing-mode: vertical-rl;
	text-orientation: mixed;
	color: white;
	font-size: 0.8em;
	padding: 5px;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>