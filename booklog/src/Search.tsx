import { useRef, useCallback } from 'react' //reactのuseRef, useCallbackを使うよ

export const Search = (): JSX.Element => {
	const searchRef = useRef<HTMLInputElement>(null); //初期値としてnullを渡す。HTMLInputElementで参照する要素はinputだよ〜といってる。ジェネリクス型というらしい。。。
	const searchValue = useRef<string>(''); //useRefで非制御コンポーネントを作成

	//入力時のイベント
	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => { //React.ChangeEvent<HTMLInputElement>で、インプットされるものが変化する時に発火
		searchValue.current = event.target.value; //.currentはuseRefに含まれるプロパティで最新の値をさす
	}, [searchValue]);

	//送信時のイベント
	const pushSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => { //React.FormEventで、フォーム送信時に発火
		event.preventDefault(); //ページが更新されるのを一旦ストップ
		//注：検索機能については次回stepで記載

		alert(`${searchValue.current}で検索しました`); //とりあえずアラート出します（　∵　）
	}, []);

	return (
		<div className="search-box">
			<form onSubmit={pushSearch} className='search-form'>
				<input type="text" name='search-contents' id='search-contents' className='search-contents' placeholder='キーワードを入力して書籍を検索' ref={searchRef} onChange={handleChange} />
				<button type="submit" className='search-submit'>search</button>
			</form>
		</div>
	);
};