import React, { useState, useRef } from 'react' //reactのuseStateとuseRef使うよ
import { MOCK_DATA } from './mockdata' //このモックデータ使うよ
import { BookItem } from './types/index' //この型データ使うよ
import './App.css' //CSSはここ読み込んでね

function App() {
  //MOCK_DATAのitemsからランダムにデータを取得し、BookItemの型配列にならって保持するstate。
  const [bookData] = useState<BookItem[]>(MOCK_DATA.items);

  //SearchComponentを切り出す
  const SearchComponent = () => {
    const searchRef = useRef<HTMLInputElement>(null); //初期値としてnullを渡す。HTMLInputElementで参照する要素はinputだよ〜といってる。ジェネリクス型というらしい。。。
    const [searchValue, setSearchValue] = useState(''); //初期値は空で、ボタンを押した時にsetSearchValueを介して新しい値を設定

    const pushSearch = (event: React.FormEvent) => { //React.FormEventはformの発火イベントに関する型？らしい
      event.preventDefault(); //ページが更新されるのを一旦ストップ
      //注：検索機能については次回stepで記載

      alert(`${searchValue}で検索しました`); //とりあえずアラート出します（　∵　）
    }

    return (
      <div className="search-box">
        <form onSubmit={pushSearch} action="" className='search-form'>
          <input type="text" name='search-contents' id='search-contents' className='search-contents' placeholder='キーワードを入力して書籍を検索' ref={searchRef} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button type="submit" className='search-submit'>search</button>
        </form>
      </div>
    );
  };

  return (
    <>
      <header className="header">
        <h1 className='booklog-main-ttl'>Booklog</h1>
      </header>
      <div className='wrapper'>
        <main className="main">
          <SearchComponent />{/* SearchComponentを読み込む */}
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
