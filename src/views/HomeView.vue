<template>
  <div>
    <div class="header">
      <h1>BookShelf</h1>
      <div class="controls">
        <label class="switch">
          <input type="checkbox" v-model="isShelfView">
          <span class="slider"></span>
          <span class="switch-label">{{ isShelfView ? 'Shelf View' : 'List View' }}</span>
        </label>
        <button @click="openAddModal" class="add-button">Add Book</button>
      </div>
    </div>

    <BookList v-if="!isShelfView" :books="books" @delete="deleteBook($event)" @edit="openEditModal($event)"
      @view="viewBook($event)" />
    <BookShelf v-else :books="books" @delete="deleteBook($event)" @edit="openEditModal($event)"
      @view="viewBook($event)" />

    <Modal :show="showBookView" @close="closeBookView">
      <BookView v-if="selectedBook" :book="selectedBook" @save="updateBook" @cancel="closeBookView" />
    </Modal>

    <Modal :show="showForm" @close="closeForm">
      <BookForm :book="bookInitial" :edit="isEditing" @save="handleSave" @update="handleUpdate" @close="closeForm" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";

import BookList from "../components/BookList.vue";
import BookShelf from "../components/BookShelf.vue";
import BookForm from "../components/BookForm.vue";
import BookView from "../components/BookView.vue";
import Modal from "../components/Modal.vue";
import db from "../stores/db";
import type { Book } from "../types/Book";

const isShelfView = ref(false);
const emptyBook: Book = {
  title: "",
  author: "",
  dateFinished: new Date().toISOString().split('T')[0],
  coverUrl: "",
  genre: "",
  pages: 0
};

const showForm = ref(false);
const isEditing = ref(false);
const bookInitial = ref<Book>(emptyBook);
const showBookView = ref(false);
const selectedBook = ref<Book | null>(null);

const books = useObservable(
  liveQuery(() => db.books.toArray() as Book[], {
    initialValue: [],
  })
);

const openAddModal = () => {
  bookInitial.value = { ...emptyBook };
  isEditing.value = false;
  showForm.value = true;
};

const openEditModal = (book: Book) => {
  bookInitial.value = { ...book };
  isEditing.value = true;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  bookInitial.value = { ...emptyBook };
};

const handleSave = (book: Book) => {
  db.books.add(book);
  closeForm();
};

const handleUpdate = (book: Book) => {
  db.books.update(book.id, book);
  closeForm();
};

const deleteBook = (bookId: number) => {
  db.books.delete(bookId);
};

const viewBook = (book: Book) => {
  selectedBook.value = book;
  showBookView.value = true;
};

const closeBookView = () => {
  showBookView.value = false;
  selectedBook.value = null;
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 34px;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: .4s;
}

input:checked+.slider {
  background-color: #007bff;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

.switch-label {
  margin-left: 1rem;
  font-size: 1rem;
  color: #333;
}

.add-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>
