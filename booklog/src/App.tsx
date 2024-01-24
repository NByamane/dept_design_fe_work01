import { useState } from 'react'
import { Search } from './Search'
import { Timer } from './Timer'
import { BookList } from './BookList'
import { BookItem } from './types/index' //型データ
import { MOCK_DATA } from './mockdata'
import './App.css'

function App() {
  const [bookData01, setBookData] = useState<BookItem[]>([]); //Goole Books APIsからデータを取得し、BookItemの型配列にならって保持するstate
  const [bookData02] = useState<BookItem[]>(MOCK_DATA.items); //MyBookList用のmockdataを保持
  const [totalItems, setTotalItems] = useState<number>(0);

  return (
    <>
      <header className="header">
        <h1 className='booklog-main-ttl'>Booklog</h1>
        <Timer />
      </header>
      <div className='wrapper'>
        <aside className='aside'>
          <BookList bookData={bookData02} />
        </aside>
        <main className="main">
          <Search setBookData={setBookData} setTotalItems={setTotalItems} />
          {
            totalItems > 0 && (
              <p className="num-data">
                {totalItems}件の書籍が見つかりました。<br />
                そのうち{bookData01.length}件を表示します。
              </p>
            )
          }
          <BookList bookData={bookData01} />
        </main>
      </div>
    </>
  )
}

export default App
