import { useState } from 'react'
import { Search } from './Search'
import { Timer } from './Timer'
import { BookList } from './BookList'
import { MyBooks } from './MyBooks'
import { BookItem } from '../types/index'
import { MyBooksProvider } from '../contexts/BookListContext';
import '../css/App.css'

function App() {
  const [bookData, setBookData] = useState<BookItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  return (
    <>
      <MyBooksProvider>
        <header className="header">
          <h1 className='booklog-main-ttl'>Booklog</h1>
          <Timer />
        </header>
        <div className='wrapper'>
          <aside className='aside'>
            <MyBooks />
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
      </MyBooksProvider>
    </>
  )
}

export default App
