import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    console.log('BookList - selectedCategories:', selectedCategories); // ADD THIS LINE
    const [books, setBooks] = useState<Book[]>([]);
    const [pageHowMany, setPageHowMany] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0); // Declared hook with default value
    const [totalPages, setTotalPages] = useState<number>(0);
    const [order, setOrder] = useState<string>('BookID');

    useEffect(() => {
        console.log(
            'BookList useEffect - selectedCategories:',
            selectedCategories
        ); // ADD THIS LINE
        console.log('BookList useEffect - about to fetch books'); // ADD THIS LINE
        const fetchBooks = async () => {
            console.log(
                'fetchBooks - selectedCategories at start:',
                selectedCategories
            ); // ADD THIS LINE
            const categoryParams = selectedCategories
                .map((cat) => `${encodeURIComponent(cat)}`) // Removed 'BookCategories=' here
                .join('&BookCategories='); // Added '&BookCategories=' to the join

            const response = await fetch(
                `https://localhost:5000/api/Book/ALLBooks?pageHowMany=${pageHowMany}&pageNum=${pageNumber}&order=${order}${selectedCategories.length ? `&BookCategories=${categoryParams}` : ''}`
            );
            console.log(
                'BookList useEffect - API URL:',
                `https://localhost:5000/api/Book/ALLBooks?pageHowMany=${pageHowMany}&pageNum=${pageNumber}&order=${order}${selectedCategories.length ? `&BookCategories=${categoryParams}` : ''}`
            ); // ADD THIS LINE
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalBooks);
            setTotalPages(Math.ceil(data.totalBooks / pageHowMany));
        };

        fetchBooks();
    }, [pageHowMany, pageNumber, order, selectedCategories]); // Include all of the parameters that will be passed in for use on the page

    return (
        <>
            <br />
            {books.map((book) => (
                <div key={book.bookID} className="card">
                    {' '}
                    {/* Add a little css from bootstrap */}
                    <h3 className="card-title">{book.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li>
                                <strong>Publisher:</strong> {book.publisher}
                            </li>
                            <li>
                                <strong>Author:</strong> {book.author}
                            </li>
                            <li>
                                <strong>ISBN:</strong> {book.isbn}
                            </li>
                            <li>
                                <strong>Classification:</strong>{' '}
                                {book.classification}
                            </li>
                            <li>
                                <strong>Category:</strong> {book.category}
                            </li>
                            <li>
                                <strong>Pages:</strong> {book.pageCount}
                            </li>
                            <li>
                                <strong>Price:</strong> ${book.price}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}

            <button
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
            >
                {' '}
                {/* Toggle the page number back */}
                Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => setPageNumber(i + 1)}
                    disabled={pageNumber === i + 1}
                >
                    {' '}
                    {/* Dynamically display all of the pages */}
                    {i + 1}
                </button>
            ))}

            <button
                disabled={pageNumber === totalPages}
                onClick={() => setPageNumber(pageNumber + 1)}
            >
                {' '}
                {/* Toggle the page number forward */}
                Next
            </button>

            <br />
            <label>
                Results per page:
                <select
                    value={pageHowMany}
                    onChange={(p) => {
                        setPageHowMany(Number(p.target.value));
                        setPageNumber(1); // Reset to page one to avoid getting stuck on an empty page
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <br /> {/* Drop down for sorting */}
                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option value="BookID">BookID</option>
                    <option value="Title">Title</option>
                    <option value="Author">Author</option>
                    <option value="Publisher">Publisher</option>
                    <option value="ISBN">ISBN</option>
                    <option value="Classification">Classification</option>
                    <option value="Category">Category</option>
                    <option value="PageCount">Page Count</option>
                    <option value="Price">Price</option>
                </select>
                {/* select for sorting by Title, Author, Publisher, ISBN,
                    Classification, Category, PageCount, Price */}
            </label>
        </>
    );
}

export default BookList;
