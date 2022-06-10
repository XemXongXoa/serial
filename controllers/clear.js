const {SerialPort} = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline')
const StringUtils = require("../utils/StringUtils")
const config = require("../config")
module.exports = function (req, res) {
    let port = new SerialPort(config)
    let flag = false
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
                flag = true;
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