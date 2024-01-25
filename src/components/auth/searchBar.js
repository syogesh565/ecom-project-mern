// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const handleSearch = async () => {
//     const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
    
//     try {
//       const response = await fetch(`http://localhost:3000/yogi?term=${searchTerm}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       setFilteredItems(data);
//     //   setCurrentPage(1);
//     } catch (error) {
//       console.error('Error searching data:', error);
//       toast.error('Error searching data');
//     }
  

//   const handleChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     handleSearch(term);
// };

//   return (
//   <form className="d-flex" onSubmit={handleSearch}>
//   <input
//     className="form-control me-2"
//     type="search"
//     placeholder="Search"
//     aria-label="Search"
//     onChange={handleChange}
//   />
//   <button className="btn btn-outline-success"  type="submit">
//     Search
//   </button>
// </form>
//   )
// };
// export default handleSearch;
