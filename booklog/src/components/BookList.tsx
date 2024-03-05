import { useContext } from 'react'
import { BookItem } from '../types/index'
import '../css/BookList.css'
import { MyBooksContext } from '../contexts/BookListContext';

type BookListProps = {
	bookData: BookItem[];
}

export const BookList: React.FC<BookListProps> = ({ bookData }): JSX.Element => {
	const { addToMyBooks } = useContext(MyBooksContext);

	return (
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
								<ul className='book-btn-list'>
									{
										previewLink && (
											<li className='book-btn book-detail-btn'>
												<a href={previewLink} className="book-link">詳しく見る</a>
											</li>
										)
									}
									{
										(
											<li className='book-btn book-add-btn'>
												<button className='add-my-books-btn' onClick={addToMyBooks.bind(null, book)}>MyBooksに追加</button>
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