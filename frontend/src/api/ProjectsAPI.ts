import { Book } from '../types/Book';

interface FetchBooksResponse {
    books: Book[];
    totalBooks: number;
}

const API_URL =
    'https://bookstore-rindlisbacher-backend-echebeemddb6fdh3.eastus-01.azurewebsites.net/api';
export const fetchBooks = async (
    pageHowMany: number,
    pageNumber: number,
    order: string,
    selectedCategories: string[],
    direction: string = 'asc'
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
            .map((cat) => `${encodeURIComponent(cat)}`)
            .join('&BookCategories=');

        const response = await fetch(
            `${API_URL}/Book/ALLBooks?pageHowMany=${pageHowMany}&pageNum=${pageNumber}&order=${order}&direction=${direction}${selectedCategories.length ? `&BookCategories=${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/Book/AddBook?`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error('Failed to add Book');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding Book');
        throw error;
    }
};

export const updateBook = async (
    bookID: number,
    updatedBook: Book
): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/Book/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error('Failed to update Book');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating Book:', error);
        throw error;
    }
};

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/Book/DeleteBook/${bookID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete Book');
        }
    } catch (error) {
        console.error('Error deleting Book:', error);
        throw error;
    }
};
