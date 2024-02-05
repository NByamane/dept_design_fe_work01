import { useState, createContext } from 'react'
import { Search } from './Search'
import { Timer } from './Timer'
import { BookList } from './BookList'
import { BookItem } from './types/index' //型データ
import './App.css'

// 子コンポーネントでも使用する変数たち
export const bookListContext = createContext<{
  bookData: BookItem[];
  myBookListData: BookItem[];
  setMyBookListData: React.Dispatch<React.SetStateAction<BookItem[]>>;
} | undefined>(undefined); // 初期値undefined指定でエラー回避

function App() {
  const [bookData, setBookData] = useState<BookItem[]>([]);
  const [myBookListData, setMyBookListData] = useState<BookItem[]>([]); // 追加・削除ボタンを押したタイミングで格納・削除されるデータ
  const [totalItems, setTotalItems] = useState<number>(0);

  return (
    <>
      <bookListContext.Provider value={{ bookData, myBookListData, setMyBookListData }}>
        <header className="header">
          <h1 className='booklog-main-ttl'>Booklog</h1>
          <Timer />
        </header>
        <div className='wrapper'>
          <aside className='aside'>
            <BookList isMyBookList={true} />
          </aside>
          <main className="main">
            <Search setBookData={setBookData} setTotalItems={setTotalItems} />
            {
              totalItems > 0 && (
                <p className="num-data">
                  {totalItems}件の書籍が見つかりました。<br />
                  そのうち{bookData.length}件を表示します。
                </p>
              )
            }
            <BookList isMyBookList={false} />
          </main>
        </div>
      </bookListContext.Provider>
    </>
  )
}

export default App
