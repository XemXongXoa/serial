const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Open = require("./controllers/open")
const Close = require("./controllers/close")
const Status = require("./controllers/status")
const Clear = require("./controllers/clear")
const Count = require("./controllers/count")
const RequestFingerPrint = require("./controllers/requestfingerprint")
const FingerPrint = require("./controllers/fingerprint")
const Qr = require("./controllers/qr")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const corsConfig = {
    credentials: true,
    origin: true,
}
app.use(cors(corsConfig))
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})
app.listen(4000, () => {
    console.log(`Example app listening on port ${4000}`)
})
app.post('/open',Open)
app.post('/close', Close)
app.get('/status',Status)
app.get('/clear', Clear)
app.get('/cout',Count)
app.get('/fingerprint',RequestFingerPrint)
app.post('/fingerprint',FingerPrint)
app.get('/qr',Qr)
