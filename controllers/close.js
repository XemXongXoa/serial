
const {SerialPort} = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline')
const StringUtils = require("../utils/StringUtils")
const config = require("../config")
module.exports  = function (req, res) {
    try{
        const {
            hang,
            cot,
            tang
        } = req.body;
        flag = false;
        let port = new SerialPort(config)
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
                // port.write(`/M/ULK/H${hang}/C${cot}/T${tang}`)
                port.write(`/M/ULK/H0/C0T0`)
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
    catch(e){
        console.log(e)
        res.json({
            data: "error"
        })
    }
}
