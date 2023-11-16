class CategoriesServiceDb {
    constructor(connection) {
        this.connection = connection;
    }

    async createCategory(name, userId, createdAt) {
        await this.connection.execute("INSERT INTO categories (name, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)", [name, userId, createdAt, createdAt]);
    }

    async deleteCategoryByUserIdAndId(userId, id) {
        await this.connection.execute("DELETE FROM categories WHERE id = ? AND user_id = ?", [id, userId]);
    }
    async getCategoriesAndSpendingByUserId(userId) {
        return (await this.connection.execute("SELECT categories.id, categories.user_id, categories.name, categories.created_at, spending.value FROM categories LEFT JOIN spending ON categories.id = spending.category_id WHERE user_id = ?", [userId]))[0];
    }
    async getCategoriesByIdAndUserId(id, userId) {
        return (await this.connection.execute("SELECT * FROM categories WHERE id = ? AND user_id = ?", [id, userId]))[0];
    }
}

module.exports = { CategoriesServiceDb };

