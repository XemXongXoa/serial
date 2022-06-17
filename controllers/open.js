
const {SerialPort} = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline')
const StringUtils = require("../utils/StringUtils")
const config = require("../config")
module.exports = async function (req, res) {
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

    async function sendRes(msg) {
        try{
            port.close(async ()=>{
                await res.json({
                    data: msg
                })
            });
        }
        catch(e){
            await res.json({
                data: msg
            })
        }
        
    }

    function init() {
        setTimeout(() => {
            // port.write(`/M/LOK/H${hang}/C${cot}/T${tang}`)
            port.write(`/M/LOK/H0/C0/T0`)
            parser.on("data",async (data) => {
                if(data ==="/M/CPL"){
                    flag = true;
                    await sendRes(data)
                }
            })
        }, 1000);
        setTimeout(async () => {
            if (!flag) {
                await sendRes("timeout")
            }
        }, 30000)
    }
    init()
  }
  catch(e){
    console.log(e)
    throw e
  }
}
