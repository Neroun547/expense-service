const moment = require("moment");

class SpendingController {
   constructor(spendingServiceDb, categoriesServiceDb, commonService) {
       this.spendingServiceDb = spendingServiceDb;
       this.categoriesServiceDb = categoriesServiceDb;
       this.commonService = commonService;
   }

   async createSpending(body, user, res) {
       const categoryInDb = await this.categoriesServiceDb.getCategoriesByIdAndUserId(body.categoryId, user.id);

       if(!categoryInDb.length) {
           res.writeHead(401);
           res.end();
       } else {
           await this.spendingServiceDb.createSpending(body.value, body.categoryId, body.description, body.date);

           res.writeHead(201);
           res.end(JSON.stringify({message: "Spend created"}));
       }
   }
   async getSpendingByCategoryId(data, user, res) {
       const categoryInDb = await this.categoriesServiceDb.getCategoriesByIdAndUserId(data.categoryId, user.id);

       if(!categoryInDb.length) {
            res.writeHead(401);
            res.end();

            return;
       }
       const spending = await this.spendingServiceDb.getSpendingByCategoryIdByDateFromAndDateTo(data.categoryId, data.dateFrom, data.dateTo);

       if(spending.length) {
           const parseSpendingData = spending.map(el => ({
               ...el,
               date: moment(el.date).format("YYYY-MM-DD")
           }));

           res.end(JSON.stringify(parseSpendingData));
       } else {
           res.writeHead(404);
           res.end();
       }
   }
   async deleteSpendingItemById(id, user, res) {
       const spendingAndCategoryInDb = await this.spendingServiceDb.getSpendingAndCategoryById(id);

       if(spendingAndCategoryInDb[0].user_id !== user.id) {
           res.writeHead(401);
           res.end();

           return;
       }
       await this.spendingServiceDb.deleteSpendingById(id);

       res.writeHead(202);
       res.end();
   }
}

module.exports = { SpendingController };
