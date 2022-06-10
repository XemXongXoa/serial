const {SerialPort} = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline')
const StringUtils = require("../utils/StringUtils")
const config = require("../config")
module.exports  = function (req, res) {
    let port = new SerialPort(config)
    const parser = port.pipe(new ReadlineParser({
        delimiter: '\r\n'
    }))
    let flag = false
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
                flag = true
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