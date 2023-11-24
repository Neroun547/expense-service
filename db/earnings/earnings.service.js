class EarningsServiceDb {
    constructor(connection) {
        this.connection = connection;
    }

    async saveEarning(value, categoryId, description, date) {
        await this.connection.execute("INSERT INTO earnings (value, category_id, description, date) VALUES (?, ?, ?, ?)", [value, categoryId, description, date]);
    }
    async getEarningsByCategoryIdByDateFromAndDateTo(category_id, date_from, date_to) {
        return (await this.connection.execute("SELECT * FROM earnings WHERE category_id = ? AND date >= ? AND date <= ?", [category_id, date_from, date_to]))[0];
    }
    async getEarningsAndCategoryById(id) {
        return (await this.connection.execute("SELECT * FROM earnings LEFT JOIN categories ON earnings.category_id = categories.id WHERE earnings.id = ?", [id]))[0];
    }
    async deleteEarningsById(id) {
        await this.connection.execute("DELETE FROM earnings WHERE id = ?", [id]);
    }
}

module.exports = { EarningsServiceDb };

