import { useState, useEffect } from 'react' //reactのuseStateとuseRef使うよ
import { Search } from './Search'
import { Timer } from './Timer'
import { BookItem } from './types/index' //この型データ使うよ
import './App.css' //CSSはここ読み込んでね

function App() {
  const [bookData, setBookData] = useState<BookItem[]>([]); //Goole Books APIsからデータを取得し、BookItemの型配列にならって保持するstate
  const [searchQuery, setSearchQuery] = useState<string>(''); // 検索クエリを保持するstate ※検索周りのuseStateは危険なので要改修検討

  // API連携
  useEffect(() => {
    const fetchBooks = async () => { //非同期処理
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=10`); //検索内容の特殊文字も上手いことやりつつ、MAX10冊分出してね
        if (!response.ok) { //HTTPステータスコードが失敗の場合、エラーメッセージで詳細教えてね（　∵　）
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        console.log(encodeURIComponent(searchQuery));
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

  // 検索クエリに基づいて本をフィルタリング
  const filteredBooks = bookData.filter((book) => {
    const { volumeInfo } = book;
    const { title, description, authors, publisher } = volumeInfo;

    // タイトル、説明、著者、出版社で大文字小文字を区別せずに検索
    const searchString = `${title} ${description} ${authors?.join(' ')} ${publisher}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

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
              filteredBooks.map((book) => {
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
