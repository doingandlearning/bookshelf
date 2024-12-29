<template>
	<form @submit.prevent="handleSubmit" class="book-form">
		<div class="form-group">
			<label for="title" class="sr-only">Title</label>
			<input id="title" v-model="formData.title" placeholder="Title" required class="input-field" />
		</div>

		<div class="form-group">
			<label for="author" class="sr-only">Author</label>
			<input id="author" v-model="formData.author" placeholder="Author" required class="input-field" />
		</div>

		<div class="form-group">
			<label for="dateFinished" class="sr-only">Date Finished</label>
			<input id="dateFinished" v-model="formData.dateFinished" type="date" required class="input-field" />
		</div>

		<div class="form-group">
			<label for="coverUrl" class="sr-only">Cover Image URL</label>
			<input id="coverUrl" v-model="formData.coverUrl" type="url" placeholder="Enter cover image URL">
		</div>

		<div class="form-group">
			<label for="genre" class="sr-only">Genre</label>
			<input id="genre" v-model="formData.genre" list="genre-list" placeholder="Select or enter a genre"
				class="input-field">
			<datalist id="genre-list">
				<option v-for="genre in genres" :key="genre" :value="genre">
					{{ genre }}
				</option>
			</datalist>
		</div>

		<div class="form-group">
			<label for="pages" class="sr-only">Number of Pages</label>
			<input id="pages" v-model.number="formData.pages" type="number" min="1" placeholder="Enter number of pages">
		</div>
		<div class="button-group">
			<button type="button" @click="$emit('close')" class="button button-secondary">Cancel</button>
			<button type="button" @click="fetchBookDetails" class="button button-secondary fetch-pages-button"
				:disabled="!formData.title || !formData.author">
				Auto-fill
			</button>
			<button type="submit" class="button" v-if="edit">Update</button>
			<button type="submit" class="button" v-else>Save</button>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import type { Book } from '../types/Book';

const emit = defineEmits(["save", "close", "update"]);
const props = defineProps(["book", "edit"]);

const genres = [
	'Fiction',
	'Non-Fiction',
	'Science Fiction',
	'Fantasy',
	'Mystery',
	'Biography',
	'History',
	// Add more genres as needed
];

const formData = ref<Book>({
	...props.book || {
		title: "",
		author: "",
		dateFinished: new Date().toISOString().split('T')[0],
		coverUrl: "",
		genre: "",
		pages: 0
	}
});

const handleSubmit = () => {
	if (props.edit) {
		emit("update", formData.value);
	} else {
		emit("save", formData.value);
		formData.value = {
			title: "",
			author: "",
			dateFinished: "",
			coverUrl: "",
			genre: "",
			pages: 0
		};
	}
};

const fetchBookDetails = async () => {
	try {
		const query = `${formData.value.title} ${formData.value.author}`;
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
		);
		const data = await response.json();

		if (data.items && data.items[0]?.volumeInfo) {
			const bookInfo = data.items[0].volumeInfo;

			// Update page count if available
			if (bookInfo.pageCount) {
				formData.value.pages = bookInfo.pageCount;
			}

			// Update cover URL if available
			if (bookInfo.imageLinks?.thumbnail) {
				const coverUrl = bookInfo.imageLinks.thumbnail
					.replace('http:', 'https:')
					.replace('zoom=1', 'zoom=2');
				formData.value.coverUrl = coverUrl;
			}

			// Attempt to determine genre from categories
			if (bookInfo.categories && bookInfo.categories.length > 0) {
				const category = bookInfo.categories[0];
				const matchedGenre = genres.find(genre =>
					category.toLowerCase().includes(genre.toLowerCase())
				);
				if (matchedGenre) {
					formData.value.genre = matchedGenre;
				}
			}
		} else {
			alert('No book information found');
		}
	} catch (error) {
		console.error('Error fetching book data:', error);
		alert('Error fetching book information');
	}
};
</script>

<style scoped>
.book-form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	max-width: 400px;
	margin: auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: #f9f9f9;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.form-group label {
	font-size: 14px;
	font-weight: 500;
	color: #333;
}

.form-group input,
.form-group select {
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
}

.input-field {
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
}

.button-group {
	display: flex;
	justify-content: space-between;
}

.button {
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	background-color: #007bff;
	color: white;
	font-size: 16px;
	cursor: pointer;
}

.button:hover {
	background-color: #0056b3;
}

.button-secondary {
	background-color: #ccc;
	color: black;
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

.pages-input-group {
	display: flex;
	gap: 8px;
}

.fetch-pages-button {
	white-space: nowrap;
	padding: 10px;
}

.fetch-pages-button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
</style>
