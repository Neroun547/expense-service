class CategoriesController {
    constructor(spendingServiceDb, categoriesServiceDb, commonService) {
        this.spendingServiceDb = spendingServiceDb;
        this.categoriesServiceDb = categoriesServiceDb;
        this.commonService = commonService;
    }

    async getCategories(user, res) {
        const data = (await this.categoriesServiceDb.getCategoriesAndSpendingByUserId(user.id));

        const parseArr = [];
        let tmpIndex;

        for(let i = 0; i < data.length; i++) {
            tmpIndex = parseArr.findIndex(el => el.name === data[i].name);

            if(tmpIndex === -1) {
                parseArr.push({ ...data[i], created_at: this.commonService.getDatetimeStringFromIsoDateString(data[i].created_at.toISOString()) });
            } else {
                if(data[i].value) {
                    parseArr[tmpIndex].value += data[i].value;
                }
            }
        }
        res.end(JSON.stringify(parseArr));
    }

    async createCategory(body, user, res) {
        await this.categoriesServiceDb.createCategory(body.name, user.id, body.createdAt);

        res.writeHead(201);
        res.end(JSON.stringify({ message: "Category created" }));
    }

    async deleteCategoryById(id, user, res) {
        const categories = await this.categoriesServiceDb.getCategoriesByIdAndUserId(id, user.id);

        if(categories.length) {
            await this.spendingServiceDb.deleteSpendingByCategoryId(id);
            await this.categoriesServiceDb.deleteCategoryByUserIdAndId(user.id, id);

            res.writeHead(202);
            res.end(JSON.stringify({message: "Deleted"}));
        } else {
            res.writeHead(403);
            res.end();
        }
    }
}

module.exports = { CategoriesController };
