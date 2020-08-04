import path from 'path';

const resolve = path.resolve;

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
        directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
};