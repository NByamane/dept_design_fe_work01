import { useRef } from 'react' //reactのuseRefを使うよ

// 検索ワードの保持
interface SearchProps {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Search = ({ setSearchQuery }: SearchProps): JSX.Element => {
	const searchRef = useRef<HTMLInputElement>(null); //初期値としてnullを渡す。HTMLInputElementで参照する要素はinputだよ〜といってる。ジェネリクス+Elementの型指定。

	//送信時のイベント
	const pushSearch = (event: React.FormEvent<HTMLFormElement>) => { //React.FormEventで、フォーム送信時に発火
		event.preventDefault(); //ページが更新されるのを一旦ストップ
		const inputValue = searchRef.current?.value; //nullの可能性があるのでオプショナルチェーンで確実にvalueにアクセスできるようにする
		setSearchQuery(inputValue || ''); //検索ワードを更新
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