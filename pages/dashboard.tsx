import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const gifsPerPage = 3; // Display 3 GIFs per page
  const pageNumbers = Math.ceil(gifs.length / gifsPerPage);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=10`
      );
      setGifs(response.data.data);
    } catch (error) {
      console.error('GIF search error:', error);
    } finally {
      setLoading(false);
      setCurrentPage(1); // Reset to the first page after each search
    }
  };

  const searchBarStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    width: '100%',
  };

  const inputStyles = {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyles = {
    padding: '10px 20px',
    background: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const gifListStyles = {
    display: 'flex',
    justifyContent: 'center', // Center the GIFs horizontally
    alignItems: 'center',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    marginTop: '20px',
  };

  const gifItemStyles = {
    display: 'inline-block',
    margin: '0 10px',
  };

  const spinnerContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const spinnerStyles = {
    width: '30px',
    height: '30px',
    border: '16px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '16px solid gray',
    borderBottom: '16px solid gray',
    animation: `${styles.spin} 2s linear infinite`, // Use the CSS Module
  };

  const pagebuttonStyles = {
    border: '1px solid blue',
    borderRadius: '5px',
    width: '100px',
    height: '30px',
    margin: '0 5px',
    cursor: 'pointer',
    background: 'blue',
    color: 'white',
  }

  // Calculate the index of the last and first GIF to display
  const indexOfLastGif = currentPage * gifsPerPage;
  const indexOfFirstGif = indexOfLastGif - gifsPerPage;
  const currentGifs = gifs.slice(indexOfFirstGif, indexOfLastGif);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pageNumbers) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate an array of page numbers
  const pageArray = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  return (
    <div>
      <div style={searchBarStyles}>
        <input
          type="text"
          placeholder="Search for GIFs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyles}
        />
        <button onClick={handleSearch} style={buttonStyles}>
          Search
        </button>
      </div>
      {loading ? (
        <div style={spinnerContainerStyles}>
          <div style={spinnerStyles}></div>
        </div>
      ) : (
        <div style={gifListStyles}>
          {currentGifs.length > 0 ? (
            currentGifs.map((gif) => (
              <div key={gif.id} style={gifItemStyles}>
                <img src={gif.images.fixed_height.url} alt={gif.title} />
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={pagebuttonStyles}>
          Previous
        </button>
        {pageArray.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            style={{
              background: page === currentPage ? 'blue' : 'white',
              color: page === currentPage ? 'white' : 'blue',
              border: '1px solid blue',
              borderRadius: '5px',
              width: '30px',
              height: '30px',
              margin: '0 5px',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageNumbers}
          style={pagebuttonStyles}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
