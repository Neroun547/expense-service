const { createServer } = require("http");
const { port } = require("../config.json");

const { authModule } = require("./auth/auth.module.js");
const { signupModule } = require("./signup/signup.module.js");
const { categoriesModule } = require("./categories/categories.module.js");
const { spendingModule } = require("./spending/spending.module.js");
const { earningsModule } = require("./earnings/earnings.module.js");

const headers = {
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': '*, Authorization',
    'Access-Control-Max-Age': 2592000, // 30 days
};

createServer((req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') {
            res.writeHead(204, headers);
            res.end();
            return;
        }
        if(req.url.includes("/api/auth")) {
            authModule(req, res);
        } else if(req.url.includes("/api/signup")) {
            signupModule(req, res);
        } else if(req.url.includes("/api/categories")) {
            categoriesModule(req, res);
        } else if(req.url.includes("/api/spending")) {
            spendingModule(req, res);
        } else if(req.url.includes("/api/earnings")) {
            earningsModule(req, res);
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: "Not found" }));
        }
    } catch(e) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Server error" }));
    }
}).listen(port, () => {
   console.log("Server started on port: " + port);
});
