import { useState } from 'react'
import { Search } from './Search'
import { Timer } from './Timer'
import { BookList } from './BookList'
import { MyBookList } from './MyBookList'
import { BookItem } from './types/index' //型データ
import './App.css'

function App() {
  const [bookData, setBookData] = useState<BookItem[]>([]); //Goole Books APIsからデータを取得し、BookItemの型配列にならって保持するstate
  const [totalItems, setTotalItems] = useState<number>(0);

  return (
    <>
      <header className="header">
        <h1 className='booklog-main-ttl'>Booklog</h1>
        <Timer />
      </header>
      <div className='wrapper'>
        <aside className='aside'>
          <MyBookList />
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
          <BookList bookData={bookData} />
        </main>
      </div>
    </>
  )
}

export default App
