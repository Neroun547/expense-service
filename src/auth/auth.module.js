const { connect } = require("../../db/db.connect.js");
const { UsersServiceDb } = require("../../db/users/users.service.js");
const { AuthController } = require("./auth.controller.js");
const { CommonService } = require("../../common/common.service.js");

const { signupDto } = require("../signup/dto/signup.dto.js");

const authController = new AuthController(new UsersServiceDb(connect));
const commonService = new CommonService();

async function authModule(req, res) {

    try {
        if (req.method === "POST") {
            if (req.url === "/api/auth") {
                const data = await commonService.getDataFromRequest(req);

                authController.auth(signupDto(data.username, data.password), res);

                return;
            }
        }
        if (req.method === "GET") {
            if (req.url === "/api/auth") {
                authController.checkToken(req, res);

                return;
            }
        }
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Not found" }));
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

module.exports = { authModule };
