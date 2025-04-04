import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/ProjectsAPI';
import Pagination from '../components/pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageHowMany, setPageHowMany] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortDirection, setSortDirection] = useState<string>('asc');
    const [order, setOrder] = useState<string>('BookID');
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchBooks(
                    pageHowMany,
                    pageNumber,
                    order,
                    [],
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

        loadProjects();
    }, [pageHowMany, pageNumber, order, sortDirection]); // Include all of the parameters that will be passed in for use on the page]);

    const handleDelete = async (bookID: number) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete?'
        );
        if (!confirmDelete) return;

        try {
            await deleteBook(bookID);
            setBooks(books.filter((book) => book.bookID !== bookID));
        } catch (error) {
            alert('Failed to delete book. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div>
            <h1>Admin - Books</h1>

            {!showForm && (
                <button
                    className="btn btn-success mb-3"
                    onClick={() => setShowForm(true)}
                >
                    Add Book
                </button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(
                            pageHowMany,
                            pageNumber,
                            order,
                            [],
                            sortDirection
                        ).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(
                            pageHowMany,
                            pageNumber,
                            order,
                            [],
                            sortDirection
                        ).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setEditingBook(null)}
                />
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.bookID}>
                            <td>{b.bookID}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>{b.price}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm w-100 mb-1"
                                    onClick={() => setEditingBook(b)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm w-100"
                                    onClick={() => handleDelete(b.bookID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                onSortChange={(newOrder, newDirection) => {
                    setOrder(newOrder);
                    setSortDirection(newDirection);
                }}
            />
        </div>
    );
};

export default AdminBooksPage;
