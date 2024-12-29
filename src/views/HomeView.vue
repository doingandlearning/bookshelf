<template>
  <div>
    <h1>BookVault</h1>
    <button @click="openForm">Add Book</button>
    <BookForm v-if="showForm" @close="showForm = false" @save="addBook" @update="updateBook" :book="bookInitial"
      :edit="edit" />
    <BookList :books="books" @delete="deleteBook($event)" @edit="editBook($event)" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";

import BookList from "../components/BookList.vue";
import BookForm from "../components/BookForm.vue";
import db from "../stores/db";
import type { Book } from "../types/Book";

const emptyBook: Book = {
  title: "",
  author: "",
  dateFinished: new Date().toISOString().split('T')[0],
  coverUrl: "",
  genre: "",
  pages: 0
};
const showForm = ref(false);
const edit = ref(false);
const bookInitial = ref<Book>(emptyBook);

const books = useObservable(
  liveQuery(() => db.books.toArray() as Book[], {
    initialValue: [],
  })
);

const openForm = () => {
  showForm.value = true;
  edit.value = false;
  bookInitial.value = emptyBook;
};
const addBook = (book: Book) => {
  db.books.add(book);
};

const deleteBook = (bookId: number) => {
  db.books.delete(bookId);
};

const editBook = (book: Book) => {
  showForm.value = false;
  bookInitial.value = book;
  showForm.value = true;
  edit.value = true;
};

const updateBook = (book: Book) => {
  db.books.update(book.id, book);
};
</script>
