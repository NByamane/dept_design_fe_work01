import { useRef } from 'react' //reactのuseRefを使うよ
import { BookItem } from './types/index'

// 親コンポーネントから受け取るデータの型定義
interface SearchProps {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	setBookData: React.Dispatch<React.SetStateAction<BookItem[]>>;
}

export const Search = ({ setSearchQuery, setBookData }: SearchProps): JSX.Element => {
	const searchRef = useRef<HTMLInputElement>(null); //初期値としてnullを渡す。HTMLInputElementで参照する要素はinputだよ〜といってる。ジェネリクス+Elementの型指定。

	//送信時のイベント
	const pushSearch = async (event: React.FormEvent<HTMLFormElement>) => { //React.FormEventで、フォーム送信時に発火
		event.preventDefault(); //ページが更新されるのを一旦ストップ
		const inputValue = searchRef.current?.value; //nullの可能性があるのでオプショナルチェーンで確実にvalueにアクセスできるようにする
		setSearchQuery(inputValue || ''); //検索ワードを更新

		//APIリクエスト
		try {
			if (!inputValue || inputValue.trim() === '') {
				return;
			}

			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(inputValue)}t&maxResults=10&key=AIzaSyCQT7Sg-xEq72wJgmK11kgu5GYF2n1HWpk`);
			if (!response.ok) {
				throw new Error(`Failed to fetch data. Status: ${response.status}`);
			}

			const data = await response.json();

			if (data.items) {
				setBookData(data.items);
			}
		} catch (error) {
			console.error('Error fetching data from Google Books API:', error);
		}
	};

	return (
		<div className="search-box">
			<form onSubmit={pushSearch} className='search-form'>
				<input type="text" name='search-contents' id='search-contents' className='search-contents' placeholder='キーワードを入力して書籍を検索' ref={searchRef} />
				<button type="submit" className='search-submit'>search</button>
			</form>
		</div>
	);
};