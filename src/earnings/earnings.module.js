const { EarningsController } = require("./earnings.controller.js");
const { EarningsServiceDb } = require("../../db/earnings/earnings.service.js");
const { CategoriesServiceDb } = require("../../db/categories/categories.service.js");
const { CommonService } = require("../../common/common.service.js");
const { connect } = require("../../db/db.connect.js");

const url = require("url");

const { createSpendingDto } = require("../spending/dto/create-spending.dto.js");
const { getSpendingByCategoryIdDto } = require("../spending/dto/get-spending-by-category-id.dto.js");
const { deleteSpendingItemByIdDto } = require("../spending/dto/delete-spending-item-by-id.dto.js");

const commonService = new CommonService();
const earningsController = new EarningsController(new EarningsServiceDb(connect), new CategoriesServiceDb(connect));

async function earningsModule(req, res) {
    try {
        if(req.method === "GET") {
            if(req.url.includes( "/api/earnings/by-category-id")) {
                const parseUrlString = url.parse(req.url, true);
                const user = await commonService.checkAuthToken(req);

                await earningsController.getEarningsByCategoryId(
                    getSpendingByCategoryIdDto(
                        Number(parseUrlString.pathname.replace("/api/earnings/by-category-id/", "").replace("/", "")),
                        parseUrlString.query.date_from,
                        parseUrlString.query.date_to
                    ),
                    user,
                    res
                );

                return;
            }
        }
        if (req.method === "POST") {
            if (req.url === "/api/earnings") {
                const data = await commonService.getDataFromRequest(req);
                const user = await commonService.checkAuthToken(req);

                await earningsController.saveEarning(createSpendingDto(data.categoryId, data.value, data.date, data.description), user, res);

                return;
            }
        }
        if(req.method === "DELETE") {
            if(req.url.includes("/api/earnings")) {
                const user = await commonService.checkAuthToken(req);

                await earningsController.deleteEarningsById(deleteSpendingItemByIdDto(Number(req.url.replace("/api/earnings/", ""))), user, res);

                return;
            }
        }
        res.writeHead(404);
        res.end();
    } catch(e) {
        console.log(e);
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

module.exports = { earningsModule };
