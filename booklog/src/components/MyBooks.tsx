import { useContext } from 'react'
import '../css/BookList.css'
import { bookListContext, useBookListFunctions } from '../contexts/BookListContext';

export const MyBooks: React.FC = (): JSX.Element => {
	const { myBookListData, setMyBookListData } = useContext(bookListContext);
	const { handleDeleteFromMyBooks } = useBookListFunctions();

	return (
		<div className="books-box">
			{myBookListData.map((book) => {
				const { id, volumeInfo } = book;
				const { imageLinks, title, authors, previewLink } = volumeInfo;

				return (
					<div key={id} className="books-detail">
						{imageLinks && <img src={imageLinks.thumbnail} className="books-img" alt={title} />}
						<div className="books-detail-contents">
							<h2 className="book-ttl">{title}</h2>
							{authors && (
								<p className="book-authors-list">
									著者：
									{authors.map((author) => (
										<span className="author" key={author}>
											{author}
										</span>
									))}
								</p>
							)}
							<ul className="book-btn-list">
								{previewLink && (
									<li className="book-btn book-detail-btn">
										<a href={previewLink} className="book-link">
											詳しく見る
										</a>
									</li>
								)}
								<li className="book-btn book-delete-btn">
									<button className="delete-my-books-btn" onClick={handleDeleteFromMyBooks(book, setMyBookListData)}>
										MyBooksから削除
									</button>
								</li>
							</ul>
						</div>
					</div>
				);
			})}
		</div>
	)
}