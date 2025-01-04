module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/todos.db'
        },
        useNullAsDefault: true, // Nur für SQLite nötig
        migrations: {
            directory: './migrations'
        }
    }
};
