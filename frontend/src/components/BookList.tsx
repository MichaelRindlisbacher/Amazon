import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/ProjectsAPI';
import Pagination from './pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    console.log('BookList - selectedCategories:', selectedCategories); // ADD THIS LINE
    const [books, setBooks] = useState<Book[]>([]);
    const [pageHowMany, setPageHowMany] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [order, setOrder] = useState<string>('BookID');
    const [sortDirection, setSortDirection] = useState<string>('asc');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(
            'BookList useEffect - selectedCategories:',
            selectedCategories
        ); // ADD THIS LINE
        console.log('BookList useEffect - about to fetch books'); // ADD THIS LINE
        const loadBooks = async () => {
            console.log(
                'fetchBooks - selectedCategories at start:',
                selectedCategories
            ); // ADD THIS LINE
            try {
                setLoading(true);
                const data = await fetchBooks(
                    pageHowMany,
                    pageNumber,
                    order,
                    selectedCategories,
                    sortDirection
                );
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalBooks / pageHowMany));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageHowMany, pageNumber, order, selectedCategories, sortDirection]); // Include all of the parameters that will be passed in for use on the page

    if (loading) {
        return <p>Loading Books...</p>;
    }
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

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

                        <button
                            className="btn btn-success"
                            onClick={() =>
                                navigate(
                                    `/purchase/${book.title}/${book.bookID}/${book.price}`
                                )
                            }
                        >
                            Buy
                        </button>
                    </div>
                </div>
            ))}
            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageHowMany}
                onPageChange={setPageNumber}
                order={order}
                sortDirection={sortDirection}
                onPageSizeChange={(newSize) => {
                    setPageHowMany(newSize);
                    setPageNumber(1);
                }}
                onSortChange={(newOrder, direction) => {
                    setOrder(newOrder);
                    setSortDirection(direction);
                    console.log("changing sort to:", newOrder, direction);
                }}
            />
        </>
    );
}

export default BookList;
