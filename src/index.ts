import express, { Response, Request } from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import config from './config/service';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/user", proxy(config.USER_AUTH_SERVICE));
app.use("/cobra-play", proxy(config.COBRA_GAME_PLAY_SERVICE));

app.use("/admin", proxy(config.ADMIN_AUTH_SERVICE)); 
app.use("/cobra-admin", proxy(config.COBRA_ADMIN_SERVICE)); 

app.use("/cobra-club", proxy(config.COBRA_CLUB_SERVICE)); 


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

app.use('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'No endpoint specified' });
})

app.listen(config.PORT, () => {
    console.log(`Gateway running at port ${config.PORT}`);
}).on('error', (err: Error) => {
    console.log(err);
    process.exit();
});