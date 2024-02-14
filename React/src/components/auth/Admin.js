import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Navbar';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import { useApiData } from './ApiDataContext';
import EnterKeyHandler from './EnterKey';
import { useRef } from 'react';
import BASE_URL from '../config';




const AdminItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // State for handling image file
  // ... (Other states and constants remain unchanged)
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [showBackdropModal, setShowBackdropModal] = useState(false); // State to control backdrop modal visibility
  const [itemToDelete, setItemToDelete] = useState(null);
  const {apiData, updateApiData } = useApiData();
  const [file, setFile] = useState([]);
  const fileInputRef = useRef(null);
  


  useEffect(() => {
    // Check for token in local storage on component mount
    const token = localStorage.getItem('token');

    // If no token exists, prevent accessing Welcome page
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch items from the backend when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/yogi`);
      setItems(response.data);
      updateApiData(response.data); // Update the data after fetching
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };

  const handleEnterKeyDelete = () => {
    if (showBackdropModal) {
      handleDelete(itemToDelete);
      setShowBackdropModal(false);
      setItemToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError('Name cannot be empty');
      return;
    }

    if (!description.trim()) {
      setDescriptionError('Description cannot be empty');
      return;
    }
    if (!price.trim()) {
      setPriceError('Price cannot be empty');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('imagePath', file);

    console.log(formData);

    try {
      const response = await axios.post(`${BASE_URL}/yogi`, formData, {
      
      });

      if (response.status === 200) {
        console.log(response.data)
        console.log('Item posted successfully');
        toast.success('Item Added successfully');
        // Clear form fields after successful submission if needed
        fetchItems();
        setName('');
        setDescription('');
        setPrice('')
        setFile([]);
        setItems([...items, response.data]); // Update items state with the new item
        fileInputRef.current.value = '';

        
      } else {
        console.error('Failed to add item');
        toast.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error posting item:', error.message);
      toast.error('Error adding item');
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/yogi/${id}`);
      // Fetch items again after deleting an item to update the list
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems); // Update items state after deletion
      // ... (Your previous success code)
      
      console.log('Item deleted successfully');
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleEdit = (id, currentName, currentDescription, currentPrice ) => {
    setEditingItem({ id, name: currentName, description: currentDescription, price: currentPrice });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleUpdate = async (id) => {
    const { name: newName, description: newDescription, price: newPrice } = editingItem;
    try {
      await axios.put(`${BASE_URL}/yogi/${id}`, {
        name: newName,
        description: newDescription,
        price: newPrice,
      });
      fetchItems();
      setEditingItem(null);
      console.log('Item updated successfully');
      toast.success('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <>
      <NavBar />
      <div className="nav-links">
        {/* <Link to="/admin/item-form">Item Form</Link> */}
        {/* <Link to="/admin/order-list">Order List</Link> */}
      </div>
      <div>
      
        <div style={{ width: '500px' }} class="border border-5">
          <div style={{ width: '300px', }} class="text-bg-secondary p-3"><h2>Add New Item</h2></div>
          <EnterKeyHandler targetId="addItemButton"  onEnterKeyPress={handleSubmit} />
          <form onSubmit={handleSubmit} enctype="multipart/form-data" 
          
          >
            
            <div className="mb-13">
              <label for="formGroupExampleInput" className="form-label">Enter Name:</label>
              <input type="text" value={name} onChange={(e) => {
                setName(e.target.value);
                if (!e.target.value.trim()) {
                  setNameError('Name cannot be empty');
                } else {
                  setNameError('');
                }
              }} style={{ width: '400px' }} className="form-control" id="formGroupExampleInput" placeholder="Enter Name Here" />
              {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
            </div>
            <div className="mb-3">
              <label for="formGroupExampleInput2" className="form-label">Enter Description:</label>
              <input type="text" value={description} onChange={(e) => {
                setDescription(e.target.value);
                if (!e.target.value.trim()) {
                  setDescriptionError('description cannot be empty');
                } else {
                  setDescriptionError('');
                }
              }} style={{ width: '400px' }} className="form-control" id="formGroupExampleInput2" placeholder="Enter Description Here" />
              {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
            </div>
            <div className="mb-3">
              <label for="formGroupExampleInput2" className="form-label">Enter Price:</label>
              <input type="text" value={price} onChange={(e) => {
                setPrice(e.target.value);
                if (!e.target.value.trim()) {
                  setPriceError('Price cannot be empty');
                } else {
                  setPriceError('');
                }
              }} style={{ width: '400px' }} className="form-control" id="formGroupExampleInput2" placeholder="Enter Price Here" />
              {priceError && <div style={{ color: 'red' }}>{priceError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="imageInput" className="form-label">Upload Image:</label>
              {/* <input
                      type="file"
                      id="imageInput"
                      accept="image/*" // Accept only image files
                      onChange={(e) => setImage(e.target.files[0])} // Store the selected file
                      className="form-control"
                    /> */}

              <input className="form-control" type="file" ref={fileInputRef} onChange={handleFileChange}  />
            </div>
            <button id="addItemButton" type="submit" class="btn btn-primary">Add Item</button>
          </form>
        </div>

        <div style={{ width: '300px', }} class="text-bg-secondary p-3"><h2>Items</h2></div>
        <table className="table table-striped table-hover">
          <thead>
            <tr class="table-primary">
              <th scope="col">No.</th>
              <th scope="col">Image</th>
              <th><div >
                Name</div>
              </th>
              <th ><div class="text-justify">
                Description</div>
              </th>
              <th ><div class="text-justify">
                Price</div>
              </th>
              <th scope="col"><div class="text-center" >
                Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
          {items.slice().reverse().map((item, index) => (
              <tr key={item.id}>
                <td>
                  <span>{index + 1 + '.'}</span>
                </td>
                <td>
                  <span><img src={`${BASE_URL}/yogi/${item.imagePath}`}  className="card-img-top m-2" style={{ width: '50px' }} alt="..."/></span>
                </td>
                <td>
                  {editingItem?.id === item.id ? (
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                    />
                  ) : (
                    <div >
                      <strong>{item.name}</strong>
                    </div>
                  )}
                </td>
               
                <td>
                  
                  {editingItem?.id === item.id ? (
                    <input
                      type="text"
                      value={editingItem.description}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, description: e.target.value })
                      }
                    />
                  ) : (
                    <div >
                      {item.description}</div>
                  )}
                </td>
                <td>
                  {editingItem?.id === item.id ? (
                    <input
                      type="text"
                      value={editingItem.price}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, price: e.target.value })
                      }
                    />
                  ) : (
                    <div >
                      <strong>{item.price}</strong>
                    </div>
                  )}
                </td>
                <td>
                  {editingItem?.id === item.id ? (
                    <>
                      <div>
                      <EnterKeyHandler targetId="save" />
                        <button id='save' className="btn btn-success" onClick={() => handleUpdate(item.id)}>Save</button>
                        <button class="btn btn-danger" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <><div class="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button class="btn btn-warning  me-md-2" onClick={() => handleEdit(item.id, item.name, item.description, item.price)}>
                        Edit
                      </button>
                      <button class="btn btn-danger  me-md-2" onClick={() => { setItemToDelete(item.id); setShowBackdropModal(true); }}>Delete</button>
                      {/* <button class="btn btn-danger  me-md-2" onClick={() => handleDelete(item.id)}>Delete</button> */}
                    </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Bootstrap Backdrop Modal */}
      <Modal
        show={showBackdropModal}
        onHide={() => setShowBackdropModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete this Item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowBackdropModal(false); setItemToDelete(null); }}> No </Button>
          <Button id='dltbtn' variant="primary" onClick={() => { handleDelete(itemToDelete); setShowBackdropModal(false); setItemToDelete(null); }}>Yes</Button>
        </Modal.Footer>
      </Modal>
      <EnterKeyHandler targetId="dltbtn" onEnterKeyPress={handleEnterKeyDelete} />
      {image && <img src={image} />}
      
    </>
  );
};


export default AdminItemForm;
