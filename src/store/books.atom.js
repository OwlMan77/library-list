// a books atom

import { atom, selector } from 'recoil';

export const bookAtom = atom({
  key: 'books',
  default: { books: [], count: 0 }
});

export const numberOfPages = selector({
    key: 'booksNumberOfPages',
    get: ({ get }) => {
        const books = get(bookAtom);
        return Math.ceil((books.count) / 20);
    }
});

export const books = selector({
    key: 'booksList',
    get: ({ get }) => {
        const books = get(bookAtom);
        return books.books;
    }
});