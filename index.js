const {
    SerialPort
} = require('serialport')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const {
    ReadlineParser
} = require('@serialport/parser-readline')
const cors = require('cors')
const StringUtils = require("./utils/StringUtils")
const Open = require("./controllers/open")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const corsConfig = {
    credentials: true,
    origin: true,
}
app.use(cors(corsConfig))
app.listen(4000, () => {
    console.log(`Example app listening on port ${4000}`)
})
app.post('/open',Open)
app.post('/close', async (req, res) => {
    const {
        hang,
        cot,
        tang
    } = req.body;
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        res.json({
            data: msg
        })
    }

    function init() {
        setTimeout(() => {
            port.write(`/M/LOK/H${hang}/C${cot}/T${tang}`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})
app.get('/fingerprint', async (req, res) => {
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        let obj = StringUtils.regexIdFingerPrint(msg)
        res.send({
            id: obj
        });
    }

    function init() {
        setTimeout(() => {
            port.write(`/F/RFP`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})
app.post('/fingerprint', async (req, res) => {
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        let obj = StringUtils.regexIdFingerPrint(msg)
        res.send({
            id: obj
        });
    }

    function init() {
        setTimeout(() => {
            port.write(`/F/AFP`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})
app.get('/qr', async (req, res) => {
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        let data = msg.replace("/RQR/", "").replace("/CPL", "")
        res.json({
            data
        })
    }

    function init() {
        setTimeout(() => {
            port.write(`/BQR`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})
app.get('/status', async (req, res) => {
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        res.json({
            data: msg
        })
    }

    function init() {
        setTimeout(() => {
            port.write(`/FCK`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})
app.get('/status', async (req, res) => {
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        res.json({
            data: msg
        })
    }

    function init() {
        setTimeout(() => {
            port.write(`/FCK`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})
app.get('/clear', async (req, res) => {
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        res.json({
            data: msg
        })
    }

    function init() {
        setTimeout(() => {
            port.write(`/F/LFP`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})
app.get('/coutUser', async (req, res) => {
    let port = new SerialPort({
        path: "COM5",
        baudRate: 9600,
    })
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))

    function sendRes(msg) {
        port.close();
        const num = StringUtils.regexIdFingerPrint(msg)
        res.json({
            data: num
        })
    }

    function init() {
        setTimeout(() => {
            port.write(`/F/CFP`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
    }
    init()
})