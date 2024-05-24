import React, { createContext, useState } from 'react'
import type { BookItem } from '../types'

type Props = {
  children: React.ReactNode
}

export type MyBooks = BookItem[] | []

type MyBooksProps = {
  myBooks: MyBooks
  addToMyBooks: (newBook: BookItem) => void
  removeFromMyBooks: (targetBook: BookItem) => void
}

const initialMyBooks: MyBooks = []

const defaultMyBooks: MyBooksProps = {
  myBooks: initialMyBooks,
  addToMyBooks: () => { },
  removeFromMyBooks: () => { },
}

export const MyBooksContext = createContext<MyBooksProps>(defaultMyBooks)

export function MyBooksProvider({ children }: Props) {
  const [myBooks, setMyBooks] = useState(initialMyBooks)

  function addToMyBooks(newBook: BookItem) {
    myBooks.some((book: BookItem) => book.id === newBook.id)
      ? alert('その本はすでにマイブックに存在します。')
      : setMyBooks([...myBooks, newBook])
  }
  function removeFromMyBooks(targetBook: BookItem) {
    myBooks.some((book: BookItem) => book.id === targetBook.id)
      ? setMyBooks(myBooks.filter((book: BookItem) => book.id !== targetBook.id))
      : alert('その本はマイブックに存在しません。')
  }

  return (
    <MyBooksContext.Provider value={{ myBooks, addToMyBooks, removeFromMyBooks }}>{children}</MyBooksContext.Provider>
  )
}