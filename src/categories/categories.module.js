const { CategoriesController } = require("./categories.controller.js");
const { CategoriesServiceDb } = require("../../db/categories/categories.service.js");
const { SpendingServiceDb } = require("../../db/spending/spending.service.js");
const { CommonService } = require("../../common/common.service.js");
const { connect } = require("../../db/db.connect.js");

const { createCategoryDto } = require("./dto/create-category.dto.js");
const { deleteCategoryDto } = require("./dto/delete-category.dto.js");
const { newCategoryNameDto } = require("./dto/new-category-name.dto.js");

const commonService = new CommonService();

const categoriesController = new CategoriesController(new SpendingServiceDb(connect), new CategoriesServiceDb(connect), new CommonService());

async function categoriesModule(req, res) {
    try {
        if (req.method === "GET") {
            if (req.url === "/api/categories") {
                const user = await commonService.checkAuthToken(req);

                categoriesController.getCategories(user, res);

                return;
            }
            if(req.url.includes("/api/categories/")) {
                const user = await commonService.checkAuthToken(req);
                const categoryId = Number(req.url.replace("/api/categories/", ""));

                categoriesController.getCategoryById(categoryId, user, res);

                return;
            }
        }
        if(req.method === "POST") {
            if(req.url === "/api/categories") {
                const data = await commonService.getDataFromRequest(req);
                const user = await commonService.checkAuthToken(req);

                categoriesController.createCategory(createCategoryDto(data.name, data.createdAt), user, res);

                return;
            }
        }
        if(req.method === "DELETE") {
            if(req.url.includes("/api/categories")) {
                const user = await commonService.checkAuthToken(req);

                categoriesController.deleteCategoryById(deleteCategoryDto(Number(req.url.replace("/api/categories/", ""))), user, res);

                return;
            }
        }
        if(req.method === "PATCH") {
            if(req.url.includes("/api/categories/")) {
                const user = await commonService.checkAuthToken(req);
                const data = await commonService.getDataFromRequest(req);
                const id = Number(req.url.replace("/api/categories/", ""));

                categoriesController.changeCategoryNameById(id, user, newCategoryNameDto(data.name), res);

                return;
            }
        }
        res.writeHead(404);
        res.end(JSON.stringify({message: "Not found"}));
    } catch(e) {
        try {
            const { status, message } = JSON.parse(e.message);

            res.writeHead(status);
            res.end(JSON.stringify({ message: message }));
        } catch(e) {
            res.writeHead(500);
            res.end();
        }
    }
}

module.exports = { categoriesModule };
