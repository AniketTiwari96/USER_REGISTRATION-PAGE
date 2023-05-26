


import React, { useState } from 'react';
import '../form/Basicform.css';

function Table({ formEntries }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const entriesPerPage = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Apply search filter by date
  let filteredEntries = formEntries;
  if (searchDate) {
    filteredEntries = formEntries.filter((entry) => entry.date === searchDate);
  }

  // Sort entries by date
  let sortedEntries = filteredEntries;
  if (sortOrder === 'asc') {
    sortedEntries = filteredEntries.slice().sort((a, b) => a.date.localeCompare(b.date));
  } else if (sortOrder === 'desc') {
    sortedEntries = filteredEntries.slice().sort((a, b) => b.date.localeCompare(a.date));
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedEntries.length / entriesPerPage);

  // Calculate the index of the last entry on the current page
  const lastIndex = currentPage * entriesPerPage;

  // Calculate the index of the first entry on the current page
  const firstIndex = lastIndex - entriesPerPage;

  // Get the entries to be displayed on the current page
  const currentEntries = sortedEntries.slice(firstIndex, lastIndex);

  return (
    <div>
      <div className="search">
        <input
          type="date"
          placeholder="Search by date"
          value={searchDate}
          onChange={handleSearchDate}
        />

        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone-Number</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.phone}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;

