import { createContext, useContext, useCallback } from 'react'
import { BookItem } from '../types/index' //型データ

// 子コンポーネントでも使用する変数の型定義
type BookListContextType = {
  bookData: BookItem[];
  myBookListData: BookItem[];
  setMyBookListData: React.Dispatch<React.SetStateAction<BookItem[]>>;
};

// Contextの初期値定義
const initialBookListContext: BookListContextType = {
  bookData: [],
  myBookListData: [],
  setMyBookListData: () => { }
};

// createContextを使用して初期値代入
export const bookListContext = createContext<BookListContextType>(initialBookListContext);

// データの値が取得できてるかを確認
export const useBookListContext = () => {
  const context = useContext(bookListContext);
  if (!context) {
    throw new Error('取得できてないっぽい（∵）');
  }
  return context;
};

// 追加・削除ボタン機能作るよ
export const useBookListFunctions = () => {
  return {
    handleAddToMyBooks: useCallback((book: BookItem, setMyBookListData: React.Dispatch<React.SetStateAction<BookItem[]>>) =>
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setMyBookListData && setMyBookListData((prevData) => [...prevData, book]);
      }, []
    ),
    handleDeleteFromMyBooks: useCallback((book: BookItem, setMyBookListData: React.Dispatch<React.SetStateAction<BookItem[]>>) =>
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setMyBookListData && setMyBookListData((prevData) => prevData.filter((b) => b.id !== book.id));
      }, []
    )
  };
};