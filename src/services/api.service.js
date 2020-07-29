/**
 * Book object 
 * @typedef {{book_author: string[], book_publication_city: string, book_publication_country: string, book_publication_year: string, book_title: string, book_pages: number, id: number}} Book
 */

/**
 * Book API response 
 * @typedef {{books: Book[], count: number}} BookResponse
 */

const axios = require('axios');

const baseAxiosConfig = {
    baseURL: 'http://nyx.vima.ekt.gr:3000',
    port: 3000,
};

/** 
 * @param {number} pageNumber
 * @param {string} [filter] Filter query string
 * @param {string} [itemsPerPage]
 * @return {BookResponse}
*/
export async function getBooks(pageNumber, filter, itemsPerPage = 20) {
    const requestParams = {
        itemsPerPage,
        page: pageNumber,
        filters: filter ? [{type: 'all', values: [filter]}] : [],
    }
    const response = await axios({...baseAxiosConfig, url: '/api/books', method: 'post', data: requestParams });

    if (response.status === 200) {
        return response.data;
    } else {
        throw Error('Unable to retrieve book data.');
    }
}