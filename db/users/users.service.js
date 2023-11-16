class UsersServiceDb {
    constructor(connection) {
        this.connection = connection;
    }
    async getUsersByUsername(username) {
        return (await this.connection.execute("SELECT * FROM users WHERE username = ?", [username]))[0];
    }
    async createUser(username, password) {
        await this.connection.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
    }
}

module.exports = { UsersServiceDb };
