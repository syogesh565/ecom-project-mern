import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EnterKeyHandler from './EnterKey';




const NavBar =(handleSearch ) => {
    const location = useLocation();
    const username = location.state?.username || 'User';
    const [showBackdropModal, setShowBackdropModal] = useState(false); // State to control backdrop modal visibility
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is logged in initially
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const onSubmit = (e) => {
      e.preventDefault();
      handleSearch(searchTerm); // Trigger the search function passed from props
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
    return (
        <>
        <EnterKeyHandler targetId="logoutBtn" />
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <h1 className="navbar-brand" >Welcome {username}</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <a className="nav-link active" aria-current="page" href="">Gents Wear</a> */}
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/admin/order-list"> Order List </Link>
                            
                            </li>
                            <li>
                            <Link className="nav-link active" to="/admin/user-list"> User's List </Link>
                            </li>
                            <li className="nav-item dropdown">
                                {/* <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </a> */}
                                <ul className="dropdown-menu">
                                    {/* <li><a className="dropdown-item" href="">Edit Your Profile</a></li> */}
                                    {/* <li> <h5><Link to="/Admin" >Admin Panel</Link></h5></li> */}
                                  
                                
                                </ul>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>
                     
      <form className="d-flex" onSubmit={onSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
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
        </>
    );
};

export default NavBar;


