const Filter = ({ searchFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={searchFilter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter