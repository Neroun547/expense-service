const url = require("url");

const { SpendingController } = require("./spending.controller.js");

const {CategoriesServiceDb} = require("../../db/categories/categories.service.js");
const { SpendingServiceDb } = require("../../db/spending/spending.service.js");
const { CommonService } = require("../../common/common.service.js");

const { connect } = require("../../db/db.connect.js");

const { createSpendingDto } = require("./dto/create-spending.dto.js");
const { getSpendingByCategoryIdDto } = require("./dto/get-spending-by-category-id.dto.js");
const { deleteSpendingItemByIdDto } = require("./dto/delete-spending-item-by-id.dto.js");

const commonService = new CommonService();
const spendingController = new SpendingController(new SpendingServiceDb(connect), new CategoriesServiceDb(connect), new CommonService());

async function spendingModule(req, res) {
    try {
        if (req.method === "POST") {
            if (req.url === "/api/spending") {
                const user = await commonService.checkAuthToken(req);
                const data = await commonService.getDataFromRequest(req);

                spendingController.createSpending(createSpendingDto(data.categoryId, data.value, data.date, data.description), user, res);

                return;
            }
        }
        if (req.method === "GET") {
            if (req.url.includes("/api/spending/by-category-id")) {
                const user = await commonService.checkAuthToken(req);
                const parseUrlString = url.parse(req.url, true);
                const dataFromDto = getSpendingByCategoryIdDto(
                    Number(parseUrlString.pathname.replace("/api/spending/by-category-id/", "").replace("/", "")),
                    parseUrlString.query.date_from,
                    parseUrlString.query.date_to
                );
                spendingController.getSpendingByCategoryId(dataFromDto, user, res);

                return;
            }
        }
        if(req.method === "DELETE") {
            if(req.url.includes("/api/spending")) {
                const user = await commonService.checkAuthToken(req);

                spendingController.deleteSpendingItemById(deleteSpendingItemByIdDto(Number(req.url.replace("/api/spending/", ""))), user, res);

                return;
            }
        }
        res.writeHead(404);
        res.end();
    } catch(e) {
        try {
            const { status, message } = JSON.parse(e.message);

            res.writeHead(status);
            res.end(JSON.stringify({ message: message }));
        } catch {
            res.writeHead(500);
            res.end();
        }
    }
}

module.exports = { spendingModule };
