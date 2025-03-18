import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
        const response = await fetch('https://localhost:5000/api/Book');
        const data = await response.json();

        setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
    <>
        <h1>Book List</h1>
        <br />
        {books.map((book) => (
        <div key={book.bookID}>
            <h3>{book.title}</h3>
            <p>Publisher: {book.publisher}</p>
            <p>Author: {book.author}</p>
            <p>{book.isbn}</p>
            <p>Classification: {book.classification}</p>
            <p>Category: {book.category}</p>
            <p>Pages: {book.pageCount}</p>
            <p>Price ${book.price}</p>
        </div>
        ))}
    </>
    );
}

export default BookList;
// bookID: number;
// title: string;
// author: string;
// publisher: string;
// isbn: string;
// classification: string;
// category: string;
// pageCount: number;
// price: number;
