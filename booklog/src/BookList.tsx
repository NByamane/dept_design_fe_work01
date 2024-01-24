import { BookItem } from './types/index'
import './BookList.css'

type BookListProps = {
	bookData: BookItem[];
}

export const BookList: React.FC<BookListProps> = ({ bookData }): JSX.Element => {
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
	)
}