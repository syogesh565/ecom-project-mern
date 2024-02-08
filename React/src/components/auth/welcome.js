import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import NavBar from './Navbar';
// import image from './img.png'
import { useApiData } from './ApiDataContext';
import SearchBar from './searchBar';
import EnterKeyHandler from './EnterKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart';
import BASE_URL from '../config';
// import { faOpencart } from '@fortawesome/free-solid-svg-icons';
// import { faOpencart } from '@fortawesome/free-brands-svg-icons';








const Welcome = ({ }) => {
  const location = useLocation();
  // const username = location.state?.username || 'User';
  // const [apiData, setApiData] = useState([]); // State to hold API data
  const navigate = useNavigate();
  const { apiData, updateApiData } = useApiData(); // Using the shared context
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [showBackdropModal, setShowBackdropModal] = useState(false); // State to control backdrop modal
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is logged in initially
  const [cartItems, setCartItems] = useState([]);


  const [username, setUserName] = useState('User');



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // Retrieve cartItems from local storage on component mount
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const storedUserInfo = localStorage.getItem('userinfo');
    
    if (storedUserInfo) {
      
       const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserName(parsedUserInfo.username);
    }
  }, []);
  
    // Update localStorage whenever cartItems change
    // useEffect(() => {
    //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // }, [cartItems]);

     const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex === -1) {
      // Item not in cart, add it with a quantity of 1
      const newCartItems = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      toast.success(`${item.name} added to cart`);
    } else {
      // Item already in cart, increment its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity++;
      setCartItems(updatedCart);
      console.log(updatedCart)
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      toast.info(`${item.name} quantity increased`);
    }
    console.log("Cart Items:", cartItems);
    // localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };



  useEffect(() => {
    // Retrieve cartItems from local storage when cartItems change
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []); // Fetch cartItems whenever cartItems state changes

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    // Check for token in local storage on component mount
    const token = localStorage.getItem('token');

    // If no token exists, prevent accessing Welcome page
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/yogi`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        updateApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems(); // Call fetchData once when the component mounts

    // Since setItems is a function from useContext, it should not be included in the dependencies array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependencies array to run the effect only once

  useEffect(() => {
    setFilteredItems(apiData);
  }, [apiData]);

  const handleSearch = async (searchTerm) => {

    try {
      const response = await fetch(`${BASE_URL}/yogi?term=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFilteredItems(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching data:', error);
      toast.error('Error searching data');
    }
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };



  const handleLogout = async () => {
    try {
      // Clear user state or perform necessary actions after successful logout

      // Clear token from local storage on logout
      localStorage.removeItem('token');

      setIsLoggedIn(false);
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed');
    }
  };

 

  // Display Cart count in Navbar
  // const CartIcon = () => (
  //   <div onClick={handleCartClick}>
  //     {/* <FontAwesomeIcon icon={faOpencart}  style={{position: 'absolute', top: '25px', right: '446px', color: 'blue' }}/> */}
  //     <FontAwesomeIcon icon={faShoppingCart} style={{ position: 'absolute', top: '25px', right: '446px', color: 'blue' }} />
  //     {/* <span className="badge bg-primary p-1 rounded-pill mt-1" style={{ position: 'absolute', top: '16px', right: '421px' }} >{cartItems.length}</span> */}
  //     <span className="badge bg-primary p-1 rounded-pill mt-1" style={{ position: 'absolute', top: '16px', right: '421px' }} >{getTotalQuantity()}</span>


  //   </div>
  // );

 
  // const handleCartClick = () => {
  //   // Navigate to the Cart component when cart icon is clicked
  //   navigate('/cart',{ state: { cartItems: cartItems } });
  // };

  return (
    <>
      {/* <NavBar /> */}
      {/* <SearchBar  /> */}

      {/* NavBar */}
     {/* <PaymentForm/> */}
      <EnterKeyHandler targetId="logoutBtn" />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand" >Welcome {username}</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="">Gents Wear</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="">Ladies Wear</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Profile
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="">Edit Your Profile</a></li>
                  <li> <h5><Link to="/Admin" >Admin Panel</Link></h5></li>


                </ul>
              </li>
              <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
            </ul> */}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link  className="nav-link" to="/cart">
                  {/* <CartIcon /> */}
                  <FontAwesomeIcon  icon={faShoppingCart} style={{ position: 'absolute', top: '25px', right: '446px', color: 'blue' }} />
                  <span className="badge bg-primary p-1 rounded-pill mt-1" style={{ position: 'absolute', top: '16px', right: '421px' }} >{getTotalQuantity()}</span>
                </Link>
              </li>
            </ul>

            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <Button variant="danger" onClick={() => setShowBackdropModal(true)} classNameName="d-inline-flex focus-ring  py-1 px-6 text-decoration-none border rounded-2" style={{ '--focus-ring-color': 'var(--bs-focus-ring-color)' }}>
          Logout
        </Button>
      </nav>
      {/* Bootstrap Backdrop Modal */}
      <Modal
        show={showBackdropModal}
        onHide={() => setShowBackdropModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBackdropModal(false)}> No </Button>
          <Button id='logoutBtn' variant="primary" onClick={handleLogout}>Yes</Button>
        </Modal.Footer>
      </Modal>




      <div className="d-flex flex-wrap" style={{ width: '10 rem' }}>


        {currentItems.map((item, index) => (

          <div key={index} className="card m-2" style={{ width: '10rem' }}>
            <span class="badge bg-primary position-absolute top-0 start-0 p-1 rounded-pill"> {(currentPage - 1) * itemsPerPage + index + 1}</span>
            <img src={`${BASE_URL}/yogi/${item.imagePath}`} className="card-img-top m-2" style={{ width: '100px' }} alt="..." />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Name: {item.name}</h5>
              <p className="card-text">Description:{item.description}</p>
              <p className="card-text">Price: <strong>₹</strong> {item.price}</p>
              <div className="mt-auto">
                {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                  <div className="btn-group" role="group" aria-label="Cart Controls">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
                        const updatedCart = [...cartItems];
                        if (updatedCart[existingItemIndex].quantity > 1) {
                          updatedCart[existingItemIndex].quantity--;
                          setCartItems(updatedCart);
                          toast.info(`${item.name} quantity decreased`);
                        } else {
                          // If the quantity is 1, remove the item from the cart
                          updatedCart.splice(existingItemIndex, 1);
                          setCartItems(updatedCart);
                          toast.info(`${item.name} removed from cart`);
                        }
                      }}
                    >
                      -
                    </button>
                    <span  style={{ borderTop: '4px solid var(--bs-primary)', borderBottom: '4px solid var(--bs-primary)', padding: '5px', width: '30px' }} className="btn">{cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0}</span>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(item)} className={`btn btn-primary`}>
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Pagination */}
      <nav className="d-flex justify-content-center absolute-bottom bg-body-tertiary">
        <ul className="pagination pagination-sm">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button onClick={goToPrevPage} className="page-link">
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button onClick={goToNextPage} className="page-link">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Welcome;
