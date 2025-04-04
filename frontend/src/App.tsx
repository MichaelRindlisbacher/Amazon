import './App.css';
import BooksMainPage from './pages/BooksMainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PurchasesPage from './pages/PurchasesPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
    return (
        <>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<BooksMainPage />} />
                        <Route path="/Books" element={<BooksMainPage />} />
                        <Route
                            path="/purchase/:title/:bookID/:price"
                            element={<PurchasesPage />}
                        />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/adminBooks" element={<AdminBooksPage />} />
                    </Routes>
                </Router>
            </CartProvider>
        </>
    );
}

export default App;
