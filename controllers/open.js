
const {SerialPort} = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline')
const StringUtils = require("./utils/StringUtils")
module.exports = function (req, res) {
    const {
        hang,
        cot,
        tang
    } = req.body;
    flag = false;
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
            port.write(`/M/ULK/H${hang}/C${cot}/T${tang}`)
            parser.on("data", (data) => {
                sendRes(data)
            })
        }, 1000);
        setTimeout(() => {
            if (!flag) {
                sendRes("timeout")
            }
        }, 30000)
    }
    init()
}
