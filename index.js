const Hapi = require('@hapi/hapi');
const { addBook, getBooks, deleteBook, editBook, getBookById } = require('./data');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    server.route({
        method: 'POST',
        path: '/books',
        handler: (request, h) => {
            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
            const result = addBook({ name, year, author, summary, publisher, pageCount, readPage, reading });

            if (result.status === 'fail') {
                return h.response(result).code(result.statusCode);
            } else {
                return h.response(result).code(result.statusCode);
            }
        },
    });

    server.route({
        method: 'GET',
        path: '/books',
        handler: (request, h) => {
            const books = getBooks();
            return { status: 'success', data: { books } };
        },
    });

    server.route({
        method: 'GET',
        path: '/books/{id}',
        handler: (request, h) => {
            const { id } = request.params;
            const book = getBookById({ id });

            if (!book) {
                return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
            } else {
                return h.response({ status: 'success', data: { book } }).code(200);
            }
        },
    });

    server.route({
        method: 'PUT',
        path: '/books/{id}',
        handler: (request, h) => {
            const { id } = request.params;
            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
            const updated = editBook({ id, name, year, author, summary, publisher, pageCount, readPage, reading });

            const statusCode = updated.statusCode;
            delete updated.statusCode;

            return h.response(updated).code(statusCode);
        },
    });

    server.route({
        method: 'DELETE',
        path: '/books/{id}',
        handler: (request, h) => {
            const { id } = request.params;
            const result = deleteBook({ id });

            delete result.statusCode;

            if (result.status === 'fail') {
                return h.response(result).code(404);
            } else {
                return h.response(result).code(200);
            }
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
