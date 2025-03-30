import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function PurchasesPage() {
    const navigate = useNavigate();
    const { title, bookID, price } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(0);
    const [showAlert, setShowAlert] = useState<boolean>(false); // New state for alert visibility

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || 'No book title found',
            price: Number(price),
            quantity,
        };
        addToCart(newItem);
        setShowAlert(true); // Set alert to visible
        setTimeout(() => {
            setShowAlert(false); // Hide alert after a delay (optional)
            navigate('/cart');
        }, 1500); // Adjust the delay as needed
    };

    return (
        <>
            <WelcomeBand />
            <h2>Add {title} to cart</h2>
            <h3>Price: ${price} each</h3>
            <h3>How many would you like?</h3>
            <div>
                <input
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(x) => setQuantity(Number(x.target.value))}
                />
                <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
            </div>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">Go Back</button>

            {showAlert && ( // Conditionally render the alert
                <div className="alert alert-success" role="alert">
                    Success! Item added to cart.
                </div>
            )}
        </>
    );
}

export default PurchasesPage;
