import { useContext, useCallback } from 'react'
import './BookList.css'
import { BookItem } from './types/index';
import { bookListContext } from './App'

type BookListProps = {
	isMyBookList: boolean;
}

export const BookList: React.FC<BookListProps> = ({ isMyBookList }): JSX.Element => {
	const contextData = useContext(bookListContext);
	const { bookData = [], myBookListData = [], setMyBookListData } = contextData || {};

	const booksToDisplay = isMyBookList ? myBookListData : bookData; //isMyBookListがtrueの時はmyBookListDataを格納し、それ以外はbookDataを格納（検索結果）

	// 本を追加ボタン：引数があるのでuseCallbackを使用
	const handleAddToMyBooks = useCallback((book: BookItem) =>
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault(); //デフォルトの挙動を抑制

			setMyBookListData && setMyBookListData((prevData) => [...prevData, book]);
		}, [setMyBookListData]
	);

	// 本を削除ボタン：引数があるのでuseCallbackを使用
	const handleDeleteFromMyBooks = useCallback((book: BookItem) =>
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault(); //デフォルトの挙動を抑制

			setMyBookListData && setMyBookListData((prevData) => prevData.filter((b) => b.id !== book.id));
		}, [setMyBookListData]
	);

	return (
		<div className="books-box">
			{
				booksToDisplay.map((book) => {
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
									description && !isMyBookList && (
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
									publisher && !isMyBookList && (
										<p className="book-publisher">出版社：{publisher}</p>
									)
								}
								<ul className='book-btn-list'>
									{
										previewLink && (
											<li className='book-btn book-detail-btn'>
												<a href={previewLink} className="book-link">詳しく見る</a>
											</li>
										)
									}
									{
										!isMyBookList && (
											<li className='book-btn book-add-btn'>
												<button className='add-my-books-btn' onClick={handleAddToMyBooks(book)}>MyBooksに追加</button>
											</li>
										)
									}
									{
										isMyBookList && (
											<li className='book-btn book-delete-btn'>
												<button className='delete-my-books-btn' onClick={handleDeleteFromMyBooks(book)}>MyBooksから削除</button>
											</li>
										)
									}
								</ul>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}