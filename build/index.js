"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const cors_1 = __importDefault(require("cors"));
const service_1 = __importDefault(require("./config/service"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use('/user', proxy(config.USER_SERVICE_URL, {
//     preserveHostHdr: false,
//     proxyReqPathResolver: function (req) {
//         return req.url;
//     }
// }));
// app.use('/admin', proxy(config.ADMIN_SERVICE_URL, {
//     preserveHostHdr: false,
//     proxyReqPathResolver: function (req) {
//         return req.url;
//     }
// }));
app.use("/user", (0, express_http_proxy_1.default)(service_1.default.USER_AUTH_SERVICE));
app.use("/cobra-play", (0, express_http_proxy_1.default)(service_1.default.COBRA_GAME_PLAY_SERVICE));
app.use("/admin", (0, express_http_proxy_1.default)(service_1.default.ADMIN_AUTH_SERVICE));
app.use("/cobra-admin", (0, express_http_proxy_1.default)(service_1.default.COBRA_ADMIN_SERVICE));
app.use("/cobra-club", (0, express_http_proxy_1.default)(service_1.default.COBRA_CLUB_SERVICE));
// app.use("/cobra-admin", proxy(config.COBRA_ADMIN_SERVICE, {
//     proxyReqPathResolver: function (req) {
//         return req.url;
//     },
//     userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
//         console.log('Response from target service:', proxyRes.statusCode);
//         return proxyResData;
//     },
//     proxyReqBodyDecorator: function(bodyContent, srcReq) {
//         console.log('Request to target service:', srcReq.headers);
//         if (srcReq.headers['content-type'].startsWith('multipart/form-data')) {
//             // Ensure that the content type and content length are set correctly
//             delete srcReq.headers['content-length'];
//             console.log('Request to target service:', srcReq);
//             return bodyContent;
//         }
//         return bodyContent;
//     }
// }));
app.use('/', (req, res) => {
    return res.status(200).json({ message: 'No endpoint specified' });
});
app.listen(service_1.default.PORT, () => {
    console.log(`Gateway running at port ${service_1.default.PORT}`);
}).on('error', (err) => {
    console.log(err);
    process.exit();
});
