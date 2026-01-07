'use client';

import '@/scss/components/global/Pagination.scss';

/**
 * Pagination - Reusable pagination component
 * 
 * @param {number} currentPage - Current active page (required)
 * @param {number} totalPages - Total number of pages (required)
 * @param {function} onPageChange - Callback function when page changes (required)
 * @param {function} onNext - Callback function for next button (optional)
 * @param {string} className - Additional CSS classes (optional)
 * 
 * @example
 * <Pagination 
 *   currentPage={1}
 *   totalPages={5}
 *   onPageChange={(page) => console.log(page)}
 *   onNext={() => console.log('next')}
 * />
 */
export default function Pagination({ 
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  onNext,
  className = '' 
}) {
  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isLastPage = currentPage === totalPages;

  const handlePageClick = (page) => {
    if (onPageChange && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (onPageChange && !isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`pagination ${className}`}>
      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination__number ${
            page === currentPage ? 'pagination__number--active' : ''
          }`}
          onClick={() => handlePageClick(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      
      {!isLastPage && (
        <button
          type="button"
          className="pagination__next"
          onClick={handleNext}
          aria-label="Go to next page"
        >
          Next
        </button>
      )}
    </div>
  );
}

