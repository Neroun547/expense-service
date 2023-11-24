const moment = require("moment");

class EarningsController {
    constructor(earningsServiceDb, categoriesServiceDb) {
        this.earningsServiceDb = earningsServiceDb;
        this.categoriesServiceDb = categoriesServiceDb;
    }

    async saveEarning(body, user, res) {
        const categoriesInDb = await this.categoriesServiceDb.getCategoriesByIdAndUserId(body.categoryId, user.id);

        if(!categoriesInDb.length) {
            res.writeHead(403);
            res.end();
        } else {
            await this.earningsServiceDb.saveEarning(body.value, body.categoryId, body.description, body.date);

            res.writeHead(201);
            res.end(JSON.stringify({message: "Earning created"}));
        }
    }
    async getEarningsByCategoryId(data, user, res) {
        const categoriesInDb = await this.categoriesServiceDb.getCategoriesByIdAndUserId(data.categoryId, user.id);

        if(!categoriesInDb.length) {
            res.writeHead(401);
            res.end();
        } else {
            const earnings = await this.earningsServiceDb.getEarningsByCategoryIdByDateFromAndDateTo(data.categoryId, data.dateFrom, data.dateTo);

            const parseEarnings = earnings.map(el => {
                return { ...el, date: moment(el.date).format("YYYY-MM-DD") };
            });
            res.end(JSON.stringify(parseEarnings));
        }
    }
    async deleteEarningsById(id, user, res) {
        const earningAndCategoryInDb = await this.earningsServiceDb.getEarningsAndCategoryById(id);

        if(!earningAndCategoryInDb.length || earningAndCategoryInDb[0].user_id !== user.id) {
            res.writeHead(401);
            res.end();

            return;
        }
        await this.earningsServiceDb.deleteEarningsById(id);

        res.writeHead(202);
        res.end();
    }
}

module.exports = { EarningsController };
