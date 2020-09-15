import React from 'react';

import Pagination from 'react-bootstrap/Pagination'

function BookPagination(props) {
    const { totalPages, currentPage, onPageChange } = props;

    function createPaginationItems(totalPages, currentPage) {
        
        let numberOfButtons;
        let paginationList;

        if (totalPages > 0) {
             // ensures that number of buttons generated will always be within 10;
            numberOfButtons = currentPage > Math.floor((totalPages - 1)/ 10) * 10 ? totalPages - Math.floor((totalPages - 1)/ 10) * 10 : 10;

            paginationList = 
            Array.from(
                Array(numberOfButtons), 
                (_, i) => i + 1 + Math.floor((currentPage - 1)/ 10) * 10)
                    .map((index) => 
                        <Pagination.Item 
                            onClick={() => handlePageChange(index)} active={currentPage === index}  
                            key={`pag-item-${index}`}>
                            {index}
                        </Pagination.Item>)
        } else {
            numberOfButtons = 1;
            paginationList = [                       <Pagination.Item 
                onClick={() => handlePageChange(1)} active={currentPage === 1}  
                key={`pag-item-${1}`}>
                {1}
            </Pagination.Item>]
        }

        if (totalPages <= 1 ) {
            return paginationList;
        }

        if (currentPage >= totalPages - 10) {
            return [
                <Pagination.Ellipsis disabled key={`el-1`}/>,
                ...paginationList,
            ]
        }

        if (currentPage <= 10) {
            return [
                ...paginationList,
                <Pagination.Ellipsis disabled key={`el-2`}/>,
            ]
        }

        return [
            <Pagination.Ellipsis disabled key={`el-1`}/>,
            ...paginationList,
            <Pagination.Ellipsis disabled key={`el-2`}/>,
        ]

    }
    
    function handlePageChange(pageNumber) {
        onPageChange(pageNumber)
    }

    return (  
        <Pagination className='Book-pagination'>
            <Pagination.First disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}/>
            {createPaginationItems(totalPages, currentPage)}
            <Pagination.Next disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}/>
            <Pagination.Last disabled={currentPage >= totalPages} onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      )
}

export default BookPagination;
