import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import LoadingIndicator from '../LoadingIndicator';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [username, setUserName] = useState('User');



  useEffect(() => {
    // Retrieve cartItems from local storage on component render
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const storedUserInfo = localStorage.getItem('userinfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserName(parsedUserInfo.username);
    }
  },
    []);

  console.log(cartItems)
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

  };

  const decreaseQuantity = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    const updatedCart = [...cartItems];
    if (updatedCart[existingItemIndex].quantity > 1) {
      updatedCart[existingItemIndex].quantity--;
      updateCart(updatedCart);
      toast.info(`${item.name} quantity decreased`);
    } else {
      updatedCart.splice(existingItemIndex, 1);
      updateCart(updatedCart);
      toast.info(`${item.name} removed from cart`);
    }
  };

  const increaseQuantity = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    const updatedCart = [...cartItems];
    updatedCart[existingItemIndex].quantity++;
    updateCart(updatedCart);
    toast.info(`${item.name} quantity increased`);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    updateCart(updatedCart);
    toast.info(`Item removed from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // const handleCheckout = () => {
  //   // Redirect to the payment page using React Router
  //   navigate('/payment'); // Assuming '/payment' is the path to the payment page
  // };


  const makePayment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    const stripe = await loadStripe("pk_test_51OWeBESCz0YwIkJAl9tBnlEIgwvktLLpM354DwSZjiZiziZwXXIywTIDhdwPc9PqY5no65LBrY5dWl4sBn0Lddoo00pp9TrLUN")
    const body = {
      products: cartItems
    }
    const headers = {
      "content-Type": "application/json"
    }
    try {
      //  Send the ordered items to the back-end
      //  await fetch('http://localhost:3000/api/create-order', {
      //   method: 'POST',
      //   headers: headers,
      //   body: JSON.stringify(body),
      // });
      const response = await fetch('http://localhost:3000/api/create-payment-intent', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await response.json();
      const result = stripe.redirectToCheckout({
        sessionId: session.id
      });
      // Check if the payment was successful before clearing the cart
      if (result.error) {
        console.log(result.error);
      } else {

      }
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    };
  };

  const getTotalCartValueInINR = () => {
    // Assuming you have the total value in INR
    const totalCartValue = getTotalCartValue(); // Replace this with your function to get the total cart value in INR
    return `Total Value of Cart: ₹${totalCartValue}`;
  };

  return (
    <>
      {loading && <LoadingIndicator />} {/* Conditionally render the loading indicator */}
      {cartItems.length === 0 ? (
        <>
          <p>No items in the cart</p>
          <Link to="/welcome" className="btn btn-link">
            &lt; Home Page
          </Link>
        </>
      ) :
        (
          <div>
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <h1 className="navbar-brand">Cart Items {username}</h1>
                <Link to="/welcome" className="btn btn-link">
                  &lt; Home Page
                </Link>
              </nav>
            </div>
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                    <div className="card h-100 " style={{ marginBottom: '0px' }}>
                      <span className="badge bg-primary position-absolute top-0 start-0 p-1 rounded-pill">
                        {index + 1}
                      </span>
                      <img
                        src={`http://localhost:3000/yogi/${item.imagePath}`}
                        className="card-img-top img-fluid"
                        style={{ width: '100px', maxHeight: '80px', objectFit: 'cover' }}
                        alt="..."
                      />

                      <div className="card-body" style={{ marginBottom: '0px' }}>
                        <h5 className="card-title">Name: {item.name}</h5>
                        <p className="card-text">Description: {item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p className="card-text">Price: <strong>₹</strong>{item.price}</p>
                        <p>Total Price: <strong>₹</strong>{item.price * item.quantity}</p> {/* Calculate price based on quantity */}
                      </div>


                      <div className="d-flex justify-content-between align-items-center mt-auto p-3 absolute-bottom">

                        <div className="d-flex  justify-content-between gap-2">
                          <button className="btn btn-primary" onClick={() => decreaseQuantity(item)}>
                            -
                          </button>

                          <button className="btn btn-primary" onClick={() => increaseQuantity(item)}>
                            +
                          </button>
                          <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>

                      </div>


                    </div>

                  </div>
                ))}
              </div>
            </div>
            <div className="container p-2 bg-info bg-opacity-10 border border-info border-start-0 rounded-end position-relative"

            >
              {/* Display total number of items */}
              <h5>Items In Your Cart: {getTotalQuantity()}</h5>
              <h5>Total Value of Cart: ₹ {getTotalCartValue()}</h5>
              <div className="d-flex gap-2 position-absolute top-0 end-0 mt-2 me-2">
                <button onClick={clearCart} className="btn btn-danger ">
                  Clear Cart
                </button>
                <button
                  onClick={(e) => makePayment(e)}
                  className="btn btn-success"
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '8px' }} />
                      Processing...
                    </>
                  ) : (
                    'Checkout'
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

    </>
  );
};

export default Cart;
