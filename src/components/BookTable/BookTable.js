import React from 'react';

import Table from 'react-bootstrap/Table';

/**
 * Book object 
 * @typedef {{book_author: string[], book_publication_city: string, book_publication_country: string, book_publication_year: string, book_title: string, book_pages: number, id: number}} Book
 */

/**
 * 
 * @param {Book[]} books 
 */ 
function createBookRows(books) {
    return books.map((book, index) => {
        const {
            id, 
            book_author: author, 
            book_title: title, 
            book_pages: pages,
            book_publication_city: publicationCity,
            book_publication_country: publicationCountry,
            book_publication_year: publicationYear,
        } = book;
        return <tr key={`book-${index}`}> 
                    <td>{id}</td>
                    <td>{author}</td>
                    <td>{title}</td>
                    <td>{pages}</td>
                    <td>{publicationCity}</td>
                    <td>{publicationCountry}</td>
                    <td>{publicationYear}</td>
                </tr>
    })
}

function BookTable(props) {

    const { books = [] } = props;
    return (
        <React.Fragment>
            { books.length > 0 ? null : <h1 className="No-results">Was unable to get any results :(</h1>}
            <Table className='Book-table' size='sm'  responsive bordered={true} striped={true} variant="primary">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Pages</th>
                        <th>Publication City</th>
                        <th>Publication Country</th>
                        <th>Publication Year</th>
                    </tr>
                </thead>
                { books.length > 0 ? <tbody>
                {createBookRows(books)}
                </tbody> : null}
            </Table>
        </React.Fragment>
    );
}

export default BookTable;