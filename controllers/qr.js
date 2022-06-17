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
        console.log(msg.codePointAt(0))
        port.close();
        let data = msg.replace("/RQR/", "").replace("/CPL", "")
        res.json({
            data
        })
    }
    function init() {
        let inx = 0;
        setTimeout(() => {
            setTimeout(() => {
                port.write(`/BQR`)
                setTimeout(() => {
                    port.write(`/BQR`)
                    parser.on("data", (data) => {
                        console.log("data => " +inx+" => "  + data);
                        
                        if( inx ==1 )
                        {
                            flag = true;
                            sendRes(data)
                        }
                        inx++;
                    })
                },1000)
            },1000)
        }, 1000);
        setTimeout(() => {
            if (!flag) {
                sendRes("timeout")
            }
        }, 30000)
    }
    init()
}