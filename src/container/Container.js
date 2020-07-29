import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import './Container.scss';
import BookTable from '../components/BookTable/BookTable';
import BookPagination from '../components/BookPagination/BookPagination';
import { getBooks } from '../services/api.service';
import { bookAtom, books, numberOfPages } from '../store/books.atom';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

// TODO: Add ReadMe

function Container() {

  // eslint-disable-next-line
  const [ _bookState, setBookState] = useRecoilState(bookAtom);

  const bookList = useRecoilValue(books);
  const totalPages = useRecoilValue(numberOfPages);

  let location = useLocation();
  const pageNumberQueryString = new URLSearchParams(location.search).get('page') ?? 1;
  const pageNumberQuery = !isNaN(pageNumberQueryString) ? parseInt(pageNumberQueryString) : 1;
  const filterQueryString = new URLSearchParams(location.search).get('filter') ?? '';

  const history = useHistory();
  
  const [ currentPage, setPage ] = useState(pageNumberQuery);
  const [ filterValue, setFilterValue ]  = useState('');
  const [ filter, setFilter ] = useState(filterQueryString);

  function onFilter(event) {
    event.preventDefault();
    setFilter(filterValue);
    const search = filter ? `?page=${currentPage}&filter=${filterValue}` : `?filter=${filterValue}`;
    history.push({ search, pathName: '/books'})
  }

  useEffect( () => {
    async function setBooks() {
      const books = await getBooks(currentPage, filter);
      setBookState(books);
    }

    setBooks();

  }, [currentPage, filter, setBookState, pageNumberQuery]);

  function onPageChange(pageNumber) {
    const search = filter ? `?page=${pageNumber}&filter=${filter}` : `?page=${pageNumber}`;
    history.push({ search, pathName: '/books'})
    setPage(pageNumber);
  }

  function handleFilterValueChange(event) {
    setFilterValue(event.target.value);
  }

  return (
    <div className='Container'>
        <div className="Table-navigation"> 
            <Form className="Filter-form" inline onSubmit={(event) => onFilter(event)}>
                <Form.Group role="form">
                    <Form.Control type="text" placeholder="Enter filter term" onChange={(event) => handleFilterValueChange(event)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <BookPagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </div>
        <div className="Table-container">
            <BookTable books={bookList} />
        </div>
    </div>
  );
}

export default Container;