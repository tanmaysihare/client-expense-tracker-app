import React from 'react'

const Pagination = ({expensePerPage,totalExpenses,paginate,currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalExpenses / expensePerPage); i++) {
      pageNumbers.push(i);
    }
  return (
    <nav className='pagination is-rounded is-centered'role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
            <li key={number} className={number===currentPage?'pagination-link is-current':'pagination-link'}>
                <span onClick={()=>paginate(number)}>{number}</span>
            </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
