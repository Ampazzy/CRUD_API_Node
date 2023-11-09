const {nanoid} = require('nanoid');

const time = new Date().toISOString();

const books = [];

function getBooks() {
    return books.map(({ id, name, publisher }) => ({ id, name, publisher }));
}

function addBook({ name, year, author, summary, publisher, pageCount, readPage, reading }) {
    if (!name) {
        return {
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
            statusCode: 400,
        };
    }

    if (readPage > pageCount) {
        return {
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            statusCode: 400,
        };
    }

    const id = nanoid();

    if(pageCount === readPage){
        books.push({
            id, 
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            finished : true, 
            reading : false, 
            insertedAt : time, 
            updatedAt : time
           });
    }else if(pageCount > readPage){
        books.push({
            id, 
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            finished : false, 
            reading : false, 
            insertedAt : time, 
            updatedAt : time
           });
    }

    return {
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
        statusCode: 201,
    };
}

function deleteBook({ id }) {
    const index = books.findIndex((item) => item.id === id);

    if (index === -1) {
        return {
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
            statusCode: 404,
        };
    }

    books.splice(index, 1);

    return {
        status: 'success',
        message: 'Buku berhasil dihapus',
        statusCode: 200,
    };
}

function getBookById({ id }) {
    const book = books.find((item) => item.id === id);
    return book || null;
}

function editBook({ id, name, year, author, summary, publisher, pageCount, readPage, reading }) {
    const index = books.findIndex((item) => item.id === id);

    if (!name) {
        return {
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
            statusCode: 400,
        };
    }

    if(readPage > pageCount){
        return {
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            statusCode: 400,
        }
    }

    if (index === -1) {
        return {
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
            statusCode: 404,
        }
    }

    if(readPage === pageCount){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished: true,
            reading,
            updatedAt: time,
        };
    }else{
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished: false,
            reading,
            updatedAt: time,
        };
    }
   
    return {
        status: 'success',
        message: 'Buku berhasil diperbarui',
        statusCode: 200,
    };
}

module.exports = {
    getBooks,
    addBook,
    deleteBook,
    editBook,
    getBookById,
};
