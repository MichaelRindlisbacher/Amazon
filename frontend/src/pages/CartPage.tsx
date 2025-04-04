import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    return (
        <>
            <div>
                <h2>Your Cart</h2>
                <div>
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <ul>
                            {cart.map((item: CartItem) => {
                                return (
                                    <li key={item.bookID}>
                                        {item.title} ({item.quantity}): $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                        <button
                                            onClick={() =>
                                                removeFromCart(item.bookID)
                                            }
                                            className="btn btn-danger"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <h3>Total: </h3>
                <button>Checkout</button>
                <button onClick={() => navigate('/books')}>
                    Continue Browse
                </button>
            </div>
        </>
    );
}

export default CartPage;
