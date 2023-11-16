class SpendingServiceDb {
    constructor(connection) {
        this.connection = connection;
    }
    async createSpending(value, category_id, description, date) {
        await this.connection.execute("INSERT INTO spending (value, category_id, description, date) VALUES (?, ?, ?, ?)", [value, category_id, description, date]);
    }
    async getSpendingByCategoryId(categoryId) {
        return (await this.connection.execute("SELECT * FROM spending WHERE category_id = ?", [categoryId]))[0];
    }
    async getSpendingAndCategoryById(id) {
        return (await this.connection.execute("SELECT * FROM spending LEFT JOIN categories ON spending.category_id = categories.id WHERE spending.id = ?", [id]))[0];
    }
    async deleteSpendingById(id) {
        await this.connection.execute("DELETE FROM spending WHERE id = ?", [id]);
    }
    async getSpendingByCategoryIdByDateFromAndDateTo(category_id, date_from, date_to) {
        return (await this.connection.execute("SELECT * FROM spending WHERE category_id = ? AND date >= ? AND date <= ?", [category_id, date_from, date_to]))[0];
    }
    async deleteSpendingByCategoryId(categoryId) {
        await this.connection.execute("DELETE FROM spending WHERE category_id = ?", [categoryId]);
    }
}

module.exports = { SpendingServiceDb };
