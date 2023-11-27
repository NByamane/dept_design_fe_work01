import { useState } from 'react' //reactのuseState使うよ
import { MOCK_DATA } from './mockdata' //このモックデータ使うよ
import { BookItem } from './types/index' //この型データ使うよ
import './App.css' //CSSはここ読み込んでね

function App() {
  const [bookData, setBookData] = useState<BookItem[]>(MOCK_DATA.items); //MOCK_DATAのitemsからランダムにデータを取得し、BookItemの型配列にならって保持するstate。

  return (
    <>
      <header className="header">
        <h1>Booklog</h1>
      </header>
      <main className="main">
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
                            authors.map((author, index) => (
                              <span className="author" key={index}>{author}</span>
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
    </>
  )
}

export default App
