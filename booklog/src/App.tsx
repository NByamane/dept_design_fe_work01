import { useState } from 'react' //reactのuseState使うよ
import { Search } from './Search'
import { Timer } from './Timer'
import { BookItem } from './types/index' //この型データ使うよ
import './App.css' //CSSはここ読み込んでね

function App() {
  const [bookData, setBookData] = useState<BookItem[]>([]); //Goole Books APIsからデータを取得し、BookItemの型配列にならって保持するstate
  const [totalItems, setTotalItems] = useState<number>(0);

  return (
    <>
      <header className="header">
        <h1 className='booklog-main-ttl'>Booklog</h1>
        <Timer />{/* タイマー追加 */}
      </header>
      <div className='wrapper'>
        <main className="main">
          <Search setBookData={setBookData} setTotalItems={setTotalItems} />{/* Searchコンポーネントを読み込む */}
          {
            totalItems > 0 && (
              <p className="num-data">
                {totalItems}件の書籍が見つかりました。<br />
                そのうち{bookData.length}件を表示します。
              </p>
            )
          }
          <div className="books-box">
            {
              bookData.map((book) => {
                const { id, volumeInfo } = book;
                const { imageLinks, title, description, authors, publisher, previewLink } = volumeInfo;

                return (
                  <div key={id} className="books-detail">
                    {
                      imageLinks && (
                        <img src={imageLinks.thumbnail} className="books-img" alt={title} />
                      )
                    }
                    <div className="books-detail-contents">
                      <h2 className="book-ttl">{title}</h2>
                      {
                        description && (
                          <p className="book-description">
                            {description}
                          </p>
                        )
                      }
                      {
                        authors && (
                          <p className="book-authors-list">著者：
                            {
                              authors.map((author) => (
                                <span className="author" key={author}>{author}</span>
                              ))
                            }
                          </p>
                        )
                      }
                      {
                        publisher && (
                          <p className="book-publisher">出版社：{publisher}</p>
                        )
                      }
                      {
                        previewLink && (
                          <a href={previewLink} className="book-link">詳しく見る</a>
                        )
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </main>
      </div>
    </>
  )
}

export default App
