import { useState } from 'react'
import { MOCK_DATA } from './mockdata'
import { BookItem } from './types/index'

export const MyBookList = (): JSX.Element => {
	const [bookData] = useState<BookItem[]>(MOCK_DATA.items);

	return (
		<div className="my-books-box">
			{
				bookData.map((book) => {
					const { id, volumeInfo } = book;
					const { imageLinks, title, authors, previewLink } = volumeInfo;

					return (
						<div key={id} className="my-books-detail">
							{
								imageLinks && (
									<img src={imageLinks.thumbnail} className="my-books-img" alt={title} />
								)
							}
							<div className="my-books-detail-contents">
								<h2 className="my-book-ttl">{title}</h2>
								{
									authors && (
										<p className="my-book-authors-list">著者：
											{
												authors.map((author) => (
													<span className="my-book-list-author" key={author}>{author}</span>
												))
											}
										</p>
									)
								}
								{
									previewLink && (
										<a href={previewLink} className="my-book-link">詳しく見る</a>
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