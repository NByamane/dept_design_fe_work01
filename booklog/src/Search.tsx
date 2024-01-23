import { useRef } from 'react'
import { BookItem } from './types/index'

// 親コンポーネントから受け取るデータの型定義
type SearchProps = {
	setBookData: React.Dispatch<React.SetStateAction<BookItem[]>>;
	setTotalItems: React.Dispatch<React.SetStateAction<number>>;
}

export const Search: React.FC<SearchProps> = ({ setBookData, setTotalItems }): JSX.Element => {
	const searchRef = useRef<HTMLInputElement>(null); //初期値としてnullを渡す。HTMLInputElementで参照する要素はinputだよ〜といってる。ジェネリクス+Elementの型指定。

	//送信時のイベント
	const pushSearch = async (event: React.FormEvent<HTMLFormElement>) => { //React.FormEventで、フォーム送信時に発火
		event.preventDefault(); //ページが更新されるのを一旦ストップ
		const inputValue = searchRef.current?.value; //nullの可能性があるのでオプショナルチェーンで確実にvalueにアクセスできるようにする

		//APIリクエスト
		try {
			if (!inputValue || inputValue.trim() === '') {
				return;
			}

			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(inputValue)}&maxResults=10&key=AIzaSyCQT7Sg-xEq72wJgmK11kgu5GYF2n1HWpk`);
			if (!response.ok) {
				console.error('response.ok:', response.ok);
				console.error('esponse.status:', response.status);
				console.error('esponse.statusText:', response.statusText);
				throw new Error(response.statusText);
			}

			const data = await response.json();

			if (data.items) {
				setBookData(data.items);
				setTotalItems(data.totalItems); //トータル件数取得
			}
		} catch (error) {
			console.error('通信に失敗しました', error);
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