import { useState, useEffect } from 'react' //reactのuseStateとuseEffect使うよ
import { Search } from './Search'
import { Timer } from './Timer'
import { BookItem } from './types/index' //この型データ使うよ
import './App.css' //CSSはここ読み込んでね

function App() {
  const [bookData, setBookData] = useState<BookItem[]>([]); //Goole Books APIsからデータを取得し、BookItemの型配列にならって保持するstate
  const [searchQuery, setSearchQuery] = useState<string>(''); //多分useRef使ったほうがいいはず…

  // API連携
  useEffect(() => {
    const fetchBooks = async () => { //非同期処理
      try {
        if (searchQuery.trim() === '') {
          return; // 検索クエリが空の場合は何もしない
        }

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}t&maxResults=10&key=AIzaSyCQT7Sg-xEq72wJgmK11kgu5GYF2n1HWpk`); //検索内容の特殊文字も上手いことやりつつ、MAX10冊分出してね
        if (!response.ok) { //HTTPステータスコードが失敗の場合、エラーメッセージで詳細教えてね（　∵　）
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items) {
          setBookData(data.items);
        }
      } catch (error) { //取得できなかった際にメッセージをコンソールに表示
        console.error('Error fetching data from Google Books API:', error);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  return (
    <>
      <header className="header">
        <h1 className='booklog-main-ttl'>Booklog</h1>
        <Timer />{/* タイマー追加 */}
      </header>
      <div className='wrapper'>
        <main className="main">
          <Search setSearchQuery={setSearchQuery} />{/* Searchコンポーネントを読み込む */}
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
