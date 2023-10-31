import { useState } from 'react' //reactのuseState使うよ
import { MOCK_DATA } from './mockdata' //このモックデータ使うよ
import { BookItem } from './types/index' //この型データ使うよ
import './App.css' //CSSはここ読み込んでね

function App() {
  const [bookData, setBookData] = useState<BookItem[]>(MOCK_DATA.items); //MOCK_DATAのitemsからランダムにデータを取得し、BookItemの型配列にならって保持するstate。ただここでsetBookDataは使うことがないので削除可？
  const randomBookIndex = Math.floor(Math.random() * bookData.length); //任意の1冊をランダムに選んで
  const randomBook = bookData[randomBookIndex]; //randomBook変数に格納する

  return (
    <>
      <main>
        {
          randomBook && (
            <div className="books-detail">
              <img src={randomBook.volumeInfo.imageLinks.thumbnail} className="books-img" alt={randomBook.volumeInfo.title} width="128" height="169" />
              <div className="books-detail-contents">
                <h2 className="book-ttl">{randomBook.volumeInfo.title}</h2>
                <p className="book-description">
                  {randomBook.volumeInfo.description}
                </p>
                <p className="book-author">著者：{randomBook.volumeInfo.authors}</p>
                <p className="book-publisher">出版社：{randomBook.volumeInfo.publisher}</p>
                <a href={randomBook.volumeInfo.previewLink} className="book-link">詳しく見る</a>
              </div>
            </div>
          )
        }
      </main>
    </>
  )
}

export default App
