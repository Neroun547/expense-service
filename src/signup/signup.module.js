const { UsersServiceDb } = require("../../db/users/users.service.js");
const { connect } = require("../../db/db.connect.js");
const { SignupController } = require("./signup.controller.js");

const { signupDto } = require("./dto/signup.dto.js");

const { CommonService } = require("../../common/common.service.js");

const signupController = new SignupController(new UsersServiceDb(connect));
const commonService = new CommonService();

async function signupModule(req, res) {
    try {
        if (req.method === "POST") {
            if (req.url === "/api/signup") {
                const data = await commonService.getDataFromRequest(req);

                signupController.signup(signupDto(data.username, data.password), res);

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

module.exports = { signupModule };
