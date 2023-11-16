const { jwt_secret } = require("../config.json");
const {verify} = require("jsonwebtoken");

class CommonService {
    getDataFromRequest(req) {
        let data = "";

        return new Promise((resolve, reject) => {
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
               resolve(JSON.parse(data));
            });
        });
    }
    getDatetimeStringFromIsoDateString(date) {
        return (date).substr(0, 19).replace('T', ' ')
    }
    async checkAuthToken(req) {
        try {
            return await verify(req.headers.authorization, jwt_secret);
        } catch(e) {
            throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
        }
    }
}

module.exports = { CommonService };
