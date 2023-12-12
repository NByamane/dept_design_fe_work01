import { useState } from 'react' //reactのuseStateとuseRef使うよ
import { Search } from './Search'
import { MOCK_DATA } from './mockdata' //このモックデータ使うよ
import { BookItem } from './types/index' //この型データ使うよ
import './App.css' //CSSはここ読み込んでね

function App() {
  //MOCK_DATAのitemsからランダムにデータを取得し、BookItemの型配列にならって保持するstate。
  const [bookData] = useState<BookItem[]>(MOCK_DATA.items);

  return (
    <>
      <header className="header">
        <h1 className='booklog-main-ttl'>Booklog</h1>
      </header>
      <div className='wrapper'>
        <main className="main">
          <Search />{/* Searchコンポーネントを読み込む */}
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
